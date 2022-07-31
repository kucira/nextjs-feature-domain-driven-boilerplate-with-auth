import { useQuery } from 'react-query';

const useFetchHook = ({ keys, api, initialData, option }: any) => {
	const fetchQuery = useQuery(keys, api, {
		...(initialData && { initialData }),
		...option,
	});

	return fetchQuery;
};

export default useFetchHook;
