import React from 'react';
import { Form, Input, Button, Upload, Radio, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as S from './styles';
import PostService from 'services/PostsService';

interface PostComponentProps {
    handleMenuClick: (key: string) => void;
}

const App: React.FC<PostComponentProps> = ({handleMenuClick}) => {
  const [form] = Form.useForm();
  const [selectedValue, setSelectedValue] = React.useState('news');
  const [loading, setLoading] = React.useState(false);

  const handleClick = (value: string) => {
    setSelectedValue(value);
  };

  const onFinish = async (values: any) => {
    console.log('Success:', values);
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
                    >
                        <Input style={{borderRadius: 50}}/>
                    </Form.Item>
                    <Typography.Title level={5}>Texto</Typography.Title>
                    <Form.Item
                        name="text"
                        rules={[{ required: true, message: 'Por favor, insira um texto' }]}
                    >
                        <Input.TextArea style={{borderRadius: 16}} rows={10} />
                    </Form.Item>
                    <Typography.Title level={5}>Link</Typography.Title>
                    <Form.Item
                        name="link"
                        rules={[{ required: true, message: 'Por favor, insira um link' }]}
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
                                selected={selectedValue === 'news'}
                                onClick={() => handleClick('news')}
                            >
                                NOTÍCIA
                            </S.RadioButton>
                            <S.RadioButton
                                selected={selectedValue === 'carrousel'}
                                onClick={() => handleClick('carrousel')}
                            >
                                CARROSSEL
                            </S.RadioButton>
                            <S.RadioButton
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
