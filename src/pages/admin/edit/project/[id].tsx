import React from 'react'
import {auth,storage, db } from "@/firebase/firebase";
import { collection, addDoc,getDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { Projects } from "@/atoms/Project"
import AdminNavbar from '@/components/AdminNavbar'
import NotFound from "@/pages/404";
import EditProject from '@/components/EditProject';

type Props = {
    projectData:Projects,
   
}

const EditProjects:React.FC<Props> = ({projectData}) => {

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
        <AdminNavbar/>
        <EditProject projectData={projectData}/>
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