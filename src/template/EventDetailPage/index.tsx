import React, { useEffect, useState, useMemo } from 'react';
import {
    Card,
    Typography,
    List,
    Avatar,
    Spin,
    message,
    Row,
    Col,
    Divider,
    Select,
    Input,
    Button,
    Switch
} from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import EventService from 'services/EventService';
import { Event, GetParticipantsResponse } from 'interfaces/Events';
import { formatParticipants } from 'utils/participantsUtils';
import * as S from './styles';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const EventDetailPage = () => {
    const router = useRouter();
    const { EventId } = router.query;

    const [eventData, setEventData] = useState<Event | null>(null);
    const [participants, setParticipants] = useState<GetParticipantsResponse[]>(
        []
    );
    const [loading, setLoading] = useState(true);

    // estados do filtro
    const [filterField, setFilterField] =
        useState<keyof GetParticipantsResponse['user']>('name');
    const [filterValue, setFilterValue] = useState('');

    // estados de cópia
    const [separator, setSeparator] = useState(' / ');
    const [onePerLine, setOnePerLine] = useState(false);

    useEffect(() => {
        if (EventId) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const event = await EventService.GetEventById(
                        EventId as string
                    );
                    const participantsList =
                        await EventService.GetParticipantsByEventId(
                            EventId as string
                        );
                    setEventData(event);
                    setParticipants(participantsList);
                } catch (error) {
                    console.error(error);
                    message.error('Erro ao carregar os detalhes do cupom');
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [EventId]);

    const filteredParticipants = useMemo(() => {
        if (!filterValue) return participants;
        return participants.filter((p) =>
            String(p.user[filterField])
                .toLowerCase()
                .includes(filterValue.toLowerCase())
        );
    }, [participants, filterField, filterValue]);

    const handleCopy = async () => {
        try {
            const text = formatParticipants(
                participants,
                filterField,
                separator,
                onePerLine
            );
            await navigator.clipboard.writeText(text);
            message.success('Lista copiada para a área de transferência!');
        } catch (err) {
            console.error(err);
            message.error('Erro ao copiar para a área de transferência.');
        }
    };

    if (loading) {
        return (
            <S.Container>
                <Spin size="large" />
            </S.Container>
        );
    }

    if (!eventData) {
        return (
            <S.Container>
                <Text>Evento não encontrado.</Text>
            </S.Container>
        );
    }

    return (
        <S.Container>
            <S.ContentWrapper>
                <Card bordered={false}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            {eventData.linkImage && (
                                <S.EventImage
                                    src={eventData.linkImage}
                                    alt={eventData.name}
                                />
                            )}
                        </Col>
                        <Col xs={24} md={16}>
                            <Title level={3}>{eventData.name}</Title>
                            <Text type="secondary">
                                {eventData.companyName}
                            </Text>
                            <Divider />
                            <Paragraph>
                                <strong>Tipo:</strong> {eventData.eventType}
                            </Paragraph>
                            <Paragraph>
                                <strong>Período:</strong>{' '}
                                {new Date(
                                    eventData.eventStartDate
                                ).toLocaleString()}{' '}
                                -{' '}
                                {new Date(
                                    eventData.eventEndDate
                                ).toLocaleString()}
                            </Paragraph>
                            <Paragraph>
                                <strong>Recompensa:</strong> {eventData.reward}
                            </Paragraph>
                            <Paragraph>
                                <strong>Regras:</strong> {eventData.rules}
                            </Paragraph>
                            {eventData.address && (
                                <Paragraph>
                                    <strong>Endereço:</strong>{' '}
                                    {`${eventData.address.street}, ${eventData.address.numberHouse} - ${eventData.address.neighborhood}, ${eventData.address.city} - ${eventData.address.state}, CEP: ${eventData.address.cep}`}
                                </Paragraph>
                            )}
                            <Paragraph>
                                <strong>Link:</strong>{' '}
                                <a
                                    href={eventData.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {eventData.link}
                                </a>
                            </Paragraph>
                        </Col>
                    </Row>
                </Card>

                <S.ParticipantsSection>
                    <Row
                        gutter={[16, 16]}
                        align="middle"
                        justify="space-between"
                    >
                        <Col>
                            <Title level={4}>
                                Participantes: {filteredParticipants.length}
                            </Title>
                        </Col>
                        <Col flex="auto">
                            <Row gutter={8} align="middle" wrap>
                                <Col>
                                    <Select
                                        value={filterField}
                                        onChange={(value) =>
                                            setFilterField(
                                                value as keyof GetParticipantsResponse['user']
                                            )
                                        }
                                    >
                                        <Option value="id">ID</Option>
                                        <Option value="name">Nome</Option>
                                        <Option value="email">Email</Option>
                                    </Select>
                                </Col>
                                <Col flex="auto">
                                    <Input
                                        placeholder={`Filtrar por ${filterField}`}
                                        value={filterValue}
                                        onChange={(e) =>
                                            setFilterValue(e.target.value)
                                        }
                                    />
                                </Col>
                                <Col>
                                    <Input
                                        placeholder="Separador"
                                        value={separator}
                                        onChange={(e) =>
                                            setSeparator(e.target.value)
                                        }
                                        style={{ width: 120 }}
                                    />
                                </Col>
                                <Col>
                                    <Switch
                                        checked={onePerLine}
                                        onChange={setOnePerLine}
                                        checkedChildren="Quebrar linha"
                                        unCheckedChildren="Uma linha"
                                    />
                                </Col>
                                <Col>
                                    <Button
                                        icon={<CopyOutlined />}
                                        onClick={handleCopy}
                                    >
                                        Copiar
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <List
                        itemLayout="horizontal"
                        dataSource={filteredParticipants}
                        locale={{
                            emptyText: 'Nenhum participante registrado.'
                        }}
                        renderItem={(participant) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar>
                                            {participant.user.name[0]}
                                        </Avatar>
                                    }
                                    title={participant.user.name}
                                    description={participant.user.email}
                                />
                            </List.Item>
                        )}
                    />
                </S.ParticipantsSection>
            </S.ContentWrapper>
        </S.Container>
    );
};

export default EventDetailPage;
