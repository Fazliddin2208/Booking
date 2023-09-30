'use client'

import EditEvent from '@/app/component/EditEvent'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Edit({ params }) {

  const router = useRouter()

  const deleteEvent = async () => {
    axios.delete(`http://127.0.0.1:8000/events/${parseInt(params.id)}/delete/`, {
      headers: {
        'Content-Type': 'multiple/formdata',
        'Accept': 'application/json',
        'X-CSRFTOKEN': 'zgu9hSqg0Lj6UprTnjIlYJWgNbFNcyMzJRRY5UwNgMX0H9jVHHtjjeVfOwwcAHgB',
        'Authorization': 'Basic bXVyb2RAZ21haWwuY29tOm11cm9kMTIz'
      }
    })
      .then(res => {
        router.push('/')
        
      })
      .catch(err => {
        console.log(err);
      })
  }

  const [event, setEvent] = useState({})

  useEffect(()=>{
    getEvent()
  }, [])

  const getEvent = async () => {
    axios.get('http://127.0.0.1:8000/events/all/')
      .then(res => {
        const arr = []
        res?.data?.map(data => {
          if (data.id == params.id) {
            setEvent(data)
          }
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  console.log(event);

  return (
    <div className='one_event__edit'>
      <div className="one_event__edit__top">
        <Link href={`/event/${params.id}`} >
          <h3>Return to event</h3>
        </Link>
        <button onClick={deleteEvent}>Delete <FontAwesomeIcon icon={faTrash} /></button>
      </div>
      <EditEvent events={event} />
    </div>
  )
}
