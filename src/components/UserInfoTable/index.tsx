import React from 'react';
import { Table } from 'antd';
import { User } from 'interfaces/Users';

interface UserInfoTableProps {
    user: User;
    userType: string;
}

const UserInfoTable: React.FC<UserInfoTableProps> = ({ user, userType }) => {
    // Dados base que são comuns a todos os tipos de usuário
    const baseUserInfo = [
        {
            key: 'name',
            label: 'Nome',
            value: user.name
        },
        {
            key: 'email',
            label: 'Email',
            value: user.email
        },
        {
            key: 'age',
            label: 'Idade',
            value: user.age
        },
        {
            key: 'typeUser',
            label: 'Tipo de Usuário',
            value: user.typeUser
        },
        {
            key: 'subscribePlan',
            label: 'Plano',
            value: user.subscribePlan || 'Nenhum'
        },
        {
            key: 'created_at',
            label: 'Data de Cadastro',
            value: new Date(user.created_at).toLocaleDateString()
        }
    ];

    // Dados adicionais para usuários que não são empresas
    const additionalUserInfo =
        userType === 'adm'
            ? [
                  {
                      key: 'address',
                      label: 'Endereço',
                      value: `${user.address.street}, ${user.address.numberHouse} - ${user.address.neighborhood}, ${user.address.city}/${user.address.state}`
                  },
                  {
                      key: 'cep',
                      label: 'CEP',
                      value: user.address.cep
                  }
              ]
            : [];

    // Combina os dados base com os adicionais (se aplicável)
    const userInfoDataSource = [...baseUserInfo, ...additionalUserInfo];

    return (
        <Table
            columns={[
                {
                    title: 'Campo',
                    dataIndex: 'label',
                    key: 'label',
                    width: '30%'
                },
                {
                    title: 'Valor',
                    dataIndex: 'value',
                    key: 'value'
                }
            ]}
            dataSource={userInfoDataSource}
            pagination={false}
            showHeader={false}
            bordered
        />
    );
};

export default UserInfoTable;
