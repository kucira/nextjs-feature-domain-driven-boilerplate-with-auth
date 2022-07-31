import { NextRouter, useRouter } from 'next/router';
import { QueryClient } from 'react-query';
import { fetchDashboard } from 'src/shared/api/fetch/dashboard';
import useFetchHook from 'src/shared/api/useFetchHook';
import { DASHBOARD_HOME } from 'src/shared/constants/path';

import { paramsToString } from 'src/shared/helpers/utils';
import { modelDashboard } from '../models/model-dashboard';

import debounce from 'lodash.debounce';
/**
 *
 * @param queryClient
 * @param offset
 */
export const prefetchListQuery = async (
	queryClient: QueryClient,
	params: any,
) => {
	const fetchDataDashboard = fetchDashboard(paramsToString(params));
	await queryClient.prefetchQuery(
		fetchDataDashboard.key,
		fetchDataDashboard.api,
	);
};

/**
 * the optional initial data used for SSR
 * @param initialData
 */
const useGetList = (initialData?: any) => {
	const router: NextRouter = useRouter();
	const { query } = router;
	const page = query.page || 1;
	const results = 10;
	const totalPages = results * 10;

	const params = {
		...query,
		results,
	};

	/**
	 * use query
	 * with key of array combine based on params
	 */
	const fetchDataDashboard = fetchDashboard(paramsToString(params));
	const fetchQuery: any = useFetchHook({
		keys: fetchDataDashboard.key,
		api: fetchDataDashboard.api,
		initialData,
		option: {
			onError: (error: any) => {
				console.log('error', error.toString());
			},
		},
	});

	const getCurrentPage = (): string => {
		return page as string;
	};

	const dataTable = modelDashboard(
		fetchQuery?.data?.results,
		+getCurrentPage(),
		10,
	);

	const generateLinkPagination = (type: string): string => {
		let currentPage = +page as number;
		currentPage =
			type === 'next'
				? currentPage + 1
				: currentPage > 1
				? currentPage - 1
				: currentPage;

		const params = paramsToString({
			...query,
			page: currentPage,
		});

		return `${DASHBOARD_HOME}${params}`;
	};

	const onChangePage = (page: string) => {
		const params = paramsToString({
			...query,
			page,
		});
		router.push(`${DASHBOARD_HOME}${params}`);
	};

	const handleOnSearch = (form: any) => {
		const params = paramsToString({
			...query,
			page: 1,
			gender: form?.getFieldValue('gender'),
			keyword: form?.getFieldValue('keyword'),
		});
		router.push(params);
	};

	const handleSort = (sortBy: string, sortOrder: string) => {
		const params = paramsToString({
			...query,
			page: 1,
			sortBy,
			sortOrder,
		});
		router.replace(params, undefined, { shallow: true });
	};

	const getDefaultValueFromParams = (): any => {
		const url = new URL(window.location.href);
		const params = {
			gender: query?.gender || url.searchParams.get('gender') || '',
			keyword: query?.keyword || url.searchParams.get('keyword') || '',
			sortOrder: query?.sortOrder || url.searchParams.get('sortOrder') || '',
			sortBy: query?.sortBy || url.searchParams.get('sortBy') || '',
		};

		return params;
	};

	const handleResetFilter = (form: any) => {
		return function (e: any) {
			e.preventDefault();

			const params = paramsToString({
				page: 1,
			});

			form?.setFieldsValue({
				keyword: '',
				gender: '',
			});
			router.push(params);
		};
	};

	const handleTableOnChange = (...args: any) => {
		const sort = args[2];
		handleSort(sort.field, sort.order);
	};

	const handleOnChangeKeyword = debounce((form: any) => {
		handleOnSearch(form);
	}, 500);

	return {
		fetchQuery,
		generateLinkPagination,
		getCurrentPage,
		onChangePage,
		handleOnSearch,
		getDefaultValueFromParams,
		dataTable,
		totalPages,
		handleResetFilter,
		handleTableOnChange,
		handleOnChangeKeyword,
		query,
	};
};

export default useGetList;
