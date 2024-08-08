import React from 'react';
import { Space, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Posts } from 'interfaces/Posts';

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
    handleEdit: (post: Posts) => void,
    handleDelete: (postId: string) => void
) => [
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record: Posts) => (
            <a onClick={() => handleEdit(record)} key={record.id}>
                {text}
            </a>
        )
    },
    {
        title: 'Título',
        dataIndex: 'title',
        key: 'title',
        render: (text: string) => <span>{text}</span>
    },
    {
        title: 'Texto',
        dataIndex: 'text',
        key: 'text',
        render: (text: string) => <span>{text}</span>
    },
    {
        title: 'Imagem',
        dataIndex: 'image',
        key: 'image',
        render: (text: number) => <span>{text}</span>
    },
    {
        title: 'Data',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text: string) => {
            const formattedDate = customFormatDate(text);
            return <span>{formattedDate}</span>;
        }
    },
    {
        title: 'Ação',
        key: 'action',
        render: (record: Posts) => (
            <Space size="middle">
                <EditOutlined
                    style={{
                        color: '#CC8D3E',
                        fontSize: '16px'
                    }}
                    onClick={() => handleEdit(record)}
                />
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
