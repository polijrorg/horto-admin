import React from 'react';
import { Card, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ICoupon } from 'interfaces/Coupons';
import { customFormatDate } from 'utils/dateUtil';
import useAuth from 'hooks/useAuth';
import * as S from './styles';

interface CouponCardProps {
    coupon: ICoupon;
    onEdit: (coupon: ICoupon) => void;
    onDelete: (couponId: string) => void;
    onClick?: (coupon: ICoupon) => void;
}

const CouponCard: React.FC<CouponCardProps> = ({
    coupon,
    onEdit,
    onDelete,
    onClick
}) => {
    const { userType } = useAuth(); // Obtém os dados do usuário autenticado

    const handleCardClick = (e: React.MouseEvent) => {
        // Verifica se o clique não foi em um botão e se existe a função onClick
        const isButtonClick = (e.target as HTMLElement).closest('button');
        if (!isButtonClick && onClick) {
            onClick(coupon);
        }
    };

    return (
        <S.CardContainer
            onClick={handleCardClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            <Card
                bordered
                cover={
                    userType === 'adm' && (
                        <S.IconContainer>
                            <Button
                                shape="circle"
                                icon={<EditOutlined />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(coupon);
                                }}
                            />
                            <Button
                                shape="circle"
                                danger
                                icon={<DeleteOutlined />}
                                style={{ marginLeft: '5px' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(coupon.id);
                                }}
                            />
                        </S.IconContainer>
                    )
                }
            >
                <S.CardContent>
                    <S.RewardText>{coupon.reward}</S.RewardText>
                    <S.RewardText>{coupon.couponType}</S.RewardText>
                    <S.ExpirationContainer>
                        <S.ExpirationLabel>Validade</S.ExpirationLabel>
                        <S.ExpirationDate>
                            {customFormatDate(coupon.expirationDate)}
                        </S.ExpirationDate>
                    </S.ExpirationContainer>
                </S.CardContent>
            </Card>
        </S.CardContainer>
    );
};

export default CouponCard;
