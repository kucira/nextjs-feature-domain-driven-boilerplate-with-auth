import React, { useState } from 'react';
import { Layout } from 'antd';
import HeaderComponent from './Header';
import SidebarComponent from './Sidebar';

const { Content } = Layout;

type Props = {
	children: React.ReactElement;
	isShow: boolean;
};

const LayoutComponent = ({ children, isShow }: Props) => {
	const [isSidebarCollapsed, setIsSideBarCollapsed] = useState(false);
	const onCollapse = (collapsed: boolean) => {
		setIsSideBarCollapsed(collapsed);
	};
	if (!isShow) {
		return children;
	}
	return (
		<>
			<HeaderComponent
				isShow
				style={{
					marginLeft: isSidebarCollapsed ? 50 : 200,
					position: 'sticky',
					top: 0,
					zIndex: 1,
				}}
			/>
			<Layout hasSider>
				<SidebarComponent
					isSidebarCollapsed={isSidebarCollapsed}
					onCollapse={onCollapse}
				/>

				<Layout style={{ background: 'white' }}>
					<Content
						style={{
							padding: 24,
							margin: 0,
							marginLeft: isSidebarCollapsed ? 100 : 200,
						}}
					>
						{children}
					</Content>
				</Layout>
			</Layout>
		</>
	);
};

export default LayoutComponent;
