import type { CSSParameters } from './types';

const DEFAULT_CSS_OPTIONS: Required<
  Pick<
    CSSParameters,
    'includeCustomProperties' | 'includeMediaQueries' | 'includeFontFace' | 'includeKeyframes' | 'includeLayerRules'
  >
> = {
  includeCustomProperties: false,
  includeMediaQueries: true,
  includeFontFace: false,
  includeKeyframes: false,
  includeLayerRules: true,
};

/**
 * Check if any element in the subtree (or root itself) matches at least one
 * of the comma-separated selectors in `selectorText`.
 */
function elementMatchesSelector(root: Element, selectorText: string): boolean {
  try {
    return selectorText.split(',').some((sel) => {
      const trimmed = sel.trim();
      return root.matches(trimmed) || root.querySelector(trimmed) !== null;
    });
  } catch {
    // Invalid selector — skip
    return false;
  }
}

/**
 * Returns true if the rule is a `:root` / `*` custom-property declaration block
 * (i.e. only contains `--*` properties).
 */
function isCustomPropertyRule(rule: CSSStyleRule): boolean {
  const selector = rule.selectorText.trim();
  if (selector !== ':root' && selector !== '*') return false;
  for (let i = 0; i < rule.style.length; i++) {
    const prop = rule.style.item(i);
    if (!prop.startsWith('--')) return false;
  }
  return rule.style.length > 0;
}

/**
 * Extract matching rules from a CSSMediaRule.
 */
function extractMediaRuleMatches(root: Element, rule: CSSMediaRule): string[] {
  const nested: string[] = [];
  for (const child of Array.from(rule.cssRules)) {
    if (child instanceof CSSStyleRule) {
      if (elementMatchesSelector(root, child.selectorText)) {
        nested.push(child.cssText);
      }
    }
  }
  return nested;
}

/**
 * Extract matching rules from a CSSLayerBlockRule.
 */
function extractLayerRuleMatches(
  root: Element,
  rule: CSSLayerBlockRule,
  options: Required<Pick<CSSParameters, 'includeCustomProperties' | 'includeMediaQueries'>>,
): string[] {
  const nested: string[] = [];
  for (const child of Array.from(rule.cssRules)) {
    if (child instanceof CSSStyleRule) {
      if (isCustomPropertyRule(child)) {
        if (options.includeCustomProperties) {
          nested.push(child.cssText);
        }
        continue;
      }
      if (elementMatchesSelector(root, child.selectorText)) {
        nested.push(child.cssText);
      }
    } else if (child instanceof CSSMediaRule && options.includeMediaQueries) {
      const mediaMatches = extractMediaRuleMatches(root, child);
      if (mediaMatches.length > 0) {
        nested.push(`@media ${child.conditionText} {\n${mediaMatches.join('\n')}\n}`);
      }
    }
  }
  return nested;
}

/**
 * Check if a CSSKeyframesRule's name is referenced by any animation property
 * on elements in the story root.
 */
function isKeyframesUsed(root: Element, rule: CSSKeyframesRule): boolean {
  const name = rule.name;
  const elements = [root, ...Array.from(root.querySelectorAll('*'))];
  return elements.some((el) => {
    const style = window.getComputedStyle(el);
    return style.animationName.split(',').some((n) => n.trim() === name);
  });
}

/**
 * Extract CSS rules that apply to elements within `root`.
 *
 * Uses the browser's CSSOM API (`document.styleSheets`) to iterate all
 * loaded stylesheets and match selectors against the story's rendered DOM.
 */
export function extractCSS(root: Element, cssParams: CSSParameters): string {
  const opts = { ...DEFAULT_CSS_OPTIONS, ...cssParams };
  const matchingRules: string[] = [];
  const seen = new Set<string>();

  function addRule(cssText: string): void {
    if (!seen.has(cssText)) {
      seen.add(cssText);
      matchingRules.push(cssText);
    }
  }

  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      // Cross-origin stylesheet — skip
      continue;
    }

    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSStyleRule) {
        if (isCustomPropertyRule(rule)) {
          if (opts.includeCustomProperties) {
            addRule(rule.cssText);
          }
          continue;
        }

        if (elementMatchesSelector(root, rule.selectorText)) {
          addRule(rule.cssText);
        }
      } else if (rule instanceof CSSMediaRule && opts.includeMediaQueries) {
        const nestedMatches = extractMediaRuleMatches(root, rule);
        if (nestedMatches.length > 0) {
          addRule(`@media ${rule.conditionText} {\n${nestedMatches.join('\n')}\n}`);
        }
      } else if (rule instanceof CSSLayerBlockRule && opts.includeLayerRules) {
        const nestedMatches = extractLayerRuleMatches(root, rule, {
          includeCustomProperties: opts.includeCustomProperties,
          includeMediaQueries: opts.includeMediaQueries,
        });
        if (nestedMatches.length > 0) {
          addRule(`@layer ${rule.name} {\n${nestedMatches.join('\n')}\n}`);
        }
      } else if (rule instanceof CSSKeyframesRule && opts.includeKeyframes) {
        if (isKeyframesUsed(root, rule)) {
          addRule(rule.cssText);
        }
      } else if (rule instanceof CSSFontFaceRule && opts.includeFontFace) {
        // Include all @font-face rules when enabled — a more targeted approach
        // would check font-family usage, but that requires deep computed-style checks.
        addRule(rule.cssText);
      }
    }
  }

  let css = matchingRules.join('\n\n');

  if (typeof cssParams.transform === 'function') {
    try {
      css = cssParams.transform(css);
    } catch (error) {
      console.error('CSS transform failed:', error);
    }
  }

  return css;
}
