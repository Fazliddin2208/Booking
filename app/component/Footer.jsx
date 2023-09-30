import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='footer'>
        <div className="footer__datas">
            <div className="footer__logo">
                <h3>Booking</h3>
                <p>&copy;2023 Booking Pty Ltd. All rights reserved</p>
            </div>
            <div className="footer__menus">
                <div>
                    <h4>Events</h4>
                    <ul>
                        <li><Link href={'/category/1'}>Information Technologies</Link></li>
                        <li><Link href={'/category/2'}>Science</Link></li>
                        <li><Link href={'/category/3'}>Biology</Link></li>
                        <li><Link href={'/category/4'}>Bussiness</Link></li>
                        <li><Link href={'/category/5'}>Marketing</Link></li>
                    </ul>
                </div>
                <div>
                    <h4>Company</h4>
                    <ul>
                        <li><Link href={'/footer/1'}>About us</Link></li>
                        <li><Link href={'/footer/2'}>Why us?</Link></li>
                        <li><Link href={'/'}>Contact</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}
