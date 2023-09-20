import AboutHero from '@/components/AboutHero'
import Footer from '@/components/Footer'
import Loaction from '@/components/clientside/Loaction'
import React from 'react'

const Contact = () => {
  return (
    <div>
        <AboutHero imageurl='/contact-us.png' text="Contact Us"/>
        <Loaction/>
        <Footer/>
    </div>
  )
}

export default Contact