"use client"

import React, { useRef, useState } from 'react'
import '../styles/modals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Loading from './Loading'
import axios from 'axios'
import Snackbar from './Snackbar'

export default function LoginModal({ modalOpen, closeLogin }) {

  const [loading, setLoading] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackText, setSnackText] = useState('')
  const [snackPriority, setSnackPriority] = useState('')

  const closeSnack = () => {
    setSnackOpen(false)
  }

  const [user, setUser] = useState({})
  const [passwordView, setPasswordView] = useState(false)

  const pickDatas = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const resetRef = useRef()

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
        setSnackOpen(true)
        setSnackText("You logged in successfully")
        setSnackPriority('success')
        resetRef.current.click()
        closeLogin()
        localStorage.setItem('user', user.email)
      })
      .catch(err => {
        const [first] = Object.values(err.response.data)
        setSnackOpen(true)
        setSnackText(first)
        setSnackPriority('danger')
      })
    setLoading(false)
  }

  return (
    <>
      <Snackbar open={snackOpen} priority={snackPriority} text={snackText} close={closeSnack} />
      <div className={modalOpen ? 'modal active' : 'modal'}>

        <form onSubmit={login} className='modal__login'>
          <div className="modal__top">
            <h3>Login</h3>
            <p onClick={closeLogin}>&times;</p>
          </div>
          <div className="modal__login__datas">
            <div className='modal__login__inputs'>
              <label>Email</label>
              <input onChange={(e) => pickDatas(e)} name='email' type="email" placeholder='Email...' required />
            </div>
            <div className='modal__login__inputs'>
              <label>Password</label>
              <div>
                <input onChange={(e) => pickDatas(e)} name='password' type={passwordView ? "text" : "password"} placeholder='Password...' required />
                {passwordView ?
                  <FontAwesomeIcon icon={faEye} onClick={() => setPasswordView(false)} /> :
                  <FontAwesomeIcon icon={faEyeSlash} onClick={() => setPasswordView(true)} />
                }
              </div>
            </div>
            <div className="modal__login__actions">
              <button ref={resetRef} hidden type='reset'>click</button>
              {loading ?
                <button type='submit'><Loading /></button> :
                <button type='submit'>Submit</button>
              }
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
