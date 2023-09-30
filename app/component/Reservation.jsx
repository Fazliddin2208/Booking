import Image from 'next/image'
import React, { useState } from 'react'
import EditReserv from './EditReserv'
import CancelBooking from './CancelBooking'
import Confirm from './Confirm'

export default function Reservation({ event, getReservs }) {


    const [editModal, setEditModal] = useState(false)

    const openEdit = (elem) => {
        setEditModal(elem)
    }
    const closeEdit = () => {
        setEditModal(false)
    }

    const [deleteModal, setDeleteModal] = useState(false)

    const openDelete = (elem) => {
        setDeleteModal(elem)
    }
    const closeDelete = () => {
        setDeleteModal(false)
    }

    const [confirmModal, setConfirmModal] = useState(false)

    const openConfirm = (elem) => {
        setConfirmModal(elem)
    }
    const closeConfirm = () => {
        setConfirmModal(false)
    }

    return (

        <div key={event.res_id} className="profile__reservations__reserv">
            <div className="profile__reservations__reserv__left">
                <Image src={event?.thumbnail} alt='reservation image' width={400} height={200} quality={100} priority='blur' />
            </div>
            <div className="profile__reservations__reserv__right">
                <div className="profile__reservations__reserv__right__top">
                    <h2>{event?.name}</h2>
                    <button className={event?.status == 'Pending' ? 'pending' : 'confirmed'}>{event?.status}</button>
                </div>
                <div className="profile__reservations__reserv__right__row">
                    <p>Topic</p>
                    <span></span>
                    <p>{event?.topic}</p>
                </div>
                <div className="profile__reservations__reserv__right__row">
                    <p>Place</p>
                    <span></span>
                    <p>{event?.place}</p>
                </div>
                <div className="profile__reservations__reserv__right__row">
                    <p>Date of Event</p>
                    <span></span>
                    <p>{event?.date?.slice(0, 10)} {event?.date?.slice(11, 16)}</p>
                </div>
                <div className="profile__reservations__reserv__right__row">
                    <p>Number of tickets</p>
                    <span></span>
                    <p>{event?.number_of_tickets}</p>
                </div>
                <div className="profile__reservations__reserv__right__row">
                    <p>Ticket price</p>
                    <span></span>
                    <p>{parseInt(event?.ticket_price).toFixed(0).toLocaleString().replaceAll(',', ' ')} {event?.currency}</p>
                </div>
                <div className="profile__reservations__reserv__right__row">
                    <p>Total price</p>
                    <span></span>
                    <p>{(parseInt(event?.ticket_price).toFixed(0) * event?.number_of_tickets).toLocaleString().replaceAll(',', ' ')} {event?.currency}</p>
                </div>
                <div className="profile__reservations__reserv__right__row">
                    <div className="profile__reservations__reserv__right__row__left">
                        <button onClick={()=>openDelete(event.res_id)} className='danger'>Delete</button>
                        <CancelBooking open={deleteModal} close={closeDelete} check={event.res_id} event={event} getReservs={getReservs} />
                    </div>

                    <div className="profile__reservations__reserv__right__row__right">
                        <button onClick={() => openEdit(event.res_id)} className='edit'>Edit</button>
                        <EditReserv open={editModal} close={closeEdit} check={event.res_id} event={event} getReservs={getReservs} />
                        <button onClick={() => openConfirm(event.res_id)} className='success'>Confirm</button>
                        <Confirm open={confirmModal} close={closeConfirm} check={event.res_id} event={event} getReservs={getReservs} />
                    </div>
                </div>
            </div>
        </div>
    )
}
