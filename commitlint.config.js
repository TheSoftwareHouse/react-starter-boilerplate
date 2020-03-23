module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [0, 'always'],
    'type-case': [0, 'always'],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^((?:\[\w+-?\d*\])+)\s((\w+\s*)+)$/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
};
