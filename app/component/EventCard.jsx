import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import EventImage from '@/public/event.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEarth, faLocationDot, faMoneyBill, faTag, faUsers } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import BookModal from './BookModal';

export default function EventCard({ event }) {
    useEffect(() => {
        AOS.init();
    }, [])

    const [bookModal, setBookModal] = useState(false)

    const openBook = (elem) => {
        setBookModal(elem.id)
    }

    const closeBook = () => {
        setBookModal(false)
    }

    return (
        <div data-aos="fade-up" className="event__card">
            <div className="event__card__top">
                <Image src={event?.thumbnail} alt='event image' width={150} height={100} quality={100} priority='blur' />    
            </div>
            <div className="event__card__body">
                <div className="event__card__body__data">
                    <Link href={`/event/${event.id}`}><h3>{event?.name}</h3></Link>
                    <i><FontAwesomeIcon icon={faTag} />{event?.topic}</i>
                    <p title={event?.description}>{event?.description}</p>
                    <address><FontAwesomeIcon icon={faLocationDot} />{event?.place}</address>
                    <p><FontAwesomeIcon icon={faClock} /> {event?.date?.slice(0,10)} {event?.date?.slice(11,16)}</p>
                    <button onClick={()=>openBook(event)}>Book for {parseInt(event?.ticket_price).toFixed(0)} {event?.currency}</button>
                    <BookModal openModal={bookModal} closeModal={closeBook} check={event?.id} event={event} />

                </div>
                <div className="event__card__body__footer">
                    <p><FontAwesomeIcon icon={faUsers} />{event?.number_of_seats}</p>
                    <p><FontAwesomeIcon icon={faMoneyBill} />{parseInt(event?.ticket_price).toFixed(0)} {event?.currency}</p>
                </div>
            </div>

        </div>
    )
}
