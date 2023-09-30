import Image from 'next/image'
import React from 'react'
import NotFoundImage from '@/public/404.webp'

export default function NotFound() {
  return (
    <div className='not-found'>
        <Image src={NotFoundImage} alt='page not found' width={400} quality={100} priority='blur' />
        <h1>Oops! Page not found!</h1>
    </div>
  )
}
