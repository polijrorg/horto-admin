import React from 'react';
import { Layout, Menu, Card } from 'antd';
import {
  HomeOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const AdminDashboard: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{background: '#FCFCFC'}}>
        <div className="logo" style={{ padding: '20px', color: 'black', fontWeight: 'bold', fontSize: '18px', background: '#F8C687' }}>
          Horto Club
        </div>
        <Menu style={{background: '#F6F6F6'}} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, background: 'linear-gradient(90deg, #F8C687 0%, #CC8D3E 100%)', }} />
        <Content style={{ margin: '16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <h2>Área do Administrador</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
              <Card
                hoverable
                style={{ width: 240, textAlign: 'center' }}
                cover={<BarChartOutlined style={{ fontSize: '64px', margin: '16px 0', color: '#c47f38' }} />}
              >
                <Card.Meta title="Análise de Usuário" />
              </Card>
              <Card
                hoverable
                style={{ width: 240, textAlign: 'center' }}
                cover={<AppstoreOutlined style={{ fontSize: '64px', margin: '16px 0', color: '#c47f38' }} />}
              >
                <Card.Meta title="Gerenciar Empresas" />
              </Card>
              <Card
                hoverable
                style={{ width: 240, textAlign: 'center' }}
                cover={<CalendarOutlined style={{ fontSize: '64px', margin: '16px 0', color: '#c47f38' }} />}
              >
                <Card.Meta title="Gerenciar Eventos" />
              </Card>
              <Card
                hoverable
                style={{ width: 240, textAlign: 'center' }}
                cover={<PlusOutlined style={{ fontSize: '64px', margin: '16px 0', color: '#c47f38' }} />}
              >
                <Card.Meta title="Gerenciar Posts" />
              </Card>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
