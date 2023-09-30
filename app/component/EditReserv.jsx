import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Loading from './Loading'
import axios from 'axios'
import Snackbar from './Snackbar'

export default function EditReserv({ open, check, event, close, getReservs }) {
    const [count, setCount] = useState(event?.number_of_tickets)
    const [loading, setLoading] = useState(false)
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackText, setSnackText] = useState('')
    const [snackPriority, setSnackPriority] = useState('')

    const closeSnack = () => {
        setSnackOpen(false)
    }

    const increase = () => {
        if (count < event.number_of_seats) {
            setCount(count + 1)
        }

    }
    const decrease = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    const editEvent = async (event, count) => {
        const data = {
            event: event.event_id,
            number_of_tickets: count
        }
        setLoading(true)
        await axios.put(`http://127.0.0.1:8000/reservations/${parseInt(event?.res_id)}/update/`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRFTOKEN': 'zgu9hSqg0Lj6UprTnjIlYJWgNbFNcyMzJRRY5UwNgMX0H9jVHHtjjeVfOwwcAHgB',
                'Authorization': 'Basic bXVyb2RAZ21haWwuY29tOm11cm9kMTIz'
            }
        })
            .then(res => {
                setSnackOpen(true)
                setSnackText('You have successfully booked!')
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

                <div className="modal__reserv__edit">
                    <div className="modal__top">
                        <h3>Edit your Reservation</h3>
                        <p onClick={close}>&times;</p>
                    </div>
                    <div className="modal__book__action">
                        <div className="modal__book__action__top">
                            <div>
                                <label>Number of ticket</label>
                                <div>
                                    <b><FontAwesomeIcon className={count <= 1 ? 'disabled' : ''} onClick={decrease} icon={faMinus} /></b>
                                    <span>{count}</span>
                                    <b><FontAwesomeIcon className={count >= event?.number_of_seats ? 'disabled' : ''} onClick={increase} icon={faPlus} /></b>
                                </div>
                            </div>
                            <div>
                                <label>Price of ticket</label>
                                <p>{parseInt(event?.ticket_price).toFixed(0).toLocaleString().replaceAll(',', ' ')} {event?.currency}</p>
                            </div>
                            <div>
                                <label>Total price</label>
                                <p>{(parseInt(event?.ticket_price).toFixed(0) * count).toLocaleString().replaceAll(',', ' ')} {event?.currency}</p>
                            </div>
                        </div>
                        {loading ?
                            <button type='submit'><Loading /></button> :
                            <button onClick={() => editEvent(event, count)}>Edit</button>
                        }
                    </div>

                </div>

            </div>
        </>
    )
}
