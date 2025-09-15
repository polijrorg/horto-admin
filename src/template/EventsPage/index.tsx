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
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const getEvents = async () => {
            try {
                setLoading(true);
                const response = await EventService.GetAll();
                setEventsList(response);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            } finally {
                setLoading(false);
            }
        };

        getEvents();
    }, []);

    const handleEdit = (event: Event) => {
        router.push({
            pathname: 'EditEvent',
            query: { EventId: event.id }
        });
    };

    const handleEventDetail = (eventId: string) => {
        router.push({
            pathname: 'EventDetail',
            query: { EventId: eventId }
        });
    };

    const handleDelete = async (id: string) => {
        try {
            setLoading(true);
            await EventService.deleteEvent(id);
            const updatedEvents = await EventService.GetAll();
            setEventsList(updatedEvents);
        } catch (error) {
            console.error('Failed to delete event:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateEvent = () => {
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
                columns={getColumns(
                    handleEdit,
                    handleDelete,
                    handleEventDetail
                )}
                dataSource={eventsList}
                rowKey="id"
                loading={loading}
            />
        </>
    );
};

export default EventsPage;
