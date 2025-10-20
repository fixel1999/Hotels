import '@testing-library/jest-dom';

if (typeof global.structuredClone === 'undefined') {
	global.structuredClone = (val: any) => {
		try {
			return JSON.parse(JSON.stringify(val));
		} catch {
			return val;
		}
	};
}

process.env.NEXT_PUBLIC_API_URL = '/api';

jest.mock('jwt-decode', () => ({
	jwtDecode: jest.fn(() => ({ sub: 'admin', role: 'ADMIN' })),
}));

jest.mock('axios', () => {
	const mockAxios = {
		create: jest.fn(() => mockAxios),
		get: jest.fn(),
		post: jest.fn(),
		put: jest.fn(),
		delete: jest.fn(),
		interceptors: {
			request: { use: jest.fn() },
			response: { use: jest.fn() },
		},
	};
	return mockAxios;
});

if (typeof window !== 'undefined' && !window.matchMedia) {
	window.matchMedia = (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => { },
		removeListener: () => { },
		addEventListener: () => { },
		removeEventListener: () => { },
		dispatchEvent: () => false,
	});
}

class ResizeObserverMock {
	observe() { }
	unobserve() { }
	disconnect() { }
}

if (typeof window !== 'undefined' && !window.ResizeObserver) {
	window.ResizeObserver = ResizeObserverMock;
}