import React from 'react'
import AdminNavbar from '@/components/AdminNavbar'
import ProjectTable from '@/components/ProjectTable'
const projects = () => {
  return (
    <div className='bg-slate-100 w-screen h-screen overflow-x-hidden'>
<AdminNavbar/>
<ProjectTable/>
    </div>
  )
}

export default projects