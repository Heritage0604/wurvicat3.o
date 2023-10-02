import {auth,storage, db } from "@/firebase/firebase";
import { collection, addDoc,getDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { Projects } from "@/atoms/Project"
import AdminNavbar from '@/components/AdminNavbar'
import NotFound from "@/pages/404";
import EditProject from '@/components/EditProject';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import ProfileLoader from '@/components/ProfileLoader'
import React,{useEffect} from 'react'

type Props = {
    projectData:Projects,
   
}

const EditProjects:React.FC<Props> = ({projectData}) => {

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


if(!projectData ){

        return (
            <>
            <AdminNavbar/>
            <NotFound/>
            </>
            )
        }

  return (
    <div>
   {user ? <>
        <AdminNavbar/>
        <EditProject projectData={projectData}/>
   </> :<ProfileLoader/>}
    </div>
  )
}

export default EditProjects


export async function getServerSideProps(context:any) {
  

try{

if(typeof context.query.id==="string"){
      const projectDocRef = doc(
        db,
      "projects",
      context.query.id as string
    );
const projectDoc = await getDoc(projectDocRef );

  return {
      props: {
        projectData: projectDoc.exists()
          ?
            JSON.parse(JSON.stringify({ id: projectDoc.id, ...projectDoc.data() }))  // needed for dates
            
          : "",
      },
    }
}

}
catch(err:any){
    console.log(err.message)
    console.log("error")
}
    
    return{
      props:{
        projectData:""
      }
    }
  }