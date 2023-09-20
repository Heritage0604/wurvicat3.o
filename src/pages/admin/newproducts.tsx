import React from 'react'
import AdminNavbar from '@/components/AdminNavbar'
import AddProducts from '@/components/AddProducts'
const newproducts = () => {
  return (
    <div className='bg-slate-100 w-screen h-screen overflow-x-hidden'>
 <AdminNavbar/>
 <AddProducts/>
    </div>
  )
}

export default newproducts