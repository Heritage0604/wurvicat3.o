
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import AdminNavbar from '@/components/AdminNavbar'
import ProfileDashboard from '@/components/ProfileDashboard';
import ProfileLoader from '@/components/ProfileLoader'
import React,{useEffect} from 'react'
import { auth, db } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';

type profileProps = {
    
};

const Profile:React.FC<profileProps> = () => {
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

    return <div className='bg-slate-100 w-screen h-screen overflow-x-hidden'>
           
            {user? (
          <>
      <AdminNavbar/>
            <ProfileDashboard/>
          </>
        ):(
          <div>
     <ProfileLoader/>
          </div>
        )}
    </div>
}
export default Profile;