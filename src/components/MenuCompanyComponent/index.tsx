import React from 'react';
import { Card } from 'antd';

interface MenuComponentProps {
    handleMenuClick: (key: string) => void;
}

const MenuCompanyComponent: React.FC<MenuComponentProps> = ({
    handleMenuClick
}) => {
    return (
        <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
        >
            <h2>Área Empresarial</h2>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '20px'
                }}
            >
                <Card
                    hoverable
                    style={{ width: 400, textAlign: 'center' }}
                    cover={
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <img style={{ width: 64, height: 64, margin: 16, color: '#c47f38'}}
                                src="assets/icons/data_visualiation_graph.svg"
                            />
                        </div>
                    }
                    onClick={() => handleMenuClick('Users')}
                >
                    <Card.Meta title="Análise de Clientes" />
                </Card>
                <Card
                    hoverable
                    style={{ width: 400, textAlign: 'center' }}
                    cover={
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <img style={{ width: 64, height: 64, margin: 16, color: '#c47f38'}}
                                src="assets/icons/mdi_coupon.svg"
                            />
                        </div>
                    }
                    onClick={() => handleMenuClick('Companies')}
                >
                    <Card.Meta title="Solicitar inclusão de Novo Cupom" />
                </Card>
                <Card
                    hoverable
                    style={{ width: 400, textAlign: 'center' }}
                    cover={
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img style={{ width: 64, height: 64, margin: 16, color: '#c47f38'}}
                            src="assets/icons/benefits-welfare.svg"
                        />
                    </div>
                    }
                    onClick={() => handleMenuClick('Plans')}
                >
                    <Card.Meta title="Plano de Benefícios" />
                </Card>
            </div>
        </div>
    );
};

export default MenuCompanyComponent;
