import axios from 'axios';
import { API_URL } from '../constants/endpoint';

const AxiosInstance = axios.create({
	timeout: 20000,
	headers: { 'X-Custom-Header': 'foobar' },
	baseURL: API_URL[`${process.env.NEXT_PUBLIC_API}`],
});

export default AxiosInstance;
