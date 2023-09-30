import React from 'react'
import './../styles/loader.scss'

export default function Loading() {
    return (
        <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
