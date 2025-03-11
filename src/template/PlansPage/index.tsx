import React from 'react';
import { Button, Card } from 'antd';
import { useRouter } from 'next/router';

const PlansPage = () => {
    const router = useRouter();

    // Função para navegar para outras páginas
    const navigateToPage = (key: string) => {
        router.push(key);
    };

    return (
        <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360, height: '100%' }}
        >
            <h2>Informações Sobre Benefícios</h2>
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        marginTop: '20px'
                    }}
                >
                    <Card
                        hoverable
                        style={{
                            width: '40%',
                            textAlign: 'center',
                            border: '#66000000 1px solid'
                        }}
                        cover={
                            <div>
                                <h1 style={{ fontWeight: 400, marginTop: 4 }}>
                                    Plano Bronze
                                </h1>
                            </div>
                        }
                        onClick={() => navigateToPage('Users')}
                    >
                        <div style={{ marginLeft: 32, textAlign: 'start' }}>
                            <p style={{ fontSize: 20 }}>xxxxxxxxxxxxxxxxx</p>
                            <p style={{ fontSize: 20 }}>xxxxxxxxxxxxxxxxx</p>
                            <p style={{ fontSize: 20 }}>xxxxxxxxxxxxxxxxx</p>
                        </div>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{
                                marginTop: 32,
                                borderRadius: 50,
                                backgroundColor: '#CC8D3E',
                                borderColor: '#CC8D3E',
                                fontWeight: 'bold',
                                width: '90%'
                            }}
                        >
                            ENTRAR EM CONTATO
                        </Button>
                    </Card>
                    <Card
                        hoverable
                        style={{
                            width: '40%',
                            textAlign: 'center',
                            border: '#66000000 1px solid'
                        }}
                        cover={
                            <div>
                                <h1 style={{ fontWeight: 400, marginTop: 4 }}>
                                    Plano Prata
                                </h1>
                            </div>
                        }
                        onClick={() => navigateToPage('Users')}
                    >
                        <div style={{ marginLeft: 32, textAlign: 'start' }}>
                            <p style={{ fontSize: 20 }}>xxxxxxxxxxxxxxxxx</p>
                            <p style={{ fontSize: 20 }}>xxxxxxxxxxxxxxxxx</p>
                            <p style={{ fontSize: 20 }}>xxxxxxxxxxxxxxxxx</p>
                        </div>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{
                                marginTop: 32,
                                borderRadius: 50,
                                backgroundColor: '#CC8D3E',
                                borderColor: '#CC8D3E',
                                fontWeight: 'bold',
                                width: '90%'
                            }}
                        >
                            ENTRAR EM CONTATO
                        </Button>
                    </Card>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        marginTop: '20px'
                    }}
                >
                    <Card
                        hoverable
                        style={{
                            width: '40%',
                            textAlign: 'center',
                            border: '#66000000 1px solid'
                        }}
                        cover={
                            <div>
                                <h1 style={{ fontWeight: 400, marginTop: 4 }}>
                                    Plano Ouro
                                </h1>
                            </div>
                        }
                        onClick={() => navigateToPage('Users')}
                    >
                        <div style={{ marginLeft: 32, textAlign: 'start' }}>
                            <p style={{ fontSize: 20 }}>xxxxxxxxxxxxxxxxx</p>
                            <p style={{ fontSize: 20 }}>xxxxxxxxxxxxxxxxx</p>
                            <p style={{ fontSize: 20 }}>xxxxxxxxxxxxxxxxx</p>
                        </div>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{
                                marginTop: 32,
                                borderRadius: 50,
                                backgroundColor: '#CC8D3E',
                                borderColor: '#CC8D3E',
                                fontWeight: 'bold',
                                width: '90%'
                            }}
                        >
                            ENTRAR EM CONTATO
                        </Button>
                    </Card>
                    <Card
                        hoverable
                        style={{
                            width: '40%',
                            textAlign: 'center',
                            border: '#66000000 1px solid'
                        }}
                        cover={
                            <div>
                                <h1 style={{ fontWeight: 400, marginTop: 4 }}>
                                    Plano Diamante
                                </h1>
                            </div>
                        }
                        onClick={() => navigateToPage('Users')}
                    >
                        <div style={{ marginLeft: 32, textAlign: 'start' }}>
                            <p style={{ fontSize: 20 }}>xxxxxxxxxxxxxxxxx</p>
                            <p style={{ fontSize: 20 }}>xxxxxxxxxxxxxxxxx</p>
                            <p style={{ fontSize: 20 }}>xxxxxxxxxxxxxxxxx</p>
                        </div>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{
                                marginTop: 32,
                                borderRadius: 50,
                                backgroundColor: '#CC8D3E',
                                borderColor: '#CC8D3E',
                                fontWeight: 'bold',
                                width: '90%'
                            }}
                        >
                            ENTRAR EM CONTATO
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PlansPage;
