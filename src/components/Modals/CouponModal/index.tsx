import React from 'react';
import { Modal } from 'antd';
import { customFormatDate } from 'utils/dateUtil';
import { ICoupon } from 'interfaces/Coupons';
import * as S from './styles';

interface CouponModalProps {
    coupon: ICoupon | null;
    visible: boolean;
    onClose: () => void;
}

const CouponModal: React.FC<CouponModalProps> = ({
    coupon,
    visible,
    onClose
}) => {
    if (!coupon) return null;

    return (
        <Modal
            title="Detalhes do Cupom"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <S.ModalContent>
                <S.Section>
                    <S.Label>Nome do Cupom:</S.Label>
                    <S.Value>{coupon.name}</S.Value>
                </S.Section>

                <S.Section>
                    <S.Label>Tipo:</S.Label>
                    <S.Value>
                        {coupon.couponType === 'BASIC' ? 'Básico' : 'Premium'}
                    </S.Value>
                </S.Section>

                <S.Section>
                    <S.Label>Recompensa:</S.Label>
                    <S.Value>{coupon.reward}</S.Value>
                </S.Section>

                <S.Section>
                    <S.Label>Valor:</S.Label>
                    <S.Value>{coupon.payment}</S.Value>
                </S.Section>

                <S.Section>
                    <S.Label>Regras:</S.Label>
                    <S.Value>{coupon.rules}</S.Value>
                </S.Section>

                <S.Section>
                    <S.Label>Validade:</S.Label>
                    <S.Value>{customFormatDate(coupon.expirationDate)}</S.Value>
                </S.Section>

                <S.Section>
                    <S.Label>Status:</S.Label>
                    <S.Value>{coupon.active ? 'Ativo' : 'Inativo'}</S.Value>
                </S.Section>
            </S.ModalContent>
        </Modal>
    );
};

export default CouponModal;
