import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Loading from 'components/LoadingComponent';
import MenuAdmComponent from 'components/MenuAdmComponent';
import PostsComponent from 'components/PostsComponent';
import CreatePost from 'components/CreatePostComponent';
import CompaniesComponent from 'components/CompaniesComponent';
import CreateCompanyComponent from 'components/CreateCompanyComponent';
import EventsComponent from 'components/EventsComponent';
import CouponsComponent from 'components/CouponsComponent';
import UsersComponent from 'components/UsersComponent';
import ShowUsersComponent from 'components/ShowUsersComponent';
import { parseCookies } from 'nookies';
import MenuCompanyComponent from 'components/MenuCompanyComponent';

const { Header, Sider, Content } = Layout;



const AdminDashboard: React.FC = () => {
    const [UserType, setUserType] = useState("");
    useEffect(() => {
        const setType = () => {
            const cookies = parseCookies();
            setUserType(cookies['@app:userType']);
        };

        setType();
    }, []);

    const [currentView, setCurrentView] = useState<
        | 'homeAdm'
        | 'homeCompany'
        | 'Posts'
        | 'PostCreate'
        | 'Companies'
        | 'CompanyCreate'
        | 'Events'
        | 'Coupons'
        | 'Users'
        | 'ShowUsers'
        | null
    >(UserType === 'adm' ? 'homeAdm' : 'homeCompany');
    const [viewValues, setViewValues] = useState<any>(undefined);
    const [loading, setLoading] = useState(false);

    const handleMenuClick = (key: string) => {
        setLoading(true);
        setViewValues(undefined);
        setCurrentView(
            key as
                | 'homeAdm'
                | 'homeCompany'
                | 'Posts'
                | 'PostCreate'
                | 'Companies'
                | 'CompanyCreate'
                | 'Events'
                | 'Coupons'
                | 'Users'
        );
        setLoading(false);
    };

    const handleViewWithValues = (key: string, values: any) => {
        setLoading(true);
        setViewValues(values);
        setCurrentView(
            key as
                | 'homeAdm'
                | 'homeCompany'
                | 'Posts'
                | 'PostCreate'
                | 'Companies'
                | 'CompanyCreate'
                | 'Events'
                | 'Coupons'
                | 'Users'
                | 'ShowUsers'
        );
        setLoading(false);
    };

    const renderComponent = () => {
        switch (currentView) {
            case 'homeAdm':
                return <MenuAdmComponent handleMenuClick={handleMenuClick} />;
            case 'homeCompany':
                return <MenuCompanyComponent handleMenuClick={handleMenuClick} />;
            case 'Posts':
                return (
                    <PostsComponent
                        handleMenuClick={handleMenuClick}
                        handleViewWithValues={handleViewWithValues}
                    />
                );
            case 'PostCreate':
                return (
                    <CreatePost
                        handleMenuClick={handleMenuClick}
                        initialValues={viewValues}
                    />
                );
            case 'ShowUsers':
                return (
                    <ShowUsersComponent
                        handleMenuClick={handleMenuClick}
                        initialValues={viewValues}
                    />
                );
            case 'Companies':
                return <CompaniesComponent handleMenuClick={handleMenuClick}  handleViewWithValues={handleViewWithValues}/>;
            case 'Users':
                return <UsersComponent
                    initialValues={{
                        UserType: UserType
                    }}
                    handleViewWithValues={handleViewWithValues}
                />;
            case 'CompanyCreate':
                return <CreateCompanyComponent handleMenuClick={handleMenuClick}/>;
            case 'Events':
                return <EventsComponent handleMenuClick={handleMenuClick}/>
            case 'Coupons':
                return <CouponsComponent handleMenuClick={handleMenuClick} initialValues={viewValues}/>
            default:
                return <div>Página não encontrada</div>;
        }
    };

    return (
        <Layout style={{ height: '100vh' }}>
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
                    onClick={() => handleMenuClick(UserType === 'adm' ? 'homeAdm' : 'homeCompany')}
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
