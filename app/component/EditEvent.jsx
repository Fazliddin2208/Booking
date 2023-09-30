"use client"

import Loading from '@/app/component/Loading'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import EventImage from '@/public/eventImage.jpg'
import Image from 'next/image'
import Snackbar from './Snackbar'
import Loader from './Loader'

export default function EditEvent({ events }) {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [loader, setLoader] = useState(false)
    const [event, setEvent] = useState({})
    const [img, setImg] = useState()
    const imgRef = useRef()
    const [file, setFile] = useState();

    const uplImg = () => {
        imgRef.current.click();
    }

    const pickDatas = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value })
    }

    const [snackOpen, setSnackOpen] = useState(false)
    const [snackText, setSnackText] = useState('')
    const [snackPriority, setSnackPriority] = useState('')

    const closeSnack = () => {
        setSnackOpen(false)
    }

    const editEvent = async () => {
        setLoading(true)
        const formData = new FormData()
        formData.append('name', event.name ? event.name : events?.name)
        formData.append('topic', event.topic ? event.topic : events?.topic)
        formData.append('date', event.date ? event.date : events?.date)
        formData.append('place', event.place ? event.place : events?.place)
        formData.append('number_of_seats', event.number_of_seats ? event.number_of_seats : events?.number_of_seats)
        formData.append('ticket_price', event.price ? event.price : events?.ticket_price)
        formData.append('currency', event.currency ? event.currency : events?.currency)
        img ? formData.append('thumbnail', img) : null
        formData.append('description', event.description ? event.description : events?.description)

        await axios.put(`http://127.0.0.1:8000/events/${events?.id}/update/`, formData, {
            headers: {
                'Content-Type': 'multiple/formdata',
                'Accept': 'application/json',
                'X-CSRFTOKEN': 'zgu9hSqg0Lj6UprTnjIlYJWgNbFNcyMzJRRY5UwNgMX0H9jVHHtjjeVfOwwcAHgB',
                'Authorization': 'Basic bXVyb2RAZ21haWwuY29tOm11cm9kMTIz'
            }
        })
            .then(res => {
                const [first] = Object.values(res.data)
                setSnackOpen(true)
                setSnackText('Event successfully updated')
                setSnackPriority('success')
                setLoader(true)
                setTimeout(()=>{
                    setLoader(false)
                    router.push(`/event/${events?.id}`)
                }, 1000)
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
        <div className='create'>
            {loader && <Loader />}
            <h2>Edit event</h2>
            <Snackbar open={snackOpen} priority={snackPriority} text={snackText} close={closeSnack} />

            <div className="register__field image">
                {file ? (
                    <Image src={file} alt='event image' width={350} height={200} quality={100} />
                ) : (
                    <Image src={events?.thumbnail} alt='event image' width={350} height={200} quality={100} />
                )}
                <p onClick={uplImg}>Upload <FontAwesomeIcon icon={faUpload} /> </p>
                <input hidden ref={imgRef}
                    onChange={(e) => {
                        setImg(e.target.files[0])
                        const files = e.target.files;
                        if (files && files.length > 0) {
                            const selectedFile = files[0];
                            if (typeof window !== 'undefined') {
                                const url = URL.createObjectURL(selectedFile);
                                setFile(url);
                            }
                        } else {
                            console.log('No file selected or selection canceled');
                        }

                    }}
                    name='thumbnail' type="file" required />
            </div>
            <div className="register__field">
                <label>Name</label>
                <input onChange={(e) => pickDatas(e)} defaultValue={events?.name} name='name' type="text" placeholder='Name of the event' />
            </div>
            <div className="register__field">
                <label>Topic</label>
                <select onChange={(e) => pickDatas(e)} defaultValue={events?.topic} name="topic">
                    <option value="" disabled>Select Topic</option>
                    <option value="Information Technologies">Information Technologies</option>
                    <option value="Science">Science</option>
                    <option value="Biology">Biology</option>
                    <option value="Bussiness">Bussiness</option>
                    <option value="Marketing">Marketing</option>
                </select>
            </div>
            <div className="register__field">
                <label>Date</label>
                <input defaultValue={events?.date} onChange={(e) => pickDatas(e)} name='date' type="datetime-local" placeholder='Place of Event' required />
            </div>
            <div className="register__field">
                <label>Place</label>
                <input defaultValue={events?.place} onChange={(e) => pickDatas(e)} name='place' type="text" placeholder='Place of Event' required />
            </div>
            <div className="register__field">
                <label>Number of seats</label>
                <input defaultValue={events?.number_of_seats} min={10} onChange={(e) => pickDatas(e)} name='number_of_seats' type="number" placeholder='Number of seats' />
            </div>
            <div className="register__field">
                <label>Price</label>
                <input value={parseInt(events?.ticket_price).toFixed(0)} min={1} onChange={(e) => pickDatas(e)} name='price' type="number" placeholder='Price' />
            </div>
            <div className="register__field">
                <label>Currency</label>
                <select defaultValue={events?.currency} onChange={(e) => pickDatas(e)} name="currency">
                    <option value="" disabled>Select Topic</option>
                    <option value="USD">US Dollar</option>
                    <option value="UZS">So&apos;m</option>
                    <option value="PLN">Zloty</option>
                    <option value="RUB">Rubl</option>
                </select>
                {/* <input onChange={(e) => pickDatas(e)} name='last_name' type="text" placeholder='Last Name' /> */}
            </div>

            <div className="register__field">
                <label>Description</label>
                <textarea defaultValue={events?.description} onChange={(e) => pickDatas(e)} name="description" cols="30" rows="10"></textarea>
            </div>

            <div className="register__field">
                {loading ?
                    <button ><Loading /></button> :
                    <button onClick={editEvent}>Submit</button>
                }
            </div>
        </div>
    )
}
