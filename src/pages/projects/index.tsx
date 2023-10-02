import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '@/firebase/firebase';
import Footer from '@/components/Footer';
import Projects from '@/components/Projects';

type indexProps = {
    projectData:any
};


const Index:React.FC<indexProps> = ({projectData}) => {
    
    return <div>
        <Projects projectData={projectData}/>
        <Footer/>
    </div>
}
export default Index;



export async function getServerSideProps(context: GetServerSidePropsContext) {

  let projectList=new Array()

  try {
      const projectsQuery = query(
        collection(db, "projects"),
        where("creatorId", "!=", "hello"),
        
      );
      const projectDocs = await getDocs(projectsQuery);
      const comments = projectDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
     
      projectList.push(comments)
    //   console.log(productList)
      



   return {
      props: {
        projectData:JSON.parse(JSON.stringify(comments))
      },
    }
  } catch (error) {
  
    // Could create error page here
    console.log("getServerSideProps error - [community]", error);
    console.log("it was an errrrororoor")
    
    return{
      props:{
        projectData:""
      }
    }
  }
}