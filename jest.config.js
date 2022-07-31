const nextJest = require('next/jest');

const createJestConfig = nextJest({
	dir: './',
});

const customJestConfig = {
	moduleDirectories: ['node_modules', '<rootDir>/'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	collectCoverageFrom: ['features/**/*.jsx'],
	testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
