import React, { useRef, useState } from 'react'
import '../styles/register.scss'
import Image from 'next/image'
import Rocket from '@/public/rocket.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Registration from './Registration'
import Login from './Login'
import { useRouter } from 'next/navigation'

export default function Authorize() {

    const router = useRouter()
    const [activeTab, setActiveTab] = useState(false)

    const changeToLogin = () => {
        setActiveTab(true)
    }

    return (
        <div className='authorize'>
            <div className="authorize__home">
                <div className="authorize__home__intro">
                    <Image src={Rocket} alt='rocket' width={100} quality={100} priority='blur' />
                    <h2>Welcome</h2>
                    <p>You are 30 seconds away from booking your ticket</p>
                </div>
                <div className="authorize__home__link">
                    <button onClick={()=>router.push('/')}>Home</button>
                </div>
            </div>
            <div className="authorize__datas">
                <div className="authorize__datas__top">
                    <div className="changer">
                        <p onClick={() => setActiveTab(false)} className={!activeTab ? 'active' : ''}>Sign up</p>
                        <p onClick={() => setActiveTab(true)} className={activeTab ? 'active' : ''}>Sign in</p>
                    </div>
                </div>
                {!activeTab ?
                    <Registration change={changeToLogin} /> : <Login />
                }
            </div>
        </div>
    )
}
