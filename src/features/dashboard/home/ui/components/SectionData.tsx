import useGetList from '../../hooks/useGetList';
import {
	Table,
	Row,
	Pagination,
	Col,
	Input,
	Form,
	Select,
	Typography,
	Button,
} from 'antd';

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const SectionData = ({ initialData }: { initialData?: any }) => {
	const {
		fetchQuery,
		onChangePage,
		getCurrentPage,
		handleOnSearch,
		getDefaultValueFromParams,
		dataTable,
		totalPages,
		handleResetFilter,
		handleTableOnChange,
		handleOnChangeKeyword,
	} = useGetList(initialData);

	const { isFetching, isLoading, isError, error }: any = fetchQuery;

	const [form] = Form.useForm();

	const columns = [
		{
			title: 'No',
			dataIndex: 'no',
			key: 'no',
		},
		{
			title: 'Username',
			dataIndex: ['login', 'username'],
			key: 'username',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			sorter: true,
			sortOrder:
				getDefaultValueFromParams().sortBy === 'name'
					? getDefaultValueFromParams().sortOrder
					: null,
			render: (text: any) => (
				<Text>{`${text.title} ${text.first} ${text.last}`}</Text>
			),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			sorter: true,
			sortOrder:
				getDefaultValueFromParams().sortBy === 'email'
					? getDefaultValueFromParams().sortOrder
					: null,
			key: 'email',
			render: (text: string) => <a href={text}>{text}</a>,
		},
		{
			title: 'Gender',
			dataIndex: 'gender',
			sorter: true,
			sortOrder:
				getDefaultValueFromParams().sortBy === 'gender'
					? getDefaultValueFromParams().sortOrder
					: null,
			key: 'gender',
			render: (text: string) => <a href={text}>{text}</a>,
		},
		{
			title: 'Registered Date',
			dataIndex: 'registered',
			sorter: true,
			sortOrder:
				getDefaultValueFromParams().sortBy === 'registered'
					? getDefaultValueFromParams().sortOrder
					: null,
			key: 'date',
			render: (text: any) => new Date(text.date).toUTCString(),
		},
	];

	const renderPagination = (count: any) => {
		return (
			<Pagination
				disabled={isLoading || isFetching}
				showSizeChanger={false}
				onChange={(page: any) => {
					onChangePage(page);
				}}
				current={+getCurrentPage() || 1}
				total={count || 0}
			/>
		);
	};
	if (isError) {
		return (
			<Row align="middle" justify="center">
				<p>{error.toString()}</p>
			</Row>
		);
	}

	return (
		<>
			<Form
				name="search-form"
				form={form}
				autoComplete="off"
				style={{
					marginBottom: '1.25rem',
				}}
			>
				<Row>
					<Col>
						<Text strong>Search by Keyword Filter by Gender</Text>
					</Col>
				</Row>
				<Row style={{ width: '100%' }} gutter={8} align="middle">
					<Col span={4}>
						<Text>Gender</Text>
						<Form.Item name="gender">
							<Select
								disabled={isLoading || isFetching}
								placeholder="Filter by..."
								defaultValue={getDefaultValueFromParams().gender}
								onChange={() => handleOnSearch(form)}
							>
								<Option value="female">Female</Option>
								<Option value="male">Male</Option>
								<Option value="">All</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Text>Search</Text>
						<Form.Item name="keyword">
							<Search
								defaultValue={getDefaultValueFromParams().keyword}
								enterButton
								disabled={isLoading || isFetching}
								placeholder="Search..."
								onChange={() => handleOnChangeKeyword(form)}
								onSearch={() => handleOnSearch(form)}
							/>
						</Form.Item>
					</Col>
					<Col span={4}>
						<Button
							disabled={isLoading || isFetching}
							onClick={handleResetFilter(form)}
						>
							Reset Filter
						</Button>
					</Col>
				</Row>
			</Form>

			<Row style={{ marginBottom: '1.25rem' }}>
				<Col span={24}>
					<Table
						bordered
						columns={columns}
						dataSource={dataTable}
						pagination={false}
						loading={isLoading || isFetching}
						onChange={handleTableOnChange}
					/>
				</Col>
			</Row>
			<Row align="middle" justify="end">
				<Col>{renderPagination(totalPages)}</Col>
			</Row>
		</>
	);
};

export default SectionData;
