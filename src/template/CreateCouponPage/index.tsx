/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
    Form,
    Input,
    Button,
    Typography,
    Select,
    DatePicker,
    Checkbox
} from 'antd';
import { useRouter } from 'next/router';
import CouponServices from 'services/CouponServices';
import { Coupon, ICouponRequest } from 'interfaces/Coupons';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import * as S from './styles';

dayjs.extend(localizedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);

const { Option } = Select;

const CreateCouponPage = () => {
    const [form] = Form.useForm();
    const router = useRouter();

    // Obtém os valores iniciais da rota (query parameters)
    const initialValues = router.query.initialValues
        ? (JSON.parse(router.query.initialValues as string) as Coupon)
        : undefined;

    const onFinish = async (values: any) => {
        const formattedValues: ICouponRequest = {
            ...values,
            expirationDate: values.expirationDate.toISOString(),
            active: values.active ?? true
        };

        try {
            if (initialValues && typeof initialValues === 'object') {
                await CouponServices.update(formattedValues);
            } else {
                await CouponServices.create(formattedValues);
            }
            router.push('Coupons'); // Navega para a página de Cupons após a criação/atualização
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ height: '100%' }}>
            <h2>Adicionar Cupom</h2>
            <S.Container>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        ...(initialValues || {}),
                        expirationDate: initialValues?.expirationDate
                            ? dayjs(initialValues.expirationDate) // Converte a data corretamente
                            : undefined,
                        active: initialValues?.active ?? true
                    }}
                    style={{
                        backgroundColor: '#fcfcfc',
                        padding: '24px 0px',
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'start'
                    }}
                >
                    <S.Wrapper>
                        <Typography.Title
                            style={{ color: '#CC8D3E', fontSize: 18 }}
                            level={5}
                        >
                            Nome do Cupom:
                        </Typography.Title>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira o nome do cupom'
                                }
                            ]}
                        >
                            <Input
                                style={{
                                    borderRadius: 50,
                                    background: '#F8F9FA'
                                }}
                            />
                        </Form.Item>

                        <Typography.Title
                            style={{ color: '#CC8D3E', fontSize: 18 }}
                            level={5}
                        >
                            Tipo do Cupom:
                        </Typography.Title>
                        <Form.Item
                            name="couponType"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Por favor, selecione o tipo do cupom'
                                }
                            ]}
                        >
                            <Select
                                style={{
                                    borderRadius: 50,
                                    background: '#F8F9FA'
                                }}
                            >
                                <Option value="BASIC">BASIC</Option>
                                <Option value="PREMIUM">PREMIUM</Option>
                            </Select>
                        </Form.Item>

                        <Typography.Title
                            style={{ color: '#CC8D3E', fontSize: 18 }}
                            level={5}
                        >
                            Validade do Cupom:
                        </Typography.Title>
                        <Form.Item
                            name="expirationDate"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Por favor, insira a data de validade do cupom'
                                }
                            ]}
                        >
                            <DatePicker
                                style={{
                                    width: '100%',
                                    borderRadius: 50,
                                    background: '#F8F9FA'
                                }}
                            />
                        </Form.Item>

                        <Typography.Title
                            style={{ color: '#CC8D3E', fontSize: 18 }}
                            level={5}
                        >
                            Recompensa do Cupom:
                        </Typography.Title>
                        <Form.Item
                            name="reward"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Por favor, insira a recompensa do cupom'
                                }
                            ]}
                        >
                            <Input
                                style={{
                                    borderRadius: 50,
                                    background: '#F8F9FA'
                                }}
                            />
                        </Form.Item>

                        <Typography.Title
                            style={{ color: '#CC8D3E', fontSize: 18 }}
                            level={5}
                        >
                            Pagamento:
                        </Typography.Title>
                        <Form.Item
                            name="payment"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Por favor, insira o valor do pagamento'
                                }
                            ]}
                        >
                            <Input
                                style={{
                                    borderRadius: 50,
                                    background: '#F8F9FA'
                                }}
                            />
                        </Form.Item>

                        <Typography.Title
                            style={{ color: '#CC8D3E', fontSize: 18 }}
                            level={5}
                        >
                            Regras para Resgate:
                        </Typography.Title>
                        <Form.Item
                            name="rules"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Por favor, insira as regras para resgate do cupom'
                                }
                            ]}
                        >
                            <Input.TextArea
                                style={{
                                    borderRadius: 20,
                                    background: '#F8F9FA'
                                }}
                                rows={4}
                            />
                        </Form.Item>

                        <Form.Item name="active" valuePropName="checked">
                            <Checkbox defaultChecked>Ativo</Checkbox>
                        </Form.Item>
                    </S.Wrapper>

                    <S.ContentButtons>
                        <Button
                            onClick={() => router.push('/Companies')}
                            style={{
                                color: '#000',
                                backgroundColor: '#F8F9FA',
                                fontWeight: 'bold',
                                fontSize: 18,
                                height: 48,
                                padding: '8px 24px'
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{
                                color: '#000',
                                backgroundColor: '#CC8D3E',
                                fontWeight: 'bold',
                                fontSize: 18,
                                height: 48,
                                padding: '8px 24px'
                            }}
                        >
                            Adicionar
                        </Button>
                    </S.ContentButtons>
                </Form>
            </S.Container>
        </div>
    );
};

export default CreateCouponPage;
