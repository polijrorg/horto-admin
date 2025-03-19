/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Form, Input, Button, Typography, Flex } from 'antd';
import { useRouter } from 'next/router';
import PostService from 'services/PostsService';
import ImagePicker from 'components/ImagePiker';
import * as S from './styles';

interface InitialValuesProps {
    id: string;
    style: string;
    image: File;
    title: string;
    text: string;
    link: string;
}

const CreateCompanyPage = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<File | null>(null); // Estado para armazenar a imagem selecionada

    // Obtém os valores iniciais da rota (query parameters)
    const initialValues = router.query.initialValues
        ? (JSON.parse(
              router.query.initialValues as string
          ) as InitialValuesProps)
        : undefined;

    const selectedValue =
        initialValues?.style !== undefined ? initialValues?.style : 'news';

    const onFinish = async (values: any) => {
        if (initialValues !== undefined) {
            try {
                await PostService.updatePost(initialValues.id, {
                    title: values.title,
                    text: values.text,
                    link: values.link,
                    image: selectedImage,
                    style: selectedValue
                });
                router.push('Posts'); // Navega para a página de posts após a atualização
            } catch (error) {
                console.log('error');
            }
        } else {
            try {
                const response = await PostService.CreatePost({
                    title: values.title,
                    text: values.text,
                    link: values.link,
                    image: values.image,
                    style: selectedValue
                });
                console.log(response);
                router.push('Posts'); // Navega para a página de posts após a criação
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleImageSelect = (file: File) => {
        setSelectedImage(file); // Armazena o arquivo de imagem selecionado
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
                                    message: 'Por favor, insira um título'
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
                                    message: 'Por favor, insira um texto'
                                }
                            ]}
                            initialValue={initialValues?.text}
                        >
                            <Input style={{ borderRadius: 50 }} />
                        </Form.Item>
                        <ImagePicker onImageSelect={handleImageSelect} />{' '}
                        <Typography.Title level={5}>Plano</Typography.Title>
                        <Form.Item
                            name="subscriptionPlan"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira um link'
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
                                        message: 'Por favor, insira um texto'
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
                                        message: 'Por favor, insira um texto'
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
                                        message: 'Por favor, insira um texto'
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
                                        message: 'Por favor, insira um texto'
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
                                        message: 'Por favor, insira um texto'
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
                                        message: 'Por favor, insira um texto'
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
                                        message: 'Por favor, insira um texto'
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

export default CreateCompanyPage;
