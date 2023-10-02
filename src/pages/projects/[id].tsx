import { Flex,Image,Text,SimpleGrid,Grid,Link,Input,Box } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/firebase/firebase';
import { GetServerSidePropsContext } from 'next';
import NotFound from '../404';
import Footer from '@/components/Footer';
import SingleProject from '@/components/SingleProject';

type idProps = {
    projectData:any
    
};

const Index:React.FC<idProps> = ({projectData}) => {
    return (
        <div>
            <SingleProject projectData={projectData}/>
            <Footer/>
        </div>
    )
}
export default Index;





export async function getServerSideProps(context:GetServerSidePropsContext) {
  

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