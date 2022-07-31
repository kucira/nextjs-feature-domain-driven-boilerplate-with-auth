/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import FormLogin from 'src/features/dashboard/login/ui/components/FormLogin';
import HeadMeta from 'src/shared/components/HeadMeta';
import withPrivateRoute from 'src/shared/libs/withPrivateRoute';

function Home() {
	return (
		<>
			<HeadMeta title="Landing Page">
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content="Welcome to dashboard" />
			</HeadMeta>

			<Layout>
				<Content style={{ background: 'white' }}>
					<Row align="middle" justify="center" style={{ height: '100vh' }}>
						<Col
							style={{
								width: '40%',
								boxShadow: `rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 0px`,
							}}
						>
							<FormLogin />
						</Col>
					</Row>
				</Content>
			</Layout>
		</>
	);
}

export default withPrivateRoute(Home);
