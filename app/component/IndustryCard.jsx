import Aos from 'aos';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function IndustryCard({ industry }) {

    useEffect(() => {
        Aos.init();
      }, [])

    return (
        <Link data-aos="fade-up" href={`/category/${industry.id}`} className="industries__card">
            <div>
                <Image src={industry.img} alt='event' width={400} height={200} quality={100} />
            </div>
            <h3>{industry.title}</h3>
        </Link>
    )
}
