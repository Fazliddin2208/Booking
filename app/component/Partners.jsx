"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'
import Partner1 from '@/public/partner.png'
import Partner2 from '@/public/partner1.png'
import Partner3 from '@/public/partner2.png'
import Partner4 from '@/public/partner3.png'
import Partner5 from '@/public/partner4.png'
import Partner6 from '@/public/partner5.png'
import Aos from 'aos'

export default function Partners() {
  useEffect(() => {
    Aos.init();
  }, [])
  return (
    <div className='partners'>
      <h2 data-aos="fade-up">Trusted by thousands of event organisers, big and small</h2>
      <div>
        <Image data-aos="fade-up" src={Partner1} alt='partner logo' width={200} quality={100} priority='blur' />
        <Image data-aos="fade-up" src={Partner2} alt='partner logo' width={200} quality={100} priority='blur' />
        <Image data-aos="fade-up" src={Partner3} alt='partner logo' width={200} quality={100} priority='blur' />
        <Image data-aos="fade-up" src={Partner4} alt='partner logo' width={200} quality={100} priority='blur' />
        <Image data-aos="fade-up" src={Partner5} alt='partner logo' width={200} quality={100} priority='blur' />
        <Image data-aos="fade-up" src={Partner6} alt='partner logo' width={200} quality={100} priority='blur' />
      </div>
    </div>
  )
}
