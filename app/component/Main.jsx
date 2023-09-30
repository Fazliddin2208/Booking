"use client"

import Image from 'next/image'
import React from 'react'
import Vector from '@/public/vector.svg'
import { useRouter } from 'next/navigation'

export default function Main() {

  const router = useRouter()

  return (
    <div className='advertisement'>
      <div className="advertisement__title">
          <h3>You can book all events with us</h3>
          <p>For all your event ticketing needs, from small gatherings to the large festivals, our event booking system has you covered</p>
          <div>
            <button onClick={()=>router.push('/create/event')}>Create Event</button>
            <button onClick={()=>router.push('/category/0')}>Explore More</button>
          </div>
      </div>
      <div className="advertisement__image">
        <Image src={Vector} alt='vector' width={150} quality={100} priority='blur' />
      </div>
    </div>
  )
}
