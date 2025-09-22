import React, { useEffect, useState } from 'react';
import { message, Input, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PlanService from 'services/PlansService';
import { IPlan, IPlanRequest } from 'interfaces/Plans';
import PlansCard from 'components/PlansCard';
import PlanModal from 'components/Modals/PlansModal';
import SubscriptionScopeFilter, {
    SubscriptionScope
} from 'components/SubscriptionScopeFilter';
import * as S from './styles';

const PlansManager = () => {
    const [plans, setPlans] = useState<IPlan[]>([]);
    const [filteredPlans, setFilteredPlans] = useState<IPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<IPlan | undefined>(
        undefined
    );
    const [subscriptionScope, setSubscriptionScope] = useState<
        SubscriptionScope | 'all'
    >('all');

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const result = await PlanService.GetAll();
            setPlans(result);
            setFilteredPlans(result);
        } catch (error) {
            console.error('Erro ao carregar planos:', error);
            message.error('Erro ao carregar planos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleSearch = (value: string, scope?: SubscriptionScope | 'all') => {
        setSearchTerm(value);
        const filtered = plans.filter((plan) => {
            const matchesName = plan.name
                .toLowerCase()
                .includes(value.toLowerCase());
            const matchesScope =
                (scope ?? subscriptionScope) === 'all' ||
                plan.subscriptionScope === (scope ?? subscriptionScope);
            return matchesName && matchesScope;
        });
        setFilteredPlans(filtered);
    };

    const handleScopeChange = (scope: SubscriptionScope | 'all') => {
        setSubscriptionScope(scope);
        handleSearch(searchTerm, scope);
    };

    useEffect(() => {
        handleSearch(searchTerm, subscriptionScope);
    }, [plans, subscriptionScope, searchTerm]);

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Tem certeza que deseja deletar este plano?',
            okText: 'Sim, deletar',
            cancelText: 'Cancelar',
            okType: 'danger',
            onOk: async () => {
                try {
                    await PlanService.DeletePlan(id);
                    message.success('Plano deletado com sucesso!');
                    fetchPlans();
                } catch (error) {
                    console.error('Erro ao deletar plano:', error);
                    message.error('Erro ao deletar plano.');
                }
            }
        });
    };

    const handleEdit = (id: string) => {
        const planToEdit = plans.find((p) => p.id === id);
        if (planToEdit) {
            setSelectedPlan(planToEdit);
            setIsModalVisible(true);
        }
    };

    const handleCreate = () => {
        setSelectedPlan(undefined); // modo criação
        setIsModalVisible(true);
    };

    const handleSave = async (data: IPlanRequest) => {
        try {
            await PlanService.CreatePlan(data);
            message.success('Plano criado com sucesso!');
            fetchPlans();
        } catch (error) {
            console.error('Erro ao criar plano:', error);
            message.error('Erro ao criar plano.');
        }
    };

    const handleUpdate = async (id: string, data: IPlanRequest) => {
        try {
            await PlanService.UpdatePlan(id, data);
            message.success('Plano atualizado com sucesso!');
            fetchPlans();
        } catch (error) {
            console.error('Erro ao atualizar plano:', error);
            message.error('Erro ao atualizar plano.');
        }
    };

    return (
        <S.PageContainer>
            <S.HeaderContainer>
                <h2>Planos Cadastrados</h2>
                <S.PlusIconWrapper>
                    <PlusOutlined onClick={handleCreate} />
                </S.PlusIconWrapper>
            </S.HeaderContainer>

            <SubscriptionScopeFilter
                value={subscriptionScope}
                onChange={handleScopeChange}
            />

            <S.SearchWrapper>
                <Input.Search
                    placeholder="Buscar por nome do plano"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    enterButton
                    allowClear
                />
            </S.SearchWrapper>

            <S.CardsContainer>
                {filteredPlans.map((plan) => (
                    <PlansCard
                        key={plan.id}
                        plan={plan}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </S.CardsContainer>

            {loading && <div>Carregando planos...</div>}

            <PlanModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
                onUpdate={handleUpdate}
                plan={selectedPlan}
            />
        </S.PageContainer>
    );
};

export default PlansManager;
