function config(entry = [], { addDecorator = true }) {
  const addonConfig = [];
  if (addDecorator) {
    addonConfig.push(require.resolve('./dist/esm/preset/addDecorators'));
  }
  return [...entry, ...addonConfig];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve("./dist/esm/preset/manager")];
}

module.exports = {
  managerEntries,
  config,
};
