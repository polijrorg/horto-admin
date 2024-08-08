import React from 'react';
import { Form, Input, Button, Upload, Radio, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as S from './styles';
import PostService from 'services/PostsService';

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

const App: React.FC<PostComponentProps> = ({handleMenuClick, initialValues}) => {
  const [form] = Form.useForm();
  const [selectedValue, setSelectedValue] = React.useState(initialValues?.style !== undefined ? initialValues?.style : 'news');
  const [loading, setLoading] = React.useState(false);

  const handleClick = (value: string) => {
    setSelectedValue(value);
  };

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    if (initialValues !== undefined) {
        try {
            const response = await PostService.updatePost(initialValues.id, {
                title: values.title,
                text: values.text,
                link: values.link,
                image: 'www.linkteste.com',
                style: selectedValue
            })
            console.log(response);
            handleMenuClick('Posts')
        } catch (error) {
            console.log('error')
        }
    } else {
        try {
            const response = await PostService.CreatePost({
                title: values.title,
                text: values.text,
                link: values.link,
                image: 'www.linkteste.com',
                style: selectedValue
            })
            console.log(response);
            handleMenuClick('Posts')
        } catch (error) {
            console.log(error);
        }
    }
  };

  return (
    <>
        <h2>Posts Ativos</h2>
        <S.Container>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{backgroundColor: '#fcfcfc', padding: 56, height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            >
                <S.Wrapper>
                    <Typography.Title level={5}>Título</Typography.Title>
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Por favor, insira um título' }]}
                        initialValue={initialValues?.title}
                    >
                        <Input style={{borderRadius: 50}}/>
                    </Form.Item>
                    <Typography.Title level={5}>Texto</Typography.Title>
                    <Form.Item
                        name="text"
                        rules={[{ required: true, message: 'Por favor, insira um texto' }]}
                        initialValue={initialValues?.text}
                    >
                        <Input.TextArea style={{borderRadius: 16}} rows={10} />
                    </Form.Item>
                    <Typography.Title level={5}>Link</Typography.Title>
                    <Form.Item
                        name="link"
                        rules={[{ required: true, message: 'Por favor, insira um link' }]}
                        initialValue={initialValues?.link}
                    >
                        <Input style={{borderRadius: 50}}/>
                    </Form.Item>
                </S.Wrapper>
                <S.Wrapper style={{alignItems: 'center'}}>
                    <Typography.Title level={5}>Adicionar Imagem</Typography.Title>
                    <S.ContentImg>
                        <S.BannerImg src="assets/images/photo-camera.png"/>
                    </S.ContentImg>
                    <Form.Item>
                        <S.ButtonGroup>
                            <S.RadioButton
                                type='button'
                                selected={selectedValue === 'news'}
                                onClick={() => handleClick('news')}
                            >
                                NOTÍCIA
                            </S.RadioButton>
                            <S.RadioButton
                                type='button'
                                selected={selectedValue === 'carrousel'}
                                onClick={() => handleClick('carrousel')}
                            >
                                CARROSSEL
                            </S.RadioButton>
                            <S.RadioButton
                                type='button'
                                selected={selectedValue === 'column'}
                                onClick={() => handleClick('column')}
                            >
                                COLUNA
                            </S.RadioButton>
                        </S.ButtonGroup>
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
    </>
  );
};

export default App;
