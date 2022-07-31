import { FETCH_DATA } from 'src/shared/constants/endpoint';
import AxiosInstance from '../axiosInstance';

type apiFn = () => Promise<any>;

type Props = {
	key: string[];
	api: apiFn;
};

/**
 *
 * @param params
 * @returns key for react query
 * @returns api function for the api
 */

const fetchDashboard = (params: string): Props => {
	return {
		key: ['DASHBOARD_LIST', 'QUERY', params],
		api: async () => {
			const res = await AxiosInstance.get(FETCH_DATA(params));
			if (!res) {
				throw new Error('Something wrong');
			}

			return res?.data;
		},
	};
};
export { fetchDashboard };
