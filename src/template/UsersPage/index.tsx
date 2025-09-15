/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import { useRouter } from 'next/router';
import { User } from 'interfaces/Users';
import UserService from 'services/UserService';
import CompanyService from 'services/CompanyService';
import useAuth from 'hooks/useAuth';
import { parseCookies } from 'nookies';
import { getColumns } from './index-helper';

import * as S from './styles';

const UsersPage = () => {
    const [usersList, setUsersList] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const { userType, user } = useAuth();

    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
                const response = await UserService.GetAll();
                setUsersList(response);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                message.error('Erro ao buscar usuários');
            } finally {
                setLoading(false);
            }
        };

        const getUsersByConpany = async (companyId: string) => {
            try {
                setLoading(true);
                const response = await CompanyService.GetUserByCompanyId(
                    companyId
                );
                setUsersList(response);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                message.error('Erro ao buscar usuários');
            } finally {
                setLoading(false);
            }
        };

        console.log(userType);

        if (userType === 'adm') {
            getUsers();
        } else if (userType === 'company') {
            const companyId = user?.id || parseCookies()['@app:userId'];
            getUsersByConpany(companyId);
        }
    }, [user?.id, userType]);

    const handleGoTo = (userId: string) => {
        router.push({
            pathname: 'ShowUsers',
            query: {
                userId
            }
        });
    };

    return (
        <>
            <S.HeaderContainer>
                <h2>Clientes</h2>
            </S.HeaderContainer>

            <Table
                style={{ color: 'white' }}
                columns={getColumns(handleGoTo)}
                dataSource={usersList}
                rowKey="id"
                loading={loading}
            />
        </>
    );
};

export default UsersPage;
