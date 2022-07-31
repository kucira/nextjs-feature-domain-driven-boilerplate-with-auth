export const modelDashboard = (
	data: any[],
	currentPage: number,
	limit: number,
) => {
	const model: any[] =
		data?.map((p: any, idx: number) => ({
			...p,
			no: idx + 1 + currentPage * limit - limit,
		})) || [];

	return model;
};
