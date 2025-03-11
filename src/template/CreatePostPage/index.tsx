import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useRouter } from 'next/router';
import PostService from 'services/PostsService';
import ImagePicker from 'components/ImagePiker';
import { IPostRequest } from 'interfaces/Posts';
import * as S from './styles';

const StylesOpitions = ['noticia', 'carrousel', 'coluna'];

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
        initialValues?.style || StylesOpitions[0]
    );
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(
        initialValues?.image || null
    );

    const onFinish = async (values: IPostRequest) => {
        try {
            setLoading(true);
            const postData: IPostRequest = {
                ...values,
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ height: '100vh' }}>
            <h2>Posts Ativos</h2>
            <S.Container>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={initialValues}
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
                        {(selectedValue === StylesOpitions[0] ||
                            selectedValue === StylesOpitions[1]) && (
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
                                    <Input style={{ borderRadius: 50 }} />
                                </Form.Item>
                            </>
                        )}

                        {(selectedValue === StylesOpitions[0] ||
                            selectedValue === StylesOpitions[2]) && (
                            <ImagePicker onImageSelect={setSelectedImage} />
                        )}
                    </S.Wrapper>

                    <S.Wrapper>
                        <Form.Item>
                            <S.ButtonGroup>
                                {StylesOpitions.map((type) => (
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
                            <Input style={{ borderRadius: 50 }} />
                        </Form.Item>

                        <Typography.Title level={5}>Texto</Typography.Title>
                        <Form.Item
                            name="text"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira um texto'
                                }
                            ]}
                        >
                            <Input.TextArea
                                style={{ borderRadius: 16 }}
                                rows={10}
                            />
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
                                    width: 300
                                }}
                                loading={loading}
                            >
                                CONFIRMAR
                            </Button>
                        </Form.Item>
                    </S.Wrapper>
                </Form>
            </S.Container>
        </div>
    );
};

export default CreatePostPage;
