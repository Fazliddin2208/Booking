import React, { useState } from 'react'
import Snackbar from './Snackbar';
import axios from 'axios';

export default function Confirm({ open, check, event, close, getReservs }) {

    const [loading, setLoading] = useState(false)
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackText, setSnackText] = useState('')
    const [snackPriority, setSnackPriority] = useState('')

    const closeSnack = () => {
        setSnackOpen(false)
    }

    const confirmEvent = async (e, event) => {
        e.preventDefault()
        setLoading(true)
        await axios.put(`http://127.0.0.1:8000/reservations/${parseInt(event?.res_id)}/pay/`, [], {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRFTOKEN': 'zgu9hSqg0Lj6UprTnjIlYJWgNbFNcyMzJRRY5UwNgMX0H9jVHHtjjeVfOwwcAHgB',
                'Authorization': 'Basic bXVyb2RAZ21haWwuY29tOm11cm9kMTIz'
            }
        })
            .then(res => {
                setSnackOpen(true)
                setSnackText(res.data.message)
                setSnackPriority('success')
                getReservs()
                close()
            })
            .catch(err => {
                console.log(err);
                setSnackOpen(true)
                setSnackText('An error occurred!')
                setSnackPriority('danger')
            })

        setLoading(false)
    }

    return (
        <>
            <Snackbar open={snackOpen} priority={snackPriority} text={snackText} close={closeSnack} />
            <div className={open === check ? "modal active" : 'modal'}>

                <div className="modal__confirm">
                    <div className="modal__top">
                        <h3>Confirm your booking</h3>
                        <p onClick={close}>&times;</p>
                    </div>

                    <form onSubmit={(e)=>confirmEvent(e, event)} className="modal__confirm__data">
                        <label>Card Number*(16 digit)</label>
                        <input required min={16} type="text" placeholder='your card number' />
                        <button>Confirm</button>
                    </form>

                </div>
            </div>
        </>
    )
}
