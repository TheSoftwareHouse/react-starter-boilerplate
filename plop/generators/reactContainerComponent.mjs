export const reactContainerComponentGeneratorDescription = 'React app component + container';

export const reactContainerComponentGenerator = {
  description: reactContainerComponentGeneratorDescription,
  prompts: [
    {
      type: 'directory',
      name: 'directory',
      message: 'select directory',
      basePath: './src/routes',
    },
    {
      type: 'input',
      name: 'name',
      message: 'component name',
      validate: (input) => input.length > 1 || 'Component name cannot be empty!',
    },
  ],
  actions: function () {
    return [
      {
        type: 'add',
        path: `src/routes/{{directory}}/{{camelCase name}}/{{pascalCase name}}.tsx`,
        templateFile: 'plop/templates/component/Component.hbs',
      },
      {
        type: 'add',
        path: `src/routes/{{directory}}/{{camelCase name}}/{{pascalCase name}}.test.tsx`,
        templateFile: 'plop/templates/component/Component.test.hbs',
      },
      {
        type: 'add',
        path: `src/routes/{{directory}}/{{camelCase name}}/{{pascalCase name}}Container.tsx`,
        templateFile: 'plop/templates/component/Container.hbs',
      },
      {
        type: 'add',
        path: `src/routes/{{directory}}/{{camelCase name}}/{{pascalCase name}}.types.ts`,
        templateFile: 'plop/templates/component/ContainerComponent.types.hbs',
      },
    ];
  },
};
