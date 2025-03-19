import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { Coupon } from 'interfaces/Coupons';
import { Company } from 'interfaces/Companies';
import CouponCard from 'components/CouponCard';
import CouponServices from 'services/CouponServices';
import CompanyService from 'services/CompanyService'; // Importando o serviço de empresas
import * as S from './styles';

const CouponsPage = () => {
    const router = useRouter();
    const [company, setCompany] = useState<Company | null>(null); // Estado para armazenar os dados da empresa
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

    // Obtém o companyId da query
    const { companyId } = router.query;

    // Carrega os dados da empresa e dos cupons quando a página é carregada
    useEffect(() => {
        if (companyId) {
            const fetchCompany = async () => {
                try {
                    setLoading(true);
                    const companyData = await CompanyService.GetAll();
                    const foundCompany = companyData.find(
                        (comp) => comp.id === companyId
                    );
                    setCompany(foundCompany || null); // Atualiza o estado com os dados da empresa
                } catch (error) {
                    console.error('Erro ao carregar empresa:', error);
                    message.error('Erro ao carregar dados da empresa.');
                } finally {
                    setLoading(false);
                }
            };
            fetchCompany();
        }
    }, [companyId]);

    // Função para navegar para a página de criação/edição de cupons
    const navigateToCouponCreate = (couponId?: string) => {
        const query: { companyId?: string; couponId?: string } = {};

        if (company) {
            query.companyId = company.id; // Passa o companyId da empresa carregada
        }
        if (couponId) {
            query.couponId = couponId; // Passa o couponId se estiver editando
        }

        router.push({
            pathname: 'CreateCoupon',
            query
        });
    };

    // Função para deletar um cupom
    const handleDelete = async (couponId: string) => {
        try {
            await CouponServices.delete(couponId);
            message.success('Cupom deletado com sucesso!');
            // Recarrega os dados da empresa após deletar o cupom
            if (companyId) {
                const companyData = await CompanyService.GetAll();
                const foundCompany = companyData.find(
                    (comp) => comp.id === companyId
                );
                setCompany(foundCompany || null); // Atualiza o estado com os dados da empresa
            }
        } catch (error) {
            console.error('Erro ao deletar cupom:', error);
            message.error('Falha ao deletar cupom. Tente novamente.');
        }
    };

    if (loading) {
        return <div>Carregando...</div>; // Exibe um loading enquanto os dados são carregados
    }

    if (!company) {
        return <div>Empresa não encontrada.</div>; // Exibe uma mensagem se a empresa não for encontrada
    }

    return (
        <S.PageContainer>
            <S.HeaderContainer>
                <h2>Cupons ativos: {company.name}</h2>
                <S.PlusIconWrapper>
                    <PlusOutlined onClick={() => navigateToCouponCreate()} />
                </S.PlusIconWrapper>
            </S.HeaderContainer>
            <S.CardsContainer>
                {company.coupons.map((coupon: Coupon) => (
                    <CouponCard
                        key={coupon.id}
                        coupon={coupon}
                        onEdit={() => navigateToCouponCreate(coupon.id)}
                        onDelete={() => handleDelete(coupon.id)}
                    />
                ))}
            </S.CardsContainer>
        </S.PageContainer>
    );
};

export default CouponsPage;
