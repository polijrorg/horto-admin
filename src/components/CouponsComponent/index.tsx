import React from 'react';
import { Card, Typography, Button, Flex } from 'antd';
import * as S from './styles';
import {
    EditOutlined
} from '@ant-design/icons';
import { Company } from 'interfaces/Companies';
const { Text } = Typography;

interface MenuComponentProps {
    handleMenuClick: (key: string) => void;
    initialValues?: Company;
}

const CouponsComponent: React.FC<MenuComponentProps> = ({
    handleMenuClick,
    initialValues
}) => {
    console.log(initialValues);

    return (
        <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
        >
            <h2>Cupons Ativos</h2>
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
                        bordered={true}
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
                                        margin: '10px',
                                    }}
                                />
                            </S.IconContainer>
                        }
                        bodyStyle={{ backgroundColor: '#2B2F2A' }}
                    >
                        <S.CardContent>
                            <Text style={{ color: '#CC8D3E', fontWeight: 'bold', fontSize: 18 }}>
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
                                <Text style={{ color: '#CC8D3E', fontSize: 12 }}>Validade</Text>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                                    {new Date(coupon.expirationDate).toLocaleDateString('pt-BR', { month: '2-digit', year: '2-digit' })}
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
