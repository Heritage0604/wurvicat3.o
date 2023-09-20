import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import ReachOut from '@/components/ReachOut'
import RecentProjects from '@/components/RecentProjects'
import Service from '@/components/Service'
import Vision from '@/components/Vision'
import Image from 'next/image'


export default function Home() {
  return (
    <div className='bg-slate-50'>
    <Hero/>
    <Service/>
    <Vision/>
    <RecentProjects/>
    <ReachOut/>
    <Footer/>
    </div>
  )
}
