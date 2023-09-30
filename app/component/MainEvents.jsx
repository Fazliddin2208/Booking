"use client"

import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import EventCard from './EventCard';
import axios from 'axios';

export default function MainEvents() {

  const [events, setEvents] = useState([])
  events.length = 8

  useEffect(() => {
    AOS.init();
    getEvents()
  }, [])

  const getEvents = async() => {
    axios.get('http://127.0.0.1:8000/events/all/')
    .then(res=>{
      setEvents(res.data.sort(function(a, b){return b.id - a.id}))
    })
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <div className='events'>
      <div className="events__title">
        <h2 data-aos="fade-up">Last Events</h2>
      </div>
      <div className="events__all">
        {events?.map((event, index)=>(
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  )
}
