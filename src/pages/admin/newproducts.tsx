import React,{useEffect} from 'react'
import AdminNavbar from '@/components/AdminNavbar'
import AddProducts from '@/components/AddProducts'
import { auth, db } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import ProfileLoader from '@/components/ProfileLoader'
const Newproducts = () => {
 const [user, loading, error] = useAuthState(auth);
 	const router = useRouter();

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
      {user?<>
       <AdminNavbar/>
 <AddProducts/>
      </>:<>
      <ProfileLoader/>
      </>}

    </div>
  )
}

export default Newproducts