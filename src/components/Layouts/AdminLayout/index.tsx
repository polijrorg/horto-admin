import React from 'react';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    PoweroffOutlined,
    TeamOutlined,
    CompassOutlined,
    CalendarOutlined,
    FileAddOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import useAuth from 'hooks/useAuth';

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = ({ children }) => {
    const router = useRouter();

    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push('/');
    }

    return (
        <Layout style={{ height: '100%' }}>
            <Sider style={{ background: '#FCFCFC' }}>
                <div
                    className="logo"
                    style={{
                        padding: '20px',
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        background: '#F8C687'
                    }}
                >
                    O Clube ADM Dashboard
                </div>
                <Menu style={{ background: '#F6F6F6' }} mode="inline">
                    <Menu.Item
                        key="1"
                        icon={<HomeOutlined />}
                        onClick={() => router.push('/Home')}
                    >
                        Home
                    </Menu.Item>
                    <Menu.Item
                        key="2"
                        icon={<TeamOutlined />}
                        onClick={() => router.push('/Users')}
                    >
                        Usuários
                    </Menu.Item>
                    <Menu.Item
                        key="3"
                        icon={<CompassOutlined />}
                        onClick={() => router.push('/Companies')}
                    >
                        Empresas
                    </Menu.Item>
                    <Menu.Item
                        key="4"
                        icon={<CalendarOutlined />}
                        onClick={() => router.push('/Events')}
                    >
                        Eventos
                    </Menu.Item>
                    <Menu.Item
                        key="1"
                        icon={<FileAddOutlined />}
                        onClick={() => router.push('/Posts')}
                    >
                        Posts
                    </Menu.Item>
                    <Menu.Item
                        key="8"
                        icon={<PoweroffOutlined />}
                        onClick={handleLogout}
                    >
                        Sair
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                        background:
                            'linear-gradient(90deg, #F8C687 0%, #CC8D3E 100%)'
                    }}
                />
                <Content style={{ margin: '16px' }}>{children}</Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
