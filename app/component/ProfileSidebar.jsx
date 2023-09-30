'use client'

import { faBookmark, faHome, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import Link from 'next/link'

export default function ProfileSidebar({ slug }) {

  const router = useRouter()
  const [loader, setLoader] = useState(false)
  const [profSide, setProfSide] = useState()

  useEffect(() => {
    const profSide = localStorage.getItem('profSide')
    setProfSide(profSide)
  }, [profSide])

  const logout = () => {
    setLoader(true)
    localStorage.removeItem('user')
    setTimeout(() => {
      setLoader(false)
      router.push('/')
    }, 500)
  }

  return (
    <div className='profile__sidebar'>
      {loader && <Loader />}
      <ul>
        <li><Link
          href={'/profile/account'}
          className={slug == 'account' ? 'active' : ''}
        ><FontAwesomeIcon icon={faHome} /> Personal Account</Link></li>
        <li><Link
          href={'/profile/reservation'}
          className={slug == 'reservation' ? 'active' : ''}
        ><FontAwesomeIcon icon={faBookmark} /> My Reservations</Link></li>
        <li><p
          onClick={() => {
            logout()
          }}

        ><FontAwesomeIcon icon={faRightFromBracket} /> Logout</p></li>
      </ul>
    </div>
  )
}
