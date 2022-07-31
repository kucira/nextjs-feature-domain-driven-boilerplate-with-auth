import { useMutation } from 'react-query';

const useMutationHook = ({ api, options }: any) => {
	const mutationQuery: any = useMutation(api, {
		...options,
	});

	return mutationQuery;
};

export default useMutationHook;
