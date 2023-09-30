import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Loading from './Loading'

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
                router.refresh()
                localStorage.setItem('user', user.email)
            })
            .catch(err => {
                const [first] = Object.values(err.response.data)
                alert(first)
            })
        setLoading(false)
    }

    return (
        <div className="authorize__datas__data">
            <h2>Login</h2>
            <form onSubmit={(e) => login(e)} className="authorize__datas__data__inputs">

                <div className="authorize__datas__data__input">
                    <label>Email*</label>
                    <input onChange={(e) => pickDatas(e)} type="email" name='email' required />
                </div>
                <div className="authorize__datas__data__input">
                    <label>Password*</label>
                    <div>
                        <input onChange={(e) => pickDatas(e)} type={passwordView ? "text" : "password"} name='password' required />
                        {passwordView ?
                            <FontAwesomeIcon icon={faEye} onClick={() => setPasswordView(false)} /> :
                            <FontAwesomeIcon icon={faEyeSlash} onClick={() => setPasswordView(true)} />
                        }
                    </div>

                </div>
                {loading ?
                    <button><Loading /></button> :
                    <button type='submit'>Login</button>
                }
            </form>
        </div>
    )
}
