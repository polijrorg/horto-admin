import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Loading from 'components/LoadingComponent';
import MenuAdmComponent from 'components/MenuAdmComponent';

const { Header, Sider, Content } = Layout;

const AdminDashboard: React.FC = () => {
    const [currentView, setCurrentView] = useState<'homeAdm' | null>(`homeAdm`);
    const [loading, setLoading] = useState(false);

    const handleMenuClick = (key: string) => {
        setLoading(true);
        setCurrentView(key as 'homeAdm');
        setLoading(false);
    };

    const renderComponent = () => {
        switch (currentView) {
            case 'homeAdm':
                return <MenuAdmComponent />;
            default:
                return <div>Página não encontrada</div>;
        }
    };

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
                    Horto Club
                </div>
                <Menu
                    onClick={() => handleMenuClick('homeAdm')}
                    style={{ background: '#F6F6F6' }}
                    mode="inline"
                >
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        Home
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
                {loading ? (
                    <Loading />
                ) : (
                    <Content style={{ margin: '16px' }}>
                        {renderComponent()}
                    </Content>
                )}
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
