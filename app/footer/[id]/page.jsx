import About from '@/app/component/About';
import React from 'react'
import '@/app/styles/footer.scss'
import WhyUs from '@/app/component/WhyUs';

export default function Footer({ params }) {
  return (
    <div>
      {params.id == 2 ?
        <WhyUs /> : <About />
      }
    </div>
  )
}
