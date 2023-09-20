import { auth } from '@/firebase/firebase'
import React,{useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import AdminNavbar from '@/components/AdminNavbar'
import ProfileDashboard from '@/components/ProfileDashboard';
import ProfileLoader from '@/components/ProfileLoader'

type profileProps = {
    
};

const Profile:React.FC<profileProps> = () => {
     const [user, loading, error] = useAuthState(auth);
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