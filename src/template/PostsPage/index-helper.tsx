/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Space, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { customFormatDate } from 'utils/dateUtil';
import { Posts } from 'interfaces/Posts';

export const getColumns = (
    handleEdit: (post: Posts) => void,
    handleDelete: (postId: string) => void
) => [
    {
        title: 'Detalhes',
        dataIndex: 'id',
        key: 'id',
        render: (_text: string, record: Posts) => (
            <a onClick={() => handleEdit(record)} key={record.id}>
                Ver detalhes
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
        title: 'Estilo',
        dataIndex: 'style',
        key: 'style',
        render: (text: string) => <span>{text}</span>
    },
    {
        title: 'Imagem',
        dataIndex: 'linkImage',
        key: 'image',
        render: (text: string) =>
            text === 'Post sem imagem' ? (
                <span>Post sem imagem</span>
            ) : (
                <a href={text} target="_blank" rel="noopener noreferrer">
                    link
                </a>
            )
    },
    {
        title: 'Data de criação',
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
                    title="Tem certeza que deseja excluir este Post?"
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
