import React from 'react';
import { Layout, Menu } from 'antd';
import {
	UserOutlined,
	LaptopOutlined,
	NotificationOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

type Props = {
	menu?: any;
	isSidebarCollapsed: boolean;
	onCollapse: any;
};

const SidebarComponent = ({
	menu = [],
	isSidebarCollapsed,
	onCollapse,
}: Props) => {
	return (
		<Sider
			collapsible
			collapsed={isSidebarCollapsed}
			onCollapse={onCollapse}
			width={200}
			style={{
				background: 'white',
				overflow: 'auto',
				height: '95vh',
				position: 'fixed',
				left: 0,
				top: 0,
				bottom: 0,
				zIndex: 10,
				boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
			}}
		>
			<Menu
				mode="inline"
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				style={{ height: '100%', borderRight: 0 }}
			>
				<SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
					<Menu.Item key="1">option1</Menu.Item>
					<Menu.Item key="2">option2</Menu.Item>
					<Menu.Item key="3">option3</Menu.Item>
					<Menu.Item key="4">option4</Menu.Item>
				</SubMenu>
				<SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
					<Menu.Item key="5">option5</Menu.Item>
					<Menu.Item key="6">option6</Menu.Item>
					<Menu.Item key="7">option7</Menu.Item>
					<Menu.Item key="8">option8</Menu.Item>
				</SubMenu>
				<SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 4">
					<Menu.Item key="9">option9</Menu.Item>
					<Menu.Item key="10">option10</Menu.Item>
					<Menu.Item key="11">option11</Menu.Item>
					<Menu.Item key="12">option12</Menu.Item>
				</SubMenu>
				<SubMenu key="sub4" icon={<NotificationOutlined />} title="subnav 5">
					<Menu.Item key="13">option9</Menu.Item>
					<Menu.Item key="14">option10</Menu.Item>
					<Menu.Item key="15">option11</Menu.Item>
					<Menu.Item key="16">option12</Menu.Item>
				</SubMenu>
				<SubMenu key="sub5" icon={<NotificationOutlined />} title="subnav 6">
					<Menu.Item key="17">option9</Menu.Item>
					<Menu.Item key="18">option10</Menu.Item>
					<Menu.Item key="19">option11</Menu.Item>
					<Menu.Item key="20">option12</Menu.Item>
				</SubMenu>
				<SubMenu key="sub6" icon={<NotificationOutlined />} title="subnav 7">
					<Menu.Item key="21">option9</Menu.Item>
					<Menu.Item key="22">option10</Menu.Item>
					<Menu.Item key="23">option11</Menu.Item>
					<Menu.Item key="24">option12</Menu.Item>
				</SubMenu>
				<SubMenu key="sub7" icon={<NotificationOutlined />} title="subnav 8">
					<Menu.Item key="25">option9</Menu.Item>
					<Menu.Item key="26">option10</Menu.Item>
					<Menu.Item key="27">option11</Menu.Item>
					<Menu.Item key="28">option12</Menu.Item>
				</SubMenu>
			</Menu>
		</Sider>
	);
};

export default SidebarComponent;
