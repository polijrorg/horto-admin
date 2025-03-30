/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Company } from 'interfaces/Companies';
import CompanyService from 'services/CompanyService';
import { getColumns } from './index-helper';

const CompaniesPage = () => {
    const [companiesList, setCompaniesList] = useState<Company[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const getCompanies = async () => {
            try {
                setLoading(true);
                const response = await CompanyService.GetAll();
                setCompaniesList(response);
            } catch (error) {
                console.error('Failed to fetch companies:', error);
                message.error('Erro ao buscar empresas');
            } finally {
                setLoading(false);
            }
        };

        getCompanies();
    }, []);

    const handleShowCoupons = (company: Company) => {
        router.push({
            pathname: 'Coupons',
            query: { companyId: company.id }
        });
    };

    const handleEdit = (company: Company) => {
        router.push({
            pathname: 'EditCompany',
            query: { companyId: company.id }
        });
    };

    const handleDelete = async (id: string) => {
        try {
            setLoading(true);
            await CompanyService.deleteCompany(id);
            const updatedCompanies = await CompanyService.GetAll();
            setCompaniesList(updatedCompanies);
        } catch (error) {
            console.error('Failed to delete company:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCompany = () => {
        router.push('CreateCompany');
    };

    return (
        <div>
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
                <h2>Empresas</h2>
                <PlusOutlined
                    style={{
                        fontSize: '32px',
                        color: '#CC8D3E'
                    }}
                    onClick={handleCreateCompany}
                />
            </div>
            <Table
                style={{ color: 'white' }}
                columns={getColumns(
                    handleEdit,
                    handleDelete,
                    handleShowCoupons
                )}
                dataSource={companiesList}
                rowKey="id"
                loading={loading}
            />
        </div>
    );
};

export default CompaniesPage;
