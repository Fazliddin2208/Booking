"use client"

import React, { useEffect, useState } from 'react'
import EventCard from './EventCard'
import Image from 'next/image'
import Empty1 from '@/public/empty1.svg'

export default function Category({ data, category, getSearchedData }) {

    console.log(data, category);

    const [events, setEvents] = useState([])
    const [title, setTitle] = useState('')
    const array = []

    useEffect(() => {
        if (data?.length > 0) {
            if (category === '1') {
                data?.map(event => {
                    if (event?.topic === 'Information Technologies') {
                        array.push(event)
                        setEvents(array)
                        setTitle('Information Technologies')
                    }
                })
            } else if (category === '2') {
                data?.map(event => {
                    if (event?.topic === 'Science') {
                        array.push(event)
                        setEvents(array)
                        setTitle('Science')
                    }
                })
            } else if (category === '3') {
                data?.map(event => {
                    if (event?.topic === 'Biology') {
                        array.push(event)
                        setEvents(array)
                        setTitle('Biology')
                    }
                })
            } else if (category === '4') {
                data?.map(event => {
                    if (event?.topic === 'Bussiness') {
                        array.push(event)
                        setEvents(array)
                        setTitle('Bussiness')
                    }
                })
            } else if (category === '5') {
                data?.map(event => {
                    if (event?.topic === 'Marketing') {
                        array.push(event)
                        setEvents(array)
                        setTitle('Marketing')
                    }
                })
            } else {
                setEvents(data)
                setTitle('All')
            }
        } else{
            setEvents([])
        }
        

    }, [data, category])

    return (
        <div className='one_category'>
            <div className="one_category__wrapper">
                <div className="one_category__wrapper__top">
                    <h2>{title && title}</h2>
                    <input onChange={(e) => getSearchedData(e)} type="search" placeholder='Search your Event....' />

                </div>

                {events?.length > 0 ?

                    <div className='one_category__events'>
                        {
                            events?.map(event => (
                                <EventCard key={event.id} event={event} />
                            ))
                        }
                    </div>
                    :
                    <div className='one_category__empty'>
                        {/* <Image src={Empty} alt='empty' width={400} quality={100} /> */}
                        <Image src={Empty1} alt='empty' width={400} quality={100} />
                        <h2>There are no events in this industry!</h2>
                    </div>
                }
            </div>
        </div>
    )
}
