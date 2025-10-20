/** @type {import('jest').Config} */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
	dir: './', // Ruta al proyecto Next.js
});

const customJestConfig = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	testEnvironment: 'jest-environment-jsdom',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
};

module.exports = createJestConfig(customJestConfig);
