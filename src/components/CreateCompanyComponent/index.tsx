import React from 'react';
import { Form, Input, Button, Upload, Radio, Typography, Flex } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CompanyService from 'services/CompanyService';
import * as S from './styles';

interface InitialValuesProps {
    id: string;
    style: string;
    image: string;
    title: string;
    text: string;
    link: string;
}

interface PostComponentProps {
    handleMenuClick: (key: string) => void;
    initialValues?: InitialValuesProps;
}

const CreateCompanyComponent: React.FC<PostComponentProps> = ({
    handleMenuClick,
    initialValues
}) => {
    const [form] = Form.useForm();
    const [selectedValue, setSelectedValue] = React.useState(
        initialValues?.style !== undefined ? initialValues?.style : 'news'
    );
    const [loading, setLoading] = React.useState(false);

    const handleClick = (value: string) => {
        setSelectedValue(value);
    };

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const todayDate = new Date();
        if (initialValues !== undefined) {
            try {
                // const response = await CompanyService.updatePost(
                //     initialValues.id,
                //     {
                //         title: values.title,
                //         text: values.text,
                //         link: values.link,
                //         image: 'www.linkteste.com',
                //         style: selectedValue
                //     }
                // );
                // console.log(response);
                // handleMenuClick('Posts');
            } catch (error) {
                console.log('error');
            }
        } else {
            try {
                const response = await CompanyService.CreateCompany({
                    name: values.name,
                    email: values.email,
                    image: 'www.linkteste.com',
                    subscriptionPlan: values.subscriptionPlan,
                    branch: values.branch,
                    planExpirationDate: todayDate.toISOString(),
                    address: {
                        street: values.street,
                        numberHouse: parseInt(values.numberHouse),
                        neighborhood: values.neighborhood,
                        city: values.city,
                        state: values.state,
                        cep: values.cep
                    }
                });
                console.log(response);
                handleMenuClick('Companies');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div style={{ height: '100%' }}>
            <h2>Empresas</h2>
            <S.Container>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{
                        backgroundColor: '#fcfcfc',
                        padding: 56,
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <S.Wrapper>
                        <Typography.Title level={5}>
                            Nome da Empresa
                        </Typography.Title>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira o nome da empresa'
                                }
                            ]}
                            initialValue={initialValues?.title}
                            style={{ marginBottom: 8 }}
                        >
                            <Input style={{ borderRadius: 50 }} />
                        </Form.Item>
                        <Typography.Title level={5}>
                            E-mail
                        </Typography.Title>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira um email'
                                }
                            ]}
                            initialValue={initialValues?.title}
                            style={{ marginBottom: 8 }}
                        >
                            <Input style={{ borderRadius: 50 }} />
                        </Form.Item>
                        <Typography.Title level={5}>
                            Ramo de Atuação
                        </Typography.Title>
                        <Form.Item
                            name="branch"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira o ramo de atuação'
                                }
                            ]}
                            initialValue={initialValues?.text}
                        >
                            <Input style={{ borderRadius: 50 }} />
                        </Form.Item>
                        <S.ContentImg style={{ marginBottom: 16 }}>
                            <S.BannerImg src="assets/images/photo-camera.png" />
                        </S.ContentImg>
                        <Typography.Title level={5}>Plano</Typography.Title>
                        <Form.Item
                            name="subscriptionPlan"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira o plano'
                                }
                            ]}
                            initialValue={initialValues?.link}
                        >
                            <Input style={{ borderRadius: 50 }} />
                        </Form.Item>
                    </S.Wrapper>
                    <S.Wrapper style={{ alignItems: 'center' }}>
                        <Flex vertical style={{ width: '100%' }}>
                            <Typography.Title level={5}>Rua</Typography.Title>
                            <Form.Item
                                name="street"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor, insira a rua'
                                    }
                                ]}
                                initialValue={initialValues?.text}
                                style={{ marginBottom: 8 }}
                            >
                                <Input
                                    style={{
                                        borderRadius: 50
                                    }}
                                />
                            </Form.Item>
                            <Typography.Title level={5}>
                                Número
                            </Typography.Title>
                            <Form.Item
                                name="numberHouse"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor, insira o número'
                                    }
                                ]}
                                initialValue={initialValues?.text}
                                style={{ marginBottom: 8 }}
                            >
                                <Input
                                    style={{
                                        borderRadius: 50
                                    }}
                                />
                            </Form.Item>
                            <Typography.Title level={5}>
                                Bairro
                            </Typography.Title>
                            <Form.Item
                                name="neighborhood"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor, insira o bairro'
                                    }
                                ]}
                                initialValue={initialValues?.text}
                                style={{ marginBottom: 8 }}
                            >
                                <Input style={{ borderRadius: 50 }} />
                            </Form.Item>
                            <Typography.Title level={5}>
                                Cidade
                            </Typography.Title>
                            <Form.Item
                                name="city"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor, insira a cidade'
                                    }
                                ]}
                                initialValue={initialValues?.text}
                                style={{ marginBottom: 8 }}
                            >
                                <Input style={{ borderRadius: 50 }} />
                            </Form.Item>
                            <Typography.Title level={5}>
                                Estado
                            </Typography.Title>
                            <Form.Item
                                name="state"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor, insira o estado'
                                    }
                                ]}
                                initialValue={initialValues?.text}
                                style={{ marginBottom: 8 }}
                            >
                                <Input style={{ borderRadius: 50 }} />
                            </Form.Item>
                            <Typography.Title level={5}>CEP</Typography.Title>
                            <Form.Item
                                name="cep"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor, insira o CEP'
                                    }
                                ]}
                                initialValue={initialValues?.text}
                                style={{ marginBottom: 8 }}
                            >
                                <Input style={{ borderRadius: 50 }} />
                            </Form.Item>
                            <Typography.Title level={5}>
                                Validade do Plano
                            </Typography.Title>
                            <Form.Item
                                name="text"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor, insira o plano'
                                    }
                                ]}
                                initialValue={initialValues?.text}
                                style={{ marginBottom: 24 }}
                            >
                                <Input style={{ borderRadius: 50 }} />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    style={{
                                        borderRadius: 50,
                                        backgroundColor: '#CC8D3E',
                                        borderColor: '#CC8D3E',
                                        fontWeight: 'bold',
                                        width: '100%'
                                    }}
                                    loading={loading}
                                >
                                    CONFIRMAR
                                </Button>
                            </Form.Item>
                        </Flex>
                    </S.Wrapper>
                </Form>
            </S.Container>
        </div>
    );
};

export default CreateCompanyComponent;
