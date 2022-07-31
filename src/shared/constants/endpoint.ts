const FETCH_DATA = (params: string) => `/api${params}`;
const FETCH_DETAIL = (id: string) => `/api/${id}`;
const LOGIN = 'http://fakeapi.jsonparseronline.com/users';

type API_PROPS = {
	[key: string]: string;
};

const API_URL: API_PROPS = {
	LOCAL: 'https://randomuser.me/',
	DEV: 'https://randomuser.me/',
};

export { FETCH_DATA, LOGIN, FETCH_DETAIL, API_URL };
