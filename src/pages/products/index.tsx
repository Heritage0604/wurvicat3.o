import Products from '@/components/Products';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '@/firebase/firebase';
import { Product } from '@/atoms/Products';
import Footer from '@/components/Footer';

type indexProps = {
    productData:any
};

const Index:React.FC<indexProps> = ({productData}) => {
    
    return <div>
        <Products productData={productData}/>
        <Footer/>
    </div>
}
export default Index;


export async function getServerSideProps(context: GetServerSidePropsContext) {

  let productList=new Array()

  try {
      const productsQuery = query(
        collection(db, "products"),
        where("creatorId", "!=", "hello"),
        
      );
      const productDocs = await getDocs(productsQuery);
      const comments = productDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
     
      productList.push(comments)
    //   console.log(productList)
      



   return {
      props: {
        productData:JSON.parse(JSON.stringify(comments))
      },
    }
  } catch (error) {
  
    // Could create error page here
    console.log("getServerSideProps error - [community]", error);
    console.log("it was an errrrororoor")
    
    return{
      props:{
        productData:""
      }
    }
  }
}