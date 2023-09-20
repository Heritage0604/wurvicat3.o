import React from 'react'
import AdminNavbar from '@/components/AdminNavbar'
import ProjectsDashboard from '@/components/ProjectsDashboard'
const newprojects = () => {
  return (
    <div className='bg-slate-100 w-screen h-screen overflow-x-hidden'>
      <AdminNavbar/>
      <ProjectsDashboard/>
    </div>
  )
}

export default newprojects