"use client"

import Aos from 'aos';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function Enrich() {

  useEffect(() => {
    Aos.init();
  }, [])

  const router = useRouter()

  return (
    <div className='enrich'>
      <div>
        <h2 data-aos='fade-up'>Enrich your community with an event</h2>
        <button data-aos='fade-up' onClick={() => router.push('/create/event')}>Create Event</button>
      </div>
    </div>
  )
}
