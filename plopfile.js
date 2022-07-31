module.exports = function (plop) {
	plop.setGenerator('component', {
		description: 'Creating new react components',
		prompts: [
			{
				type: 'list',
				name: 'input',
				message: 'Choose your folder path & what is your features names',
				choices: ['features', 'shared'],
			},
			{
				type: 'input',
				name: 'featureName',
				message: 'Feature Name'
			},
			{
				type: 'input',
				name: 'componentName',
				message: 'Component Name'
			},
		],
		actions: function (data) {
			const actions = [];
			if (data.input === 'features') {
				actions.push({
					type: 'add', //adding file to your propject
					templateFile: 'plop-templates/functional-component.hbs',
					path: 'src/features/{{snakeCase featureName}}/ui/components/{{pascalCase componentName}}.tsx', //component path
				});
			} else {
				actions.push({
					type: 'add',
					templateFile: 'plop-templates/functional-component.hbs',
					path: 'src/shared/components/{{pascalCase componentName}}.tsx',
				});
			}
			return actions;
		},
	});

	plop.setGenerator('page', {
		description: 'Creating new pages',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is your route page name?',
			},
		],
		actions: [
			{
				type: 'add', //adding file to your propject
				templateFile: 'plop-templates/page-template.hbs',
				path: 'src/pages/{{kebabCase name}}/index.tsx',
			},
		],
	});

	plop.setGenerator('api', {
		description: 'Creating New API',
		prompts: [
			{
				type: 'list',
				name: 'input',
				message: 'Choose type API',
				choices: ['Fetch', 'Mutation'],
			},
			{
				type: 'input',
				name: 'name',
			},
		],
		actions: function (data) {
			const actions = [];
			if (data.input === 'Fetch') {
				actions.push({
					type: 'add', //adding file to your propject
					templateFile: 'plop-templates/api-template-fetch.hbs',
					path: 'src/shared/api/fetch/{{kebabCase name}}.ts', //component path
				});
			} else {
				actions.push({
					type: 'add',
					templateFile: 'plop-templates/api-template-mutation.hbs',
					path: 'src/shared/api/mutation/{{kebabCase name}}.ts',
				});
			}
			return actions;
		},
	});
};
