import React, { useState } from 'react';
import { Form, Input, Button, Typography, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import PostService from 'services/PostsService';
import { IPostRequest } from 'interfaces/Posts';
import * as S from './styles';

const { TextArea } = Input;

const StylesOptions = ['noticia', 'carrousel', 'coluna'];

const CreatePostPage = () => {
    const [form] = Form.useForm();
    const router = useRouter();

    // Obtém os valores iniciais da rota (query parameters)
    const initialValues = router.query.initialValues
        ? (JSON.parse(
              router.query.initialValues as string
          ) as Partial<IPostRequest>)
        : undefined;

    const [selectedValue, setSelectedValue] = useState(
        initialValues?.style || StylesOptions[0]
    );
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const onFinish = async (values: IPostRequest) => {
        try {
            setLoading(true);
            const postData: IPostRequest = {
                ...values,
                text: values.text || '',
                image: selectedImage,
                style: selectedValue
            };

            if (initialValues?.id) {
                await PostService.updatePost(initialValues.id, postData);
            } else {
                await PostService.CreatePost(postData);
            }

            router.push('Posts'); // Navega para a página de posts após a criação/atualização
        } catch (error) {
            console.error('Erro ao salvar o post:', error);
            message.error('Erro ao salvar o post');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (file: File) => {
        setSelectedImage(file);
        return false; // Impede o upload automático
    };

    return (
        <S.Container>
            <S.FormContainer>
                <S.Title>
                    {initialValues ? 'Editar Post' : 'Criar Novo Post'}
                </S.Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={initialValues}
                >
                    <S.Wrapper>
                        <Form.Item>
                            <S.ButtonGroup>
                                {StylesOptions.map((type) => (
                                    <S.RadioButton
                                        key={type}
                                        type="button"
                                        selected={selectedValue === type}
                                        onClick={() => setSelectedValue(type)}
                                    >
                                        {type.toUpperCase()}
                                    </S.RadioButton>
                                ))}
                            </S.ButtonGroup>
                        </Form.Item>
                        <Typography.Title level={5}>Título</Typography.Title>
                        <Form.Item
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira um título'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        {selectedValue === 'coluna' && (
                            <>
                                <Typography.Title level={5}>
                                    Texto
                                </Typography.Title>
                                <Form.Item
                                    name="text"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Por favor, insira um texto'
                                        }
                                    ]}
                                >
                                    <TextArea rows={5} />
                                </Form.Item>
                            </>
                        )}
                        {(selectedValue === 'noticia' ||
                            selectedValue === 'carrousel') && (
                            <>
                                <Typography.Title level={5}>
                                    Link
                                </Typography.Title>
                                <Form.Item
                                    name="link"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Por favor, insira um link'
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </>
                        )}
                        {(selectedValue === 'noticia' ||
                            selectedValue === 'coluna') && (
                            <>
                                <Typography.Title level={5}>
                                    Imagem
                                </Typography.Title>
                                <Form.Item>
                                    <Upload
                                        beforeUpload={handleImageChange}
                                        onRemove={() => setSelectedImage(null)}
                                        maxCount={1}
                                    >
                                        <Button icon={<UploadOutlined />}>
                                            Selecionar Imagem
                                        </Button>
                                    </Upload>
                                </Form.Item>
                            </>
                        )}
                        <Form.Item>
                            <S.ConfirmButton
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{
                                    backgroundColor: '#cc8d3e',
                                    borderColor: '#cc8d3e'
                                }}
                            >
                                CONFIRMAR
                            </S.ConfirmButton>
                        </Form.Item>
                    </S.Wrapper>
                </Form>
            </S.FormContainer>
        </S.Container>
    );
};

export default CreatePostPage;
