/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { User } from 'interfaces/Auth';
import UserService from 'services/UserService';
import { getColumns } from './index-helper';

interface UsersComponentProps {
    handleMenuClick: (key: string) => void;
    handleViewWithValues: (key: string, values: any) => void;
}

const UsersComponent: React.FC<UsersComponentProps> = ({
    handleMenuClick,
    handleViewWithValues
}) => {
    const [usersList, setUsersList] = useState<User[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await UserService.GetAll();
                setUsersList(response);
            } catch (error) {
                console.error('Failed to fetch modules:', error);
            }
        };

        getUsers();
    }, []);

    const handleGoTo = (user: User) => {
        handleViewWithValues('ShowUsers', user);
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
                columns={getColumns(handleGoTo)}
                dataSource={usersList}
                rowKey="id"
            />
        </>
    );
};

export default UsersComponent;
