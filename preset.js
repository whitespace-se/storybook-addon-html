function config(entry = []) {
  return [...entry, require.resolve("./dist/esm/preset/preview")];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve("./dist/esm/preset/manager")];
}

function previewAnnotations(entry = []) {
  return [...entry, require.resolve("./dist/esm/preset/preview")];
}

module.exports = {
  managerEntries,
  config,
  previewAnnotations,
};
