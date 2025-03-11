/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { useRouter } from 'next/router';
import { User } from 'interfaces/Auth';
import UserService from 'services/UserService';
import { getColumns } from './index-helper';

interface InitialValuesProps {
    UserType: string;
    CompanyId?: string;
}

const UsersPage = () => {
    const [usersList, setUsersList] = useState<User[]>([]);
    const router = useRouter();

    // Obtém os valores iniciais da rota (query parameters)
    const initialValues = router.query.initialValues
        ? (JSON.parse(
              router.query.initialValues as string
          ) as InitialValuesProps)
        : { UserType: 'default' }; // Valor padrão caso não haja initialValues

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await UserService.GetAll();
                setUsersList(response);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        getUsers();
    }, []);

    const handleGoTo = (user: User) => {
        // Navega para a página de detalhes do usuário com os valores do usuário
        router.push({
            pathname: 'ShowUsers',
            query: {
                initialValues: JSON.stringify({
                    User: user,
                    UserType: initialValues.UserType
                })
            }
        });
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                    marginTop: 8,
                    marginRight: 16
                }}
            >
                <h2>Clientes</h2>
            </div>
            <Table
                style={{ color: 'white' }}
                columns={getColumns(handleGoTo, initialValues.UserType)}
                dataSource={usersList}
                rowKey="id"
            />
        </>
    );
};

export default UsersPage;
