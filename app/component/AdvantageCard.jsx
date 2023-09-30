import Aos from 'aos';
import Image from 'next/image'
import React, { useEffect } from 'react'

export default function AdvantageCard({ advantage }) {

    useEffect(() => {
        Aos.init();
      }, [])

    return (
        <div data-aos='fade-up' className="advantage__card" >
            <div className="advantage__card__img">
                <Image src={advantage?.img} alt='lowest' width={75} height={75} quality={100} />
            </div>
            <div className="advantage__card__infos">
                <h3>{advantage?.title}</h3>
                <p>{advantage?.description}</p>
            </div>
        </div>
    )
}
