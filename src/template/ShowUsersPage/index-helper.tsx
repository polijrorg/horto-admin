import { ColumnsType } from 'antd/es/table';
import { ICoupon } from 'interfaces/Coupons';
import { customFormatDateTime } from 'utils/dateUtil';

export const getColumns = (): ColumnsType<ICoupon> => {
    const baseColumns: ColumnsType<ICoupon> = [
        {
            title: 'Nome do Cupom',
            dataIndex: ['coupon', 'name'],
            key: 'coupon.name',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: 'Tipo',
            dataIndex: ['coupon', 'couponType'],
            key: 'coupon.couponType',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: 'Pagamento',
            dataIndex: ['coupon', 'payment'],
            key: 'coupon.payment',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: 'Recompensa',
            dataIndex: ['coupon', 'reward'],
            key: 'coupon.reward',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: 'Data de Expiração',
            dataIndex: ['coupon', 'expirationDate'],
            key: 'coupon.expirationDate',
            render: (date: string) => (
                <span>{new Date(date).toLocaleDateString()}</span>
            )
        },
        {
            title: 'Status',
            dataIndex: ['coupon', 'active'],
            key: 'coupon.active',
            render: (active: boolean) => (
                <span>{active ? 'Ativo' : 'Inativo'}</span>
            )
        },
        {
            title: 'Quando o cupom foi usado',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => <span>{customFormatDateTime(text)}</span>
        }
    ];
    return baseColumns;
};
