import React from 'react';
import { Space, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Event } from 'interfaces/Events';

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
    handleEdit: (event: Event) => void,
    handleDelete: (eventId: string) => void
) => [
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record: Event) => (
            <a onClick={() => handleEdit(record)} key={record.id}>
                HortoClub
            </a>
        )
    },
    {
        title: 'Endereço',
        dataIndex: 'subscriptionPlan',
        key: 'subscriptionPlan',
        render: (text: string) => <span>Rua HortoClub 123</span>
    },
    {
        title: 'Tipo',
        dataIndex: 'eventType',
        key: 'eventType',
        render: (text: string) => <span>{text}</span>
    },
    {
        title: 'Data do evento',
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
