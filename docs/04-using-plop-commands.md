# Plop

Plop is a tool which provide CLI interface with commands for rapid code creation.

To access plop CLI you need to run following command:

```shell
npm run plop
```

## Available commands

### React app component

This command creates a React component with a specific name inside `src/app` directory.

Result of this command:
- base React component file,
- component types file,
- component tests file.

### React app component with container

This command creates React component with a specific name inside `src/app` directory with container component.

Result of this command:
- base React component file,
- container component file,
- components types file,
- component tests file.

### React UI component

This command creates base UI component with a specific name inside `src/ui` directory.

Result of this command:
- base React component file,
- component types file,
- component tests file,
- add new hook to `hooks` index file.

### Custom hook

This command creates custom React hook with a specific name inside `src/hooks` directory.

Result of this command:
- base hook file,
- tests file,
- add new hook to `hooks` index file.

### API actions collection

This command creates new collection for API actions.

Result of this command:
- API actions collection mutations file,
- API actions collection queries file,
- API actions collection types file,
- connect new API actions collection with API actions index file.

### API query

This command creates new API query action inside specific collection.

Result of this command:
- new query inside specific API collection queries file,
- new query action types inside specific API collection types file.

### API mutation

This command creates new API mutation action inside specific collection.

Result of this command:
- new mutation inside specific API collection mutations file,
- new mutation action types inside specific API collection types file.

### React Context

This command creates global React context with a specific name inside `src/contexts` directory.

Result of this command:
- context file
- context types file,
- context controller file,
- context controller types,
- hook that retrieves data from the context,
- hook tests file.
