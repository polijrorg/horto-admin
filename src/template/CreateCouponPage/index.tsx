import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Input, DatePicker, Select, message, Switch } from 'antd';
import { Coupon, ICouponRequest } from 'interfaces/Coupons';
import CouponServices from 'services/CouponServices';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import * as S from './styles';

dayjs.extend(localizedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);

const { Option } = Select;

const CreateCoupon = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState<Coupon | null>(null);

    // Obtém os parâmetros da query
    const { companyId, couponId } = router.query;

    // Carrega os dados iniciais se couponId estiver presente
    useEffect(() => {
        if (couponId) {
            const fetchCoupon = async () => {
                try {
                    setLoading(true);
                    const coupon = await CouponServices.getCouponById(
                        couponId as string
                    );

                    // Convertendo a data para dayjs
                    const formattedCoupon = {
                        ...coupon,
                        expirationDate: coupon.expirationDate
                            ? dayjs(coupon.expirationDate)
                            : null
                    };

                    setInitialValues(coupon);
                    form.setFieldsValue(formattedCoupon);
                } catch (error) {
                    message.error('Erro ao carregar cupom.');
                } finally {
                    setLoading(false);
                }
            };
            fetchCoupon();
        }
    }, [couponId, form]);

    // Função para lidar com a submissão do formulário
    const handleSubmit = async (values: ICouponRequest) => {
        try {
            setLoading(true);

            if (couponId) {
                // Atualiza o cupom existente
                await CouponServices.update({
                    data: values,
                    couponId: couponId as string
                });
                message.success('Cupom atualizado com sucesso!');
            } else if (companyId) {
                // Cria um novo cupom
                await CouponServices.create({
                    ...values,
                    companyId: companyId as string
                });
                message.success('Cupom criado com sucesso!');
            }

            // Redireciona para a página de cupons após a criação/edição
            router.push('/Companies');
        } catch (error) {
            message.error('Erro ao salvar cupom.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <S.PageContainer>
            <h1>{couponId ? 'Editar Cupom' : 'Criar Cupom'}</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={initialValues || undefined}
            >
                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira o nome do cupom!'
                        }
                    ]}
                >
                    <Input placeholder="Nome do cupom" />
                </Form.Item>

                <Form.Item
                    label="Tipo de Cupom"
                    name="couponType"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, selecione o tipo de cupom!'
                        }
                    ]}
                >
                    <Select placeholder="Selecione o tipo">
                        <Option value="BASIC">BASIC</Option>
                        <Option value="PREMIUM">PREMIUM</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Data de Expiração"
                    name="expirationDate"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, selecione a data de expiração!'
                        }
                    ]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Recompensa"
                    name="reward"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira a recompensa!'
                        }
                    ]}
                >
                    <Input placeholder="Recompensa" />
                </Form.Item>

                <Form.Item
                    label="Pagamento"
                    name="payment"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira o pagamento!'
                        }
                    ]}
                >
                    <Input placeholder="Pagamento" />
                </Form.Item>

                <Form.Item
                    label="Regras"
                    name="rules"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira as regras!'
                        }
                    ]}
                >
                    <Input.TextArea placeholder="Regras" />
                </Form.Item>

                <Form.Item
                    label="Ativo"
                    name="active"
                    valuePropName="checked"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, defina o status do cupom!'
                        }
                    ]}
                >
                    <Switch
                        checkedChildren="Ativo"
                        unCheckedChildren="Inativo"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {couponId ? 'Atualizar Cupom' : 'Criar Cupom'}
                    </Button>
                </Form.Item>
            </Form>
        </S.PageContainer>
    );
};

export default CreateCoupon;
