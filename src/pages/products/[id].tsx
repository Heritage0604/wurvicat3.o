import { Flex,Image,Text,SimpleGrid,Grid,Link,Input,Box } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import { Product, productState } from '@/atoms/Products';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/firebase/firebase';
import { GetServerSidePropsContext } from 'next';
import NotFound from '../404';
import SingleProduct from '@/components/SingleProduct';
import Footer from '@/components/Footer';





type Props = {
    productData:Product
};

const ProductPage:React.FC<Props> = ({productData}) => {

    

 if(!productData ){

        return (
            <>
           
            <NotFound/>
            </>
            )
        }
    return (
        <div className=' h-screen overflow-x-hidden'>
           <SingleProduct productData={productData}/>
           <Footer/>
        </div>
    )
}
export default ProductPage;


export async function getServerSideProps(context:any) {
  

try{

if(typeof context.query.id==="string"){
      const productDocRef = doc(
        db,
      "products",
      context.query.id as string
    );
const productDoc = await getDoc(productDocRef );

  return {
      props: {
        productData: productDoc.exists()
          ?
            JSON.parse(JSON.stringify({ id: productDoc.id, ...productDoc.data() }))  // needed for dates
            
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
        communityData:""
      }
    }
  }