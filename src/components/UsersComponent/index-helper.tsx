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

export const getColumns = (
    handleGoTo: (post: User) => void,
) => [
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record: User) => (
            <a onClick={() => handleGoTo(record)} key={record.id}>
                {text}
            </a>
        )
    },
    {
        title: 'Já utilizou Cupons?',
        dataIndex: 'title',
        key: 'title',
        render: (text: string) => <span>{text}</span>
    },
    {
        title: 'Preferência',
        dataIndex: 'text',
        key: 'text',
        render: (text: string) => <span>{text}</span>
    },
    {
        title: 'Último acesso',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text: string) => {
            const formattedDate = customFormatDate(text);
            return <span>{formattedDate}</span>;
        }
    }
];
