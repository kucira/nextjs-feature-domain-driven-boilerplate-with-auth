import { Button, Card, Checkbox, Form, Input } from 'antd';
import useLoginForm from '../../hooks/useLoginForm';

const FormLogin = () => {
	const { mutationQuery, handleOnSubmit } = useLoginForm();
	const { isLoading, isError, error } = mutationQuery;

	const onFinish = async (values: any) => {
		await handleOnSubmit(values.email, values.password);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	if (isError) {
		return <p>{error.toString()}</p>;
	}

	return (
		<Card title="Login" style={{ borderRadius: '2%' }}>
			<Form
				layout="vertical"
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: 'Please input your email!',
							type: 'email',
						},
					]}
				>
					<Input
						required
						placeholder="Your email address"
						style={{ fontSize: '1.05rem' }}
					/>
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password
						required
						placeholder="Your Password"
						style={{ fontSize: '1.05rem' }}
					/>
				</Form.Item>

				<Form.Item name="remember" valuePropName="checked">
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 10, span: 10 }}>
					<Button
						type="primary"
						size="large"
						shape="round"
						htmlType="submit"
						loading={isLoading}
					>
						Sign in
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default FormLogin;
