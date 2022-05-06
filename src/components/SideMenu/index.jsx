import React, { useContext } from 'react';
import { Menu } from 'antd';
import {
	UserOutlined,
	UserAddOutlined,
	HomeOutlined,
	UserSwitchOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/dist/client/router';
import styled from '@emotion/styled';
import { AppContext } from '../../store/AppState';
const MenuContainer = styled.div``;
const SideMenu = () => {
	const router = useRouter();
	const handleClick = (e) => {
		router.push(`/${e.key}`);
	};
	const { userInfo, isUserLoggedIn } = useContext(AppContext);
	let isAdmin = false;
	let isCustomer = false;
	if (isUserLoggedIn && userInfo?.user) {
		isAdmin = userInfo?.user.accountUserType == 'ADMIN';
		isCustomer = userInfo?.user.accountUserType == 'CUSTOMER';
	}
	return (
		<MenuContainer>
			<Menu
				onClick={handleClick}
				style={{ width: 256, backgroundColor: '#FAFAFA', paddingLeft: 20, height: '100%' }}
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				mode='inline'
			>
				{(isAdmin) && (
					<Menu.Item
						key=''
						icon={
							<HomeOutlined style={{ fontSize: '20px', color: '#1791FF' }} />
						}
						title='Dashboard'
					>
						Dashboard
					</Menu.Item>
				)}
				<Menu.Item
					key='jobs'
					icon={
						<UserAddOutlined style={{ fontSize: '20px', color: '#1791FF' }} />
					}
					title='Jobs'
				>
					Jobs
				</Menu.Item>
				{isAdmin && (
					<Menu.Item
						key='users'
						icon={
							<UserOutlined style={{ fontSize: '20px', color: '#1791FF' }} />
						}
						title='Users'
					>
						Users
					</Menu.Item>
				)}
				<Menu.Item
					key='CustomerReview'
					icon={
						<UserSwitchOutlined
							style={{ fontSize: '20px', color: '#1791FF' }}
						/>
					}
					title='Customer Review'
				>
					Customer Review{' '}
				</Menu.Item>
			</Menu>
		</MenuContainer>
	);
};

export default SideMenu;
