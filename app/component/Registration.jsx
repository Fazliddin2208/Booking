import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Loading from './Loading'

export default function Registration({ change }) {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [passwordView, setPasswordView] = useState(false)
    const [passwordView1, setPasswordView1] = useState(false)

    const pickDatas = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const register = async (e) => {
        e.preventDefault()
        setLoading(true)
        const datas = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
            password: user.password,
            password1: user.password1,
        }

        await axios.post('http://127.0.0.1:8000/user/registration/', datas, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                const [first] = Object.values(res.data)
                if (res.status == 201) {
                    change()
                } else {
                    alert(first)
                }
            })
            .catch(err => {
                console.log(err);
            })
        setLoading(false)
    }

    return (
        <div className="authorize__datas__data">
            <h2>Registration</h2>
            <form onSubmit={(e) => register(e)} className="authorize__datas__data__inputs">
                <div className="authorize__datas__data__input">
                    <label>First Name</label>
                    <input onChange={(e) => pickDatas(e)} type="text" name='first_name' />
                </div>
                <div className="authorize__datas__data__input">
                    <label>Last Name</label>
                    <input onChange={(e) => pickDatas(e)} type="text" name='last_name' />
                </div>
                <div className="authorize__datas__data__input">
                    <label>Email*</label>
                    <input onChange={(e) => pickDatas(e)} type="email" name='email' required />
                </div>
                <div className="authorize__datas__data__input">
                    <label>Username</label>
                    <input onChange={(e) => pickDatas(e)} type="text" name='username' />
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
                <div className="authorize__datas__data__input">
                    <label>Repeat password*</label>
                    <div>
                        <input onChange={(e) => pickDatas(e)} type={passwordView1 ? "text" : "password"} name='password1' required />
                        {passwordView1 ?
                            <FontAwesomeIcon icon={faEye} onClick={() => setPasswordView1(false)} /> :
                            <FontAwesomeIcon icon={faEyeSlash} onClick={() => setPasswordView1(true)} />
                        }
                    </div>
                </div>
                {loading ?
                    <button><Loading /></button> :
                    <button type='submit'>Register</button>
                }
            </form>
        </div>
    )
}
