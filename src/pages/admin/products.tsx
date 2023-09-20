import AdminNavbar from '@/components/AdminNavbar'
import ProductTable from '@/components/ProductTable'
import React from 'react'

const products = () => {
  return (
    <div className='bg-slate-100 w-screen h-screen overflow-x-hidden'>
        <AdminNavbar/>
        <ProductTable/>
    </div>
  )
}

export default products