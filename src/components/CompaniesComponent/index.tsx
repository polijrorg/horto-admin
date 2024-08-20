import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Company } from 'interfaces/Companies';
import CompanyService from 'services/CompanyService';
import { getColumns } from './index-helper';

interface CompanyComponentProps {
    handleMenuClick: (key: string) => void;
}

const CompaniesComponent: React.FC<CompanyComponentProps> = ({
    handleMenuClick
}) => {
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(
        null
    );
    const [errorMsg, setErrorMsg] = useState(false);
    const [companiesList, setCompaniesList] = useState<Company[]>([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
        null
    );

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await CompanyService.GetAll();
                setCompaniesList(response);
            } catch (error) {
                console.error('Failed to fetch modules:', error);
            }
        };

        getPosts();
    }, []);

    const handleEdit = (company: Company) => {
        // setSelectedPost(post);
        // handleViewWithValues('PostCreate', {
        //     id: post.id,
        //     style: post.style,
        //     image: post.image,
        //     title: post.title,
        //     text: post.text,
        //     link: post.link
        // });
    };

    const handleDelete = async (id: string) => {
        try {
            await CompanyService.deleteCompany(id);
            const updatedCompanies = await CompanyService.GetAll();
            setCompaniesList(updatedCompanies);
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
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
                <h2>Empresas</h2>
                <PlusOutlined
                    style={{
                        fontSize: '32px',
                        color: '#CC8D3E'
                    }}
                    onClick={() => handleMenuClick('CompanyCreate')}
                />
            </div>
            <Table
                style={{ color: 'white' }}
                columns={getColumns(handleEdit, handleDelete)}
                dataSource={companiesList}
                rowKey="id"
            />
        </>
    );
};

export default CompaniesComponent;
