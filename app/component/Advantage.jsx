"use client"

import React, { useEffect } from 'react'
import AdvantageCard from './AdvantageCard'
import Aos from 'aos'
import Lowest from '@/public/lowest.svg'
import Free from '@/public/free.svg'
import Prom from '@/public/prom.svg'
import Support from '@/public/support.svg'
import Image from 'next/image'

const advantages = [
    {
        id: 0,
        title: 'Lowest Fees in the Industry',
        description: 'Our mission is to build great features and provide excellent customer service while keeping pricing as low as possible for you and your attendees.',
        img: 'http://localhost:3000/_next/static/media/lowest.497123ba.svg'
    },
    {
        id: 1,
        title: 'Free for Free Events',
        description: 'When you run a free event, there are no fees of any kind for you, event organiser, and your ticket buyer.',
        img: 'http://localhost:3000/_next/static/media/free.a916f35f.svg'
    },
    {
        id: 2,
        title: 'Get Your Event Promoted for Free',
        description: 'More than a million people visit our ticket pages every month. Put your event in the spotlight for free.',
        img: 'http://localhost:3000/_next/static/media/prom.e5e24d66.svg'
    },
    {
        id: 3,
        title: 'Exceptional Customer Support',
        description: 'Receive personalised and local support from our dedicated Australian team at no additional cost. Use 15+ years of experience in event ticket sales to run your best event.',
        img: 'http://localhost:3000/_next/static/media/support.8bc7775c.svg'
    }
]

export default function Advantage() {
    useEffect(() => {
        Aos.init();
      }, [])
    return (
        <div className='advantage'>
            <h2 data-aos='fade-up'>Streamline your events and sell and buy tickets online with the most affordable event ticketing platform</h2>
            <div className="advantage__cards">
                {advantages?.map(advantage => (
                    <AdvantageCard key={advantage.id} advantage={advantage} />
                ))}
            </div>
        </div>
    )
}
