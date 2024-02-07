export const reactUiComponentGeneratorDescription = 'React UI component';

export const reactUiComponentGenerator = {
  description: reactUiComponentGeneratorDescription,
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'component name',
      validate: input => input.length > 1 || 'Component name cannot be empty!',
    },
  ],
  actions: function() {
    return [
      {
        type: 'add',
        path: `src/ui/{{camelCase name}}/{{pascalCase name}}.tsx`,
        templateFile: 'plop/templates/component/Component.hbs',
      },
      {
        type: 'add',
        path: `src/ui/{{camelCase name}}/{{pascalCase name}}.test.tsx`,
        templateFile: 'plop/templates/component/Component.test.hbs',
      },
      {
        type: 'add',
        path: `src/ui/{{camelCase name}}/{{pascalCase name}}.types.ts`,
        templateFile: 'plop/templates/component/Component.types.hbs',
      },
      {
        type: 'modify',
        path: 'src/ui/index.ts',
        pattern: 'export',
        templateFile: 'plop/templates/component/Component.index.hbs',
      },
    ];
  },
}
