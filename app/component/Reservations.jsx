'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import Image from 'next/image'
import Reservation from './Reservation'
import Empty1 from '@/public/empty1.svg'

export default function Reservations() {
    const [reservs, setReservs] = useState([])
    const [loader, setLoader] = useState(false)
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([])

    useEffect(() => {

        getReservs()
    }, [])

    const getReservs = async () => {
        setLoader(true)
        axios.get(`http://127.0.0.1:8000/reservations/all/`, {
            headers: {
                'Content-Type': 'multiple/formdata',
                'Accept': 'application/json',
                'X-CSRFTOKEN': 'zgu9hSqg0Lj6UprTnjIlYJWgNbFNcyMzJRRY5UwNgMX0H9jVHHtjjeVfOwwcAHgB',
                'Authorization': 'Basic bXVyb2RAZ21haWwuY29tOm11cm9kMTIz'
            }
        })
            .then(res => {
                setReservs(res.data)
                getEvents(res.data)
            })
            .catch(err => {
                console.log(err);
            })
        setLoader(false)
    }

    const getEvents = async (arr) => {
        axios.get('http://127.0.0.1:8000/events/all/')
            .then(res => {
                const reservs = []
                res?.data?.map(event => {
                    arr?.map(item => {
                        if (item.event == event.id) {
                            reservs.push({
                                res_id: item.id,
                                event_id: item.event,
                                number_of_tickets: item.number_of_tickets,
                                status: item.status,
                                guest: item.guest,
                                name: event.name,
                                topic: event.topic,
                                place: event.place,
                                date: event.date,
                                thumbnail: event.thumbnail,
                                ticket_price: event.ticket_price,
                                currency: event.currency,
                                description: event.description,
                                number_of_seats: event.number_of_seats
                            })
                        }
                        setEvents(reservs)

                    })
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    const arr = []
    useEffect(() => {
        sortEvents()
    }, [])

    const [sorted, setSorted] = useState()
    const [sortTerm, setSortTerm] = useState()
    const sortEvents = (e) => {
        setSortTerm(e)
        getReservs()
        events?.map(event => {
            if (e == event.status) {
                arr.push(event)
            }
        })
        setSorted(arr)
    }


    return (
        <div className='profile__reservations'>
            <select onChange={(e) => sortEvents(e.target.value)}>
                <option value="all">All</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
            </select>
            {loader && <Loader />}
            {sortTerm == 'all' || sortTerm == undefined ?
                (
                    events?.length > 0 ?
                        events?.map(event => (
                            <Reservation key={event.res_id} event={event} getReservs={getReservs} />
                        )) :
                        <div className='one_category__empty'>
                            <Image src={Empty1} alt='empty' width={400} quality={100} />
                            <h2>You don't have any resvations!</h2>
                        </div>
                ) :
                (
                    sorted?.length > 0 ?
                        sorted?.map(event => (
                            <Reservation key={event.res_id} event={event} getReservs={getReservs} />
                        )) :
                        <div className='one_category__empty'>
                            <Image src={Empty1} alt='empty' width={400} quality={100} />
                            <h2>You don't have any resvations in this status!</h2>
                        </div>
                )

            }

        </div>
    )
}
