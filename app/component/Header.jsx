"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import LoginModal from './LoginModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function Header() {

    const [loginModal, setLoginModal] = useState(false)

    const openLogin = () => {
        setLoginModal(true)
    }

    const closeLogin = () => {
        setLoginModal(false)
    }

    const user = localStorage.getItem('user')

  return (
    <div className='header'>
        <div className="header__logo">
            <Link href={'/'}>
                <h2>Booking</h2>
            </Link>
        </div>
        <div className="header__menu">
            <ul>
                <li><Link href={`/category/0`}>All Events</Link></li>
                <li><Link href={`/category/1`}>IT</Link></li>
                <li><Link href={`/category/2`}>Science</Link></li>
                <li><Link href={`/category/3`}>Biology</Link></li>
                <li><Link href={`/category/4`}>Bussiness</Link></li>
                <li><Link href={`/category/5`}>Marketing</Link></li>
            </ul>
        </div>

        <div className="header__account">
            {user ? 
                <Link href='/profile/account'><FontAwesomeIcon icon={faUser} /> Account</Link> :
                <>
                    <Link href='/register'>Sign In</Link>
                    <button onClick={openLogin}>Sign Up</button>
                </>
            }
            
            <LoginModal modalOpen={loginModal} closeLogin={closeLogin} />
        </div>
    </div>
  )
}
