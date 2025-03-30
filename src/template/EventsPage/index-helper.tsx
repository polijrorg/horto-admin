/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Event } from 'interfaces/Events';
import { customFormatDateTime } from 'utils/dateUtil';

export const getColumns = (
    handleEdit: (event: Event) => void,
    handleDelete: (eventId: string) => void
) => [
    {
        title: 'Detalhes',
        dataIndex: 'id',
        key: 'id',
        render: (_text: string, record: Event) => (
            <a onClick={() => handleEdit(record)} key={record.id}>
                Ver detalhes
            </a>
        )
    },
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        render: (text: string) => <span>{text}</span>
    },
    {
        title: 'Tipo',
        dataIndex: 'eventType',
        key: 'eventType',
        render: (text: string) => <span>{text}</span>
    },
    {
        title: 'Data de inicio',
        dataIndex: 'eventStartDate',
        key: 'eventStartDate',
        render: (text: string) => {
            const formattedDate = customFormatDateTime(text);
            return <span>{formattedDate}</span>;
        }
    },
    {
        title: 'Data de termino',
        dataIndex: 'eventEndDate',
        key: 'eventEndDate',
        render: (text: string) => {
            const formattedDate = customFormatDateTime(text);
            return <span>{formattedDate}</span>;
        }
    },
    {
        title: 'Ação',
        key: 'action',
        render: (record: Event) => (
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
