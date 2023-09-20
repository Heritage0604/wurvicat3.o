import AboutHero from '@/components/AboutHero'
import AboutUs from '@/components/AboutUs'
import Footer from '@/components/Footer'
import Vision2 from '@/components/Vision2'

import React from 'react'

const about = () => {
  return (
<div className='bg-slate-50'>
<AboutHero imageurl={"/about.avif"} text={"About Us"}/>
<AboutUs/>
<Vision2/>
<Footer/>
</div>
    
  )
}

export default about