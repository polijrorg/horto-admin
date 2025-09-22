import React from 'react';

export type SubscriptionScope = 'enterprise' | 'individual';

interface Props {
    value: SubscriptionScope | 'all';
    onChange: (value: SubscriptionScope | 'all') => void;
}

const SubscriptionScopeFilter: React.FC<Props> = ({ value, onChange }) => {
    return (
        <div style={{ marginBottom: 16 }}>
            <label htmlFor="subscriptionScope">
                Filtrar por tipo de assinatura:{' '}
            </label>
            <select
                id="subscriptionScope"
                value={value}
                onChange={(e) =>
                    onChange(e.target.value as SubscriptionScope | 'all')
                }
            >
                <option value="all">Todos</option>
                <option value="individual">Individual</option>
                <option value="enterprise">Empresa</option>
            </select>
        </div>
    );
};

export default SubscriptionScopeFilter;
