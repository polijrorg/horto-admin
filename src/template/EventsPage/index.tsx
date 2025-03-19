/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Event } from 'interfaces/Events';
import EventService from 'services/EventService';
import { getColumns } from './index-helper';

const EventsPage = () => {
    const [eventsList, setEventsList] = useState<Event[]>([]);
    const router = useRouter();

    useEffect(() => {
        const getEvents = async () => {
            try {
                const response = await EventService.GetAll();
                setEventsList(response);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        getEvents();
    }, []);

    const handleEdit = (event: Event) => {
        // Navega para a página de edição de eventos com os valores do evento
        router.push({
            pathname: 'EditEvent',
            query: { EventId: event.id }
        });
    };

    const handleDelete = async (id: string) => {
        try {
            await EventService.deleteEvent(id);
            const updatedEvents = await EventService.GetAll();
            setEventsList(updatedEvents);
        } catch (error) {
            console.error('Failed to delete event:', error);
        }
    };

    const handleCreateEvent = () => {
        // Navega para a página de criação de eventos
        router.push('CreateEvent');
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                    marginTop: 8,
                    marginRight: 16
                }}
            >
                <h2>Eventos ativos</h2>
                <PlusOutlined
                    style={{
                        fontSize: '32px',
                        color: '#CC8D3E'
                    }}
                    onClick={handleCreateEvent}
                />
            </div>
            <Table
                style={{ color: 'white' }}
                columns={getColumns(handleEdit, handleDelete)}
                dataSource={eventsList}
                rowKey="id"
            />
        </>
    );
};

export default EventsPage;
