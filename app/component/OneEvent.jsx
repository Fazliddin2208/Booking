import React, { useState } from 'react'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot, faMoneyBill, faTag, faUsers } from '@fortawesome/free-solid-svg-icons';
import BookModal from '@/app/component/BookModal';
import { useRouter } from 'next/navigation';

export default function OneEvent({ oneEvent, user }) {
    const router = useRouter()
    const [bookModal, setBookModal] = useState(false)

    const openBook = (elem) => {
        setBookModal(elem.id)
    }

    const closeBook = () => {
        setBookModal(false)
    }

    return (
        <>
            <div className='one_event'>
                <div className="one_event__data">
                    <div className="one_event__img">
                        <Image src={oneEvent?.thumbnail} alt='image' width={400} height={300} quality={100} priority="blur" />
                        {
                            user ? <button onClick={()=>router.push(`/event/edit/${oneEvent?.id}`)}>Edit Event</button> : null
                        }
                    </div>
                    <div className="one_event__infos">
                        <h3>{oneEvent?.name}</h3>
                        <i><FontAwesomeIcon icon={faTag} />{oneEvent?.topic}</i>
                        <p>{oneEvent?.description}
                        </p>
                        <div>
                            <address><FontAwesomeIcon icon={faLocationDot} />{oneEvent?.place}</address>
                            <p><FontAwesomeIcon icon={faClock} /> {oneEvent?.date?.slice(0, 10)} {oneEvent?.date?.slice(11, 16)}</p>
                            <p><FontAwesomeIcon icon={faUsers} />{oneEvent?.number_of_seats}</p>
                            <p><FontAwesomeIcon icon={faMoneyBill} />{parseInt(oneEvent?.ticket_price).toFixed(0).toLocaleString().replaceAll(',', ' ')} {oneEvent?.currency}</p>
                        </div>
                        <button onClick={() => openBook(oneEvent)}>Book now</button>
                    </div>
                </div>
            </div>
            <BookModal openModal={bookModal} closeModal={closeBook} check={oneEvent?.id} event={oneEvent} />
        </>
    )
}
