"use client"

import Loading from '@/app/component/Loading'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import EventImage from '@/public/eventImage.jpg'
import Image from 'next/image'

export default function CreateEvent() {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
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

    const register = async (e) => {
        setLoading(true)
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', event.name)
        formData.append('topic', event.topic)
        formData.append('date', event.date)
        formData.append('place', event.place)
        formData.append('number_of_seats', event.number_of_seats)
        formData.append('ticket_price', event.price)
        formData.append('currency', event.currency)
        formData.append('thumbnail', img)
        formData.append('description', event.description)

        await axios.post('http://127.0.0.1:8000/events/create/', formData, {
            headers: {
                'Content-Type': 'multiple/formdata',
                'Accept': 'application/json',
                'X-CSRFTOKEN': 'zgu9hSqg0Lj6UprTnjIlYJWgNbFNcyMzJRRY5UwNgMX0H9jVHHtjjeVfOwwcAHgB',
                'Authorization': 'Basic bXVyb2RAZ21haWwuY29tOm11cm9kMTIz'
            }
        })
            .then(res => {
                const [first] = Object.values(res.data)
                if (res.status == 201) {
                    router.push('/')
                } else {
                    alert(first)
                }
            })
            .catch(err => {
                console.log(err);
            })
        setLoading(false)
    }

    return (
        <form className='create' onSubmit={(e) => register(e)}>
            <h2>Create event</h2>

            <div className="register__field image">
                {file ? (
                    <Image src={file} alt='event image' width={350} height={200} quality={100} />
                ) : (
                    <Image src={EventImage} alt='event image' width={350} quality={100} />
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
                <input onChange={(e) => pickDatas(e)} name='name' type="text" placeholder='Name of the event' />
            </div>
            <div className={event?.name ? "register__field" : "register__field hidden"}>
                <label>Topic</label>
                <select onChange={(e) => pickDatas(e)} name="topic">
                    <option value="" disabled selected>Select Topic</option>
                    <option value="Information Technologies">Information Technologies</option>
                    <option value="Science">Science</option>
                    <option value="Biology">Biology</option>
                    <option value="Bussiness">Bussiness</option>
                    <option value="Marketing">Marketing</option>
                </select>
            </div>
            <div className={event?.topic ? "register__field" : "register__field hidden"}>
                <label>Date</label>
                <input onChange={(e) => pickDatas(e)} name='date' type="datetime-local" placeholder='Place of Event' required />
            </div>
            <div className={event?.date ? "register__field" : "register__field hidden"}>
                <label>Place</label>
                <input onChange={(e) => pickDatas(e)} name='place' type="text" placeholder='Place of Event' required />
            </div>
            <div className={event?.place ? "register__field" : "register__field hidden"}>
                <label>Number of seats</label>
                <input min={10} onChange={(e) => pickDatas(e)} name='number_of_seats' type="number" placeholder='Number of seats' />
            </div>
            <div className={event?.number_of_seats ? "register__field" : "register__field hidden"}>
                <label>Price</label>
                <input min={1} onChange={(e) => pickDatas(e)} name='price' type="number" placeholder='Price' />
            </div>
            <div className={event?.price ? "register__field" : "register__field hidden"}>
                <label>Currency</label>
                <select onChange={(e) => pickDatas(e)} name="currency">
                    <option value="" disabled selected>Select Topic</option>
                    <option value="USD">US Dollar</option>
                    <option value="UZS">So&apos;m</option>
                    <option value="PLN">Zloty</option>
                    <option value="RUB">Rubl</option>
                </select>
                {/* <input onChange={(e) => pickDatas(e)} name='last_name' type="text" placeholder='Last Name' /> */}
            </div>

            <div className={event?.currency ? "register__field" : "register__field hidden"}>
                <label>Description</label>
                <textarea onChange={(e) => pickDatas(e)} name="description" cols="30" rows="10"></textarea>
            </div>

            <div className={event?.description ? "register__field" : "register__field hidden"}>
                {loading ?
                    <button type='submit'><Loading /></button> :
                    <button type='submit'>Submit</button>
                }
            </div>
        </form>
    )
}
