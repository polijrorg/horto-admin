import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = ({ children }) => {
    const router = useRouter();

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
