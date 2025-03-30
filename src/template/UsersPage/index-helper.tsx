/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { User } from 'interfaces/Users';
import { ICoupon } from 'interfaces/Coupons';
import { customFormatDate } from 'utils/dateUtil';

export const getColumns = (handleGoTo: (post: string) => void) => [
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record: User) => (
            <a onClick={() => handleGoTo(record.id)} key={record.id}>
                {text}
            </a>
        )
    },
    {
        title: 'Quantidade de Cupons Usados',
        dataIndex: 'usedCoupons',
        key: 'usedCoupons',
        render: (couponsList: ICoupon[]) => <span>{couponsList.length}</span>
    },
    {
        title: 'Idade',
        dataIndex: 'age',
        key: 'age',
        render: (age: string) => <span>{age}</span>
    },
    {
        title: 'Planos de Assinatura',
        dataIndex: 'subscribePlan',
        key: 'subscribePlan',
        render: (text: string) => {
            return <span>{text}</span>;
        }
    },
    {
        title: 'Data de cadastro',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text: string) => {
            const date = customFormatDate(text);
            return <span>{date}</span>;
        }
    }
];
