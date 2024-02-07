export const customHookGeneratorDescription = 'Custom hook';

export const customHookGenerator = {
  description: customHookGeneratorDescription,
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'hook name',
      validate: input => input.length > 1 || 'Hook name cannot be empty!',
    },
  ],
  actions: function() {
    return [
      {
        type: 'add',
        path: 'src/hooks/{{camelCase name}}/{{camelCase name}}.tsx',
        templateFile: 'plop/templates/hook/hook.hbs',
      },
      {
        type: 'add',
        path: 'src/hooks/{{camelCase name}}/{{camelCase name}}.test.tsx',
        templateFile: 'plop/templates/hook/hook.test.hbs',
      },
      {
        type: 'modify',
        path: 'src/hooks/index.ts',
        pattern: 'export',
        templateFile: 'plop/templates/hook/hook.index.hbs',
      },
    ];
  },
};
