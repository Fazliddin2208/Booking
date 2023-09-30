import { faClock, faLocationDot, faMinus, faPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import Snackbar from './Snackbar'
import Loading from './Loading'

export default function BookModal({ openModal, closeModal, check, event }) {

    const [count, setCount] = useState(1)
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

    const [loading, setLoading] = useState(false)
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackText, setSnackText] = useState('')
    const [snackPriority, setSnackPriority] = useState('')

    const closeSnack = () => {
        setSnackOpen(false)
    }

    const bookEvent = async (event, count) => {
        const data = {
            event: event.id,
            number_of_tickets: count
        }
        setLoading(true)
        await axios.post('http://127.0.0.1:8000/reservations/create/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRFTOKEN': 'aV8Cg3Jb686mWoSvYyaafqd0Snylywc3rTmj3Xre1QwXpxybovGAGbF6bbadGoXj',
                'Authorization': 'Basic bXVyb2RAZ21haWwuY29tOm11cm9kMTIz='
            }
        })
            .then(res => {
                closeModal()
                setSnackOpen(true)
                setSnackText('You have successfully booked!')
                setSnackPriority('success')
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
            <div className={openModal === check ? 'modal active' : 'modal'}>
                <div className="modal__book">
                    <div className="modal__top">
                        <h3>Book ticket</h3>
                        <p onClick={closeModal}>&times;</p>
                    </div>

                    <div className="modal__book__datas">
                        <div className="modal__book__data">
                            <div className="modal__book__data__left">
                                <Image src={event?.thumbnail} alt='event image' width={300} height={200} quality={100} priority='blur' />
                            </div>
                            <div className="modal__book__data__right">
                                <i>#{event?.topic}</i>
                                <h3>{event?.name}</h3>
                                <address><FontAwesomeIcon icon={faLocationDot} />{event?.place}</address>
                                <p><FontAwesomeIcon icon={faClock} />{event?.date?.slice(0, 10)} {event?.date?.slice(11, 16)}</p>
                                <p><FontAwesomeIcon icon={faUsers} />{event?.number_of_seats}</p>
                            </div>
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
                                <button onClick={() => bookEvent(event, count)}>Book</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
