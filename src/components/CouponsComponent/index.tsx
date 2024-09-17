import React from 'react';
import { Card, Typography, Button } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Coupon } from 'interfaces/Coupons';
import * as S from './styles';

const { Text } = Typography;

interface InitialValuesProps {
    coupons: Coupon[];
}

interface MenuComponentProps {
    handleMenuClick: (key: string) => void;
    initialValues?: InitialValuesProps;
}

const CouponsComponent: React.FC<MenuComponentProps> = ({
    handleMenuClick,
    initialValues
}) => {
    return (
        <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                    marginTop: 8,
                    marginRight: 16
                }}
            >
                <h2>Cupons Ativos</h2>
                <PlusOutlined
                    style={{
                        fontSize: '32px',
                        color: '#CC8D3E'
                    }}
                    onClick={() => handleMenuClick('CupomCreate')}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '20px'
                }}
            >
                {initialValues?.coupons.map((coupon) => (
                    <Card
                        key={coupon.id}
                        bordered
                        style={{
                            width: 200,
                            borderRadius: 10,
                            borderColor: '#CC8D3E',
                            marginBottom: 20
                        }}
                        cover={
                            <S.IconContainer>
                                <Button
                                    shape="circle"
                                    icon={<EditOutlined />}
                                    style={{
                                        backgroundColor: '#CC8D3E',
                                        borderColor: '#CC8D3E',
                                        color: '#fff',
                                        float: 'right',
                                        margin: '10px'
                                    }}
                                />
                            </S.IconContainer>
                        }
                        bodyStyle={{ backgroundColor: '#2B2F2A' }}
                    >
                        <S.CardContent>
                            <Text
                                style={{
                                    color: '#CC8D3E',
                                    fontWeight: 'bold',
                                    fontSize: 18
                                }}
                            >
                                {coupon.reward}
                            </Text>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: 8,
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={{ color: '#CC8D3E', fontSize: 12 }}
                                >
                                    Validade
                                </Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: 18
                                    }}
                                >
                                    {new Date(
                                        coupon.expirationDate
                                    ).toLocaleDateString('pt-BR', {
                                        month: '2-digit',
                                        year: '2-digit'
                                    })}
                                </Text>
                            </div>
                        </S.CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CouponsComponent;
