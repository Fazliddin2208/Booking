import React, { useEffect } from 'react'
import '../styles/loader.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Snackbar({ open, text, priority, close }) {
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                close()
            }, 5000)
        }
    })
    return (
        <div className={open && priority === 'success' ? 'snackbar success' : open && priority === 'danger' ? 'snackbar danger' : 'snackbar'}>
            {priority === 'success' ? <FontAwesomeIcon icon={faCheck} /> :
                priority === 'danger' ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faCheck} />
            }
            <p>{text}</p>
            <p onClick={close}>&times;</p>
        </div>
    )
}
