import '@testing-library/jest-dom/extend-expect';
import server from './src/mocks/server';
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

jest.mock('next/router', () => ({
	useRouter() {
		return {
			route: '/',
			pathname: '',
			query: '',
			asPath: '',
			push: jest.fn(),
			events: {
				on: jest.fn(),
				off: jest.fn(),
			},
			beforePopState: jest.fn(() => null),
			prefetch: jest.fn(() => null),
		};
	},
}));

// Mock console to make it silent
console.warn = jest.fn(); // silence warnings for form validator
console.error = jest.fn(); // silence warnings for form validator

// Setup msw server https://mswjs.io/docs/getting-started/integrate/node#using-create-react-app
beforeAll(() => server.listen());
afterEach(() => server.restoreHandlers());
afterAll(() => server.close());
