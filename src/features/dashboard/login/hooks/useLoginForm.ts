import { useRouter } from 'next/router';
import useMutationHook from 'src/shared/api/useMutationHook';

import { logIn } from 'src/shared/api/mutation/login';
import { DASHBOARD_HOME } from 'src/shared/constants/path';
import Cookies from 'js-cookie';

/**
 * hook for login form
 * @returns {Object}
 */
const useLoginForm = () => {
	let _email = '';
	const router = useRouter();

	const mutationQuery = useMutationHook({
		api: logIn,
		options: {
			onError: (error: any) => {
				console.log('error', error.toString());
			},
			onSuccess: () => {
				console.log('success nih');
				Cookies.set('user', _email);
				router.replace(DASHBOARD_HOME);
			},
			throwOnError: () => {
				console.log('throw error');
			},
		},
	});

	// eslint-disable-next-line no-unused-vars
	const handleOnSubmit = async (email: string, password: string) => {
		_email = email;
		Cookies.set('user', _email);
		router.replace(DASHBOARD_HOME);
		// mutationQuery.mutate({
		// 	email,
		// 	password,
		// });
	};

	return {
		mutationQuery,
		handleOnSubmit,
	};
};

export default useLoginForm;
