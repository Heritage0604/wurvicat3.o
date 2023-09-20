'use client'

import AdminNavbar from '@/components/AdminNavbar'
import TableAdminComponent from '@/components/TableAdminComponent'
import TotalItems from '@/components/TotalItems'
import { auth } from '@/firebase/firebase'
import React,{useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import DashBoardLoader from '@/components/DashBoardLoader'

const Index = () => {
   const [user, loading, error] = useAuthState(auth);
   

  return (
    <div className='bg-slate-100 w-screen h-screen overflow-x-hidden'>
        {user ? (
          <>
          <AdminNavbar/>
        <TotalItems/>
        <TableAdminComponent/>
          </>
        ):(
          <div>
     <DashBoardLoader/>
          </div>
        )}
 
    </div>
  )
}

export default Index