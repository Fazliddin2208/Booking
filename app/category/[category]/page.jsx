"use client"

import Category from '@/app/component/Category';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function CurrentCategory({ params }) {

    const [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/events/all/`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getSearchedData = async (e) => {
        const res = await axios.get(`http://127.0.0.1:8000/events/search/?search=${e.target.value}`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Category data={data} category={params.category} getSearchedData={getSearchedData} />
    )
}
