import React from 'react';
import { User } from 'interfaces/Auth';

function padToTwoDigits(number: number): string {
    return number.toString().padStart(2, '0');
}

function customFormatDate(dateString: string): string {
    const date = new Date(dateString);

    const day = padToTwoDigits(date.getDate());
    const month = padToTwoDigits(date.getMonth() + 1); // Os meses são baseados em zero
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export const getColumns = (UserType: string) => {
    const columns = [
        {
            title: 'Cupom Resgatado',
            dataIndex: 'discount',
            key: 'discount',
            render: (text: string) => <span>{text}</span>
        },
        UserType === 'adm' && {
            title: 'Local',
            dataIndex: 'location',
            key: 'location',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: 'Código do cupom',
            dataIndex: 'couponCode',
            key: 'couponCode',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: 'Data de resgate',
            dataIndex: 'redemptionDate',
            key: 'redemptionDate',
            render: (text: string) => <span>{text}</span>

            // const formattedDate = customFormatDate(text);
            // return <span>{formattedDate}</span>;
        }
    ];

    return columns.filter(Boolean);
};
