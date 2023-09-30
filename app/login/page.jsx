"use client"

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Loader from '../component/Loader'
import Loading from '../component/Loading'
import Link from 'next/link'

export default function Login() {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [passwordView, setPasswordView] = useState(false)

    const pickDatas = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const login = async (e) => {
        e.preventDefault()
        setLoading(true)
        const datas = {
            username: user.email,
            password: user.password,
        }

        await axios.post('http://127.0.0.1:8000/user/login/', datas, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                const [first] = Object.values(res.data)
                router.push('/')
            })
            .catch(err => {
                const [first] = Object.values(err.response.data)
                alert(first)
            })
        setLoading(false)
    }

    return (
        <form className='register' onSubmit={(e) => login(e)}>


            <h2>Login Form</h2>
            {/* <Loader /> */}

            <div className="register__field">
                <label>Email</label>
                <input onChange={(e) => pickDatas(e)} name='email' type="email" placeholder='example@gmail.com' required />
            </div>
            <div className="register__field">
                <label>Password</label>
                <div>
                    <input onChange={(e) => pickDatas(e)} name='password' type={passwordView ? "text" : "password"} placeholder='Password' minLength={8} required />
                    {passwordView ?
                        <FontAwesomeIcon icon={faEye} onClick={() => setPasswordView(false)} /> :
                        <FontAwesomeIcon icon={faEyeSlash} onClick={() => setPasswordView(true)} />
                    }
                </div>
            </div>

            <div className="register__actions">
                <Link href='/'><button type='reset'>Home</button></Link>
                {loading ?
                    <button type='submit'><Loading /></button> :
                    <button type='submit'>Submit</button>
                }
            </div>
        </form>
    )
}
