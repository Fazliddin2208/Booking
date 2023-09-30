import Image from 'next/image'
import React, { useState } from 'react'
import DeleteImage from '@/public/sure.png'
import axios from 'axios'
import Snackbar from './Snackbar'

export default function CancelBooking({ open, check, event, close, getReservs }) {

    const [loading, setLoading] = useState(false)
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackText, setSnackText] = useState('')
    const [snackPriority, setSnackPriority] = useState('')

    const closeSnack = () => {
        setSnackOpen(false)
    }

    const deleteEvent = async (event) => {

        setLoading(true)
        await axios.delete(`http://127.0.0.1:8000/reservations/${parseInt(event?.res_id)}/cancel/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRFTOKEN': 'zgu9hSqg0Lj6UprTnjIlYJWgNbFNcyMzJRRY5UwNgMX0H9jVHHtjjeVfOwwcAHgB',
                'Authorization': 'Basic bXVyb2RAZ21haWwuY29tOm11cm9kMTIz='
            }
        })
            .then(res => {
                close()
                setSnackOpen(true)
                setSnackText('You have successfully booked!')
                setSnackPriority('success')
                getReservs()
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
            <div className={open === check ? 'modal active' : 'modal'}>
                <div className="modal__cancel__book">
                    <Image src={DeleteImage} alt='delete image' width={200} quality={100} priority='blur' />
                    <h4>Are you sure about cancel this event?</h4>
                    <div>
                        <button onClick={close}>No, I'm not</button>
                        <button onClick={()=>deleteEvent(event)}>Yes, delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}
