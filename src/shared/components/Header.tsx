import { Layout, Menu } from 'antd';

const { Header } = Layout;
type Props = {
	isShow?: boolean;
	style?: any;
};

const HeaderComponent = ({ isShow = false, style }: Props) => {
	if (!isShow) {
		return null;
	}
	return (
		<Header className="header" style={style}>
			<div className="logo" />
			<Menu theme="dark" mode="horizontal">
				<Menu.Item key="1">nav 1</Menu.Item>
				<Menu.Item key="2">nav 2</Menu.Item>
				<Menu.Item key="3">nav 3</Menu.Item>
			</Menu>
		</Header>
	);
};
export default HeaderComponent;
