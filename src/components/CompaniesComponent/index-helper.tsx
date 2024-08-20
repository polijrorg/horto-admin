import React from 'react';
import { Space, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Company } from 'interfaces/Companies';

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
    handleEdit: (company: Company) => void,
    handleDelete: (companyId: string) => void
) => [
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record: Company) => (
            <a onClick={() => handleEdit(record)} key={record.id}>
                HortoClub
            </a>
        )
    },
    {
        title: 'Plano',
        dataIndex: 'subscriptionPlan',
        key: 'subscriptionPlan',
        render: (text: string) => <span>{text}</span>
    },
    {
        title: 'Preferência',
        dataIndex: 'branch',
        key: 'branch',
        render: (text: string) => <span>{text}</span>
    },
    {
        title: 'Validade do Plano',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text: string) => {
            // const formattedDate = customFormatDate(text);
            // return <span>{formattedDate}</span>;
            return <span>01/01/2024</span>;
        }
    },
    {
        title: 'Ação',
        key: 'action',
        render: (record: Company) => (
            <Space size="middle">
                <Popconfirm
                    title="Tem certeza que deseja excluir este usuário?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Sim"
                    cancelText="Cancelar"
                >
                    <DeleteOutlined
                        style={{ color: '#CC8D3E', fontSize: '16px' }}
                    />
                </Popconfirm>
            </Space>
        )
    }
];
