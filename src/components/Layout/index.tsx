import React from 'react';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    PoweroffOutlined,
    TeamOutlined,
    CompassOutlined,
    CalendarOutlined,
    FileAddOutlined,
    CrownOutlined,
    TagOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import useAuth from 'hooks/useAuth';

const { Header, Sider, Content } = Layout;

const UnifiedLayout: React.FC = ({ children }) => {
    const router = useRouter();
    const { logout, userType, userId } = useAuth();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    // Configurações específicas para cada tipo de usuário
    const layoutConfig = {
        adm: {
            title: 'O Clube ADM Dashboard',
            menuItems: [
                {
                    key: '1',
                    icon: <HomeOutlined />,
                    label: 'Home',
                    path: '/Home'
                },
                {
                    key: '2',
                    icon: <TeamOutlined />,
                    label: 'Usuários',
                    path: '/Users'
                },
                {
                    key: '3',
                    icon: <CompassOutlined />,
                    label: 'Empresas',
                    path: '/Companies'
                },
                {
                    key: '4',
                    icon: <CalendarOutlined />,
                    label: 'Eventos',
                    path: '/Events'
                },
                {
                    key: '5',
                    icon: <FileAddOutlined />,
                    label: 'Posts',
                    path: '/Posts'
                },
                {
                    key: '6',
                    icon: <CrownOutlined />,
                    label: 'Planos',
                    path: '/PlansManager'
                }
            ]
        },
        company: {
            title: 'O Clube Company Dashboard',
            menuItems: [
                {
                    key: '1',
                    icon: <HomeOutlined />,
                    label: 'Home',
                    path: '/Home'
                },
                {
                    key: '2',
                    icon: <TeamOutlined />,
                    label: 'Usuários',
                    path: '/Users'
                },
                {
                    key: '3',
                    icon: <TagOutlined />,
                    label: 'Seus cupons',
                    path: {
                        pathname: '/Coupons',
                        query: { companyId: userId }
                    }
                },
                {
                    key: '4',
                    icon: <CrownOutlined />,
                    label: 'Planos e Benefícios',
                    path: '/Plans'
                }
            ]
        }
    };

    // Itens comuns a ambos os usuários (como logout)
    const commonMenuItems = [
        {
            key: 'logout',
            icon: <PoweroffOutlined />,
            label: 'Sair',
            action: handleLogout
        }
    ];

    // Filtra os itens do menu com base no tipo de usuário
    const currentConfig =
        layoutConfig[userType as keyof typeof layoutConfig] ||
        layoutConfig.company;
    const menuItems = [
        ...currentConfig.menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            action: () => router.push(item.path)
        })),
        ...commonMenuItems
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
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
                    {currentConfig.title}
                </div>
                <Menu style={{ background: '#F6F6F6' }} mode="inline">
                    {menuItems.map((item) => (
                        <Menu.Item
                            key={item.key}
                            icon={item.icon}
                            onClick={item.action}
                        >
                            {item.label}
                        </Menu.Item>
                    ))}
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

export default UnifiedLayout;
