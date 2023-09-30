import React from 'react'
import '@/app/styles/profile.scss'
import ProfileSidebar from '@/app/component/ProfileSidebar'
import Account from '@/app/component/Account'
import Reservations from '@/app/component/Reservations';

export default function Profile({ params }) {
    return (
        <div className='profile'>
            <ProfileSidebar slug={params.slug} />
            {params.slug == 'reservation' ?
                <Reservations /> : <Account />
            }
        </div>
    )
}
