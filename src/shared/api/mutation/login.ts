import { LOGIN } from 'src/shared/constants/endpoint';
import AxiosInstance from '../axiosInstance';

interface User {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	avatar: string;
}

const logIn = async (data: { email: string; password: string }) => {
	const body: User = {
		firstName: 'Ut',
		lastName: data.password,
		username: data.email,
		avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000',
		email: data.email,
	};
	const res = await AxiosInstance.post(
		LOGIN,
		{
			data: body,
		},
		{
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				'X-custom-baru': 'hoho',
			},
		},
	);
	return res?.data;
};

export { logIn };
