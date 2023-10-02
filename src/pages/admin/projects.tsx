import AdminNavbar from '@/components/AdminNavbar'
import ProjectTable from '@/components/ProjectTable'
import React,{useEffect} from 'react'
import { auth, db } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import ProfileLoader from '@/components/ProfileLoader'
const projects = () => {
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
{user ? 
<>
<AdminNavbar/>
<ProjectTable/></> :<ProfileLoader/>}
    </div>
  )
}

export default projects