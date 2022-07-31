import { MutationCache, QueryClient } from 'react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000, // 1m
			retry: true,
		},
	},
	mutationCache: new MutationCache({
		onError: (err) => {
			console.log(err);
		},
	}),
});

export default queryClient;
