'use client'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import Loading from './Loading'
import Snackbar from './Snackbar'
import LoginModal from './LoginModal'

export default function Account() {

  const [loading, setLoading] = useState(false)
  const [passwordView, setPasswordView] = useState(false)
  const [passwordView1, setPasswordView1] = useState(false)

  const [snackOpen, setSnackOpen] = useState(false)
  const [snackText, setSnackText] = useState('')
  const [snackPriority, setSnackPriority] = useState('')

  const closeSnack = () => {
    setSnackOpen(false)
  }

  const user = localStorage.getItem('user')

  const [passwords, setPasswords] = useState({})

  const pickPasswords = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value })
  }

  const [loginModal, setLoginModal] = useState(false)

  const openLogin = () => {
    setLoginModal(true)
  }

  const closeLogin = () => {
    setLoginModal(false)
  }

  const changePassword = async () => {
    setLoading(true)
    const datas = {
      new_password: passwords.new_password,
      new_password1: passwords.new_password1,
    }

    await axios.put('http://127.0.0.1:8000/user/reset_password/', datas, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': 'zgu9hSqg0Lj6UprTnjIlYJWgNbFNcyMzJRRY5UwNgMX0H9jVHHtjjeVfOwwcAHgB',
        'Authorization': "Basic bXVyb2RAZ21haWwuY29tOm11cm9kMTIz"
      }
    })
      .then(res => {
        const [first] = Object.values(res.data)
        setSnackOpen(true)
        setSnackText(first)
        setSnackPriority('success')
        localStorage.removeItem('user')
        openLogin()
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
    <div className='profile__account'>
      <Snackbar open={snackOpen} priority={snackPriority} text={snackText} close={closeSnack} />
      <LoginModal modalOpen={loginModal} closeLogin={closeLogin} />
      <h3>Personal Details</h3>

      <div className="profile__account__infos">
        <div className='profile__account__infos__row'>
          <label>Email</label>
          <input value={user} type="text" disabled />
        </div>
        <div className='profile__account__infos__row'>
          <label>Password</label>
          <div>
            <input onChange={(e) => pickPasswords(e)} type={passwordView ? "text" : "password"} name='new_password' required />
            {passwordView ?
              <FontAwesomeIcon icon={faEye} onClick={() => setPasswordView(false)} /> :
              <FontAwesomeIcon icon={faEyeSlash} onClick={() => setPasswordView(true)} />
            }
          </div>
          <label>Repeat Password</label>
          <div>
            <input onChange={(e) => pickPasswords(e)} type={passwordView1 ? "text" : "password"} name='new_password1' required />
            {passwordView1 ?
              <FontAwesomeIcon icon={faEye} onClick={() => setPasswordView1(false)} /> :
              <FontAwesomeIcon icon={faEyeSlash} onClick={() => setPasswordView1(true)} />
            }
          </div>
          {loading ?
            <button className='disable'><Loading /></button> :
            <button onClick={changePassword}>Change Password</button>
          }

        </div>
      </div>
    </div>
  )
}
