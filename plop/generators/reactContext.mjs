export const reactContextGeneratorDescription = 'React Context';

export const reactContextGenerator = {
  description: reactContextGeneratorDescription,
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'context name',
      validate: input => input.length > 1 || 'Context name cannot be empty!',
    }
  ],
  actions: function() {
    return [
      {
        type: 'add',
        path: 'src/context/{{camelCase name}}/{{camelCase name}}Context/{{pascalCase name}}Context.ts',
        templateFile: 'plop/templates/context/Context.hbs',
      },
      {
        type: 'add',
        path: 'src/context/{{camelCase name}}/{{camelCase name}}Context/{{pascalCase name}}Context.types.ts',
        templateFile: 'plop/templates/context/Context.types.hbs',
      },
      {
        type: 'add',
        path: 'src/context/{{camelCase name}}/{{camelCase name}}Context/{{pascalCase name}}Context.test.tsx',
        templateFile: 'plop/templates/context/Context.test.hbs',
      },
      {
        type: 'add',
        path: 'src/context/{{camelCase name}}/{{camelCase name}}ContextController/{{pascalCase name}}ContextController.tsx',
        templateFile: 'plop/templates/context/ContextController.hbs',
      },
      {
        type: 'add',
        path: 'src/context/{{camelCase name}}/{{camelCase name}}ContextController/{{pascalCase name}}ContextController.types.ts',
        templateFile: 'plop/templates/context/ContextController.types.hbs',
      },
      {
        type: 'add',
        path: 'src/hooks/use{{pascalCase name}}/use{{pascalCase name}}.ts',
        templateFile: 'plop/templates/context/useContext.hbs',
      },
      {
        type: 'add',
        path: 'src/hooks/use{{pascalCase name}}/use{{pascalCase name}}.test.tsx',
        templateFile: 'plop/templates/context/useContext.test.hbs',
      },
    ];
  }
};
