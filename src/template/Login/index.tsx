import * as S from './styles';
import { Form, Input, Button, Typography, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useState } from 'react';
import UserService from 'services/UserService';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            const response = await UserService.login(values);
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Email ou senha incorretos',
            });
        }
    };

    return (
        <>
            {contextHolder}
            <S.Container>
                <S.LeftSide>
                    <S.Banner src='assets/images/bannerClubeDoHorto.png'/>
                </S.LeftSide>
                <S.RightSide>
                    <Form
                        name="login"
                        onFinish={onFinish}
                        style={{ width: '400px' }}
                    >
                        <S.FormTitle>Acesse sua conta</S.FormTitle>
                        <Typography.Title level={5}>E-mail</Typography.Title>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }]}
                        >
                            <Input style={{borderRadius: 50}} placeholder="E-mail" type="email" />
                        </Form.Item>
                        <Typography.Title level={5}>Senha</Typography.Title>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                        >
                            <Input.Password
                                style={{borderRadius: 50}}
                                placeholder="Senha"
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <a href="#" style={{ float: 'left', marginBottom: '10px', color: '#CC8D3E' }}>Esqueci minha senha</a>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block style={{ borderRadius: 50, backgroundColor: '#CC8D3E', borderColor: '#CC8D3E' }} loading={loading}>
                                CONTINUAR
                            </Button>
                        </Form.Item>
                        <Form.Item>
                        <div style={{ textAlign: 'center' }}>
                            <span>Não tem uma conta? </span>
                            <a href="#" style={{ color: '#CC8D3E' }}>Cadastra-se</a>
                        </div>
                        </Form.Item>
                    </Form>
                </S.RightSide>
            </S.Container>
        </>
    )
};

export default Login;
