"use client"

import React, { useEffect } from 'react'
import IndustryCard from './IndustryCard'
import Aos from 'aos'

const industries = [
    {
        id: 1,
        img: 'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FITevent.09d2650d.jpg&w=640&q=100',
        title: 'Information Technologies',
        url: '/'
    },
    {
        id: 2,
        img: 'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FScienceEvent.6a4a4cf1.jpg&w=828&q=100',
        title: 'Science',
        url: '/'
    },
    {
        id: 3,
        img: 'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBioEvent.fa655848.jpg&w=640&q=100',
        title: 'Biology',
        url: '/'
    },
    {
        id: 4,
        img: 'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBusEvent.a36005d0.jpg&w=640&q=100',
        title: 'Bussiness',
        url: '/'
    },
    {
        id: 5,
        img: 'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMarEvent.acaab643.webp&w=640&q=100',
        title: 'Marketing',
        url: '/'
    }
]

export default function Industries() {

    useEffect(() => {
        Aos.init();
      }, [])

    return (
        <div className='industries'>
            <h2 data-aos="fade-up">Industries That You Can buy ticket for events with us</h2>
            <div className="industries__cards">
                {industries?.map(industry => (
                    <IndustryCard key={industry.id} industry={industry} />
                ))}
            </div>
        </div>
    )
}
