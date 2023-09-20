import AboutHero from '@/components/AboutHero';
import ClientList from '@/components/adminside/ClientList';
import Footer from '@/components/Footer';
import React from 'react';

type clientsProps = {
    
};

const clients:React.FC<clientsProps> = () => {
    
    return <div className='bg-slate-50'>
        <AboutHero imageurl="/client.avif" text="Clients & Partners"/>
        <ClientList/>
        <Footer/>
    </div>
}
export default clients;