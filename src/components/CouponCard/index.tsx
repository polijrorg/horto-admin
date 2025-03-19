import React from 'react';
import { Card, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Coupon } from 'interfaces/Coupons';
import { customFormatDate } from 'utils/dateUtil';
import * as S from './styles';

interface CouponCardProps {
    coupon: Coupon;
    onEdit: (coupon: Coupon) => void;
    onDelete: (couponId: string) => void;
}

const CouponCard: React.FC<CouponCardProps> = ({
    coupon,
    onEdit,
    onDelete
}) => {
    return (
        <S.CardContainer>
            <Card
                bordered
                cover={
                    <S.IconContainer>
                        <Button
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => onEdit(coupon)}
                        />
                        <Button
                            shape="circle"
                            danger
                            icon={<DeleteOutlined />}
                            style={{ marginLeft: '5px' }}
                            onClick={() => onDelete(coupon.id)}
                        />
                    </S.IconContainer>
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
