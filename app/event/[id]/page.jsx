"use client"

import React, { useEffect, useState } from 'react'
import EventCard from '@/app/component/EventCard';
import axios from 'axios';
import OneEvent from '@/app/component/OneEvent';

export default function Page({ params }) {

    const [events, setEvents] = useState([])
    const [oneEvent, setOneEvent] = useState({})
    events.length = 4

    useEffect(() => {
        getEvents()
    }, [])

    const getEvents = async () => {
        axios.get('http://127.0.0.1:8000/events/all/')
            .then(res => {
                const arr = []
                res?.data?.map(data => {
                    if (data.id == params.id) {
                        setOneEvent(data)
                    } else {
                        arr.push(data)
                        setEvents(arr)
                    }
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    const user = localStorage.getItem('user')

    return (
        <div className="one">
            <OneEvent oneEvent={oneEvent} user={user} />
            
            <div className="one_event__others">
                {events && events?.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </div>
    )
}
