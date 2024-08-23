import React from 'react';
import { Card } from 'antd';
import {
    BarChartOutlined,
    AppstoreOutlined,
    CalendarOutlined,
    PlusOutlined
} from '@ant-design/icons';

interface MenuComponentProps {
    handleMenuClick: (key: string) => void;
}

const MenuAdmComponent: React.FC<MenuComponentProps> = ({
    handleMenuClick
}) => {
    return (
        <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
        >
            <h2>Área do Administrador</h2>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '20px'
                }}
            >
                <Card
                    hoverable
                    style={{ width: 240, textAlign: 'center' }}
                    cover={
                        <BarChartOutlined
                            style={{
                                fontSize: '64px',
                                margin: '16px 0',
                                color: '#c47f38'
                            }}
                        />
                    }
                    onClick={() => handleMenuClick('Coupons')}
                >
                    <Card.Meta title="Análise de Usuário" />
                </Card>
                <Card
                    hoverable
                    style={{ width: 240, textAlign: 'center' }}
                    cover={
                        <AppstoreOutlined
                            style={{
                                fontSize: '64px',
                                margin: '16px 0',
                                color: '#c47f38'
                            }}
                        />
                    }
                    onClick={() => handleMenuClick('Companies')}
                >
                    <Card.Meta title="Gerenciar Empresas" />
                </Card>
                <Card
                    hoverable
                    style={{ width: 240, textAlign: 'center' }}
                    cover={
                        <CalendarOutlined
                            style={{
                                fontSize: '64px',
                                margin: '16px 0',
                                color: '#c47f38'
                            }}
                        />
                    }
                    onClick={() => handleMenuClick('Events')}
                >
                    <Card.Meta title="Gerenciar Eventos" />
                </Card>
                <Card
                    hoverable
                    style={{ width: 240, textAlign: 'center' }}
                    cover={
                        <PlusOutlined
                            style={{
                                fontSize: '64px',
                                margin: '16px 0',
                                color: '#c47f38'
                            }}
                        />
                    }
                    onClick={() => handleMenuClick('Posts')}
                >
                    <Card.Meta title="Gerenciar Posts" />
                </Card>
            </div>
        </div>
    );
};

export default MenuAdmComponent;
