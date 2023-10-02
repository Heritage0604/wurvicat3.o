'use client'

import AdminNavbar from '@/components/AdminNavbar'
import TableAdminComponent from '@/components/TableAdminComponent'
import TotalItems from '@/components/TotalItems'
import React,{useEffect,useState} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import DashBoardLoader from '@/components/DashBoardLoader'
import { Flex } from '@chakra-ui/react'
import { authModalState } from "@/atoms/authModalAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ResetPassword from '@/components/ResetPassword';
import { auth, db } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';

const Index = () => {
   const authModal = useRecoilValue(authModalState);
const [pageLoading, setPageLoading] = useState(true);
	const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
		if (loading && !user) {
			return
		};
    if(loading==false && !user){
      router.push("/")
    }
		
	}, [user, router, loading]);

	

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