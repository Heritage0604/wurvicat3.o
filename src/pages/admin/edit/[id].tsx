import { Product } from "@/atoms/Products";
import { auth, db } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import AdminNavbar from '@/components/AdminNavbar'
import EditProduct from '@/components/EditProduct'
import { collection, addDoc,getDoc, updateDoc, doc, arrayUnion } from "firebase/firestore"; 
import NotFound from "@/pages/404";
import ProfileLoader from '@/components/ProfileLoader'
import React,{useEffect} from 'react'


// pages/[slug].js
type Props = {
    productData:Product,
   
}
const DynamicPage:React.FC<Props> = ({ productData }) => {
    
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

    if(!productData ){

        return (
            <>
            <AdminNavbar/>
            <NotFound/>
            </>
            )
        }
  return (
    
    <div className='bg-slate-100 w-screen h-screen overflow-x-hidden'>
    {user ?<><AdminNavbar/>
    <EditProduct productData={productData}/></>:<ProfileLoader/>}
    </div>
  );
};

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
export default DynamicPage;
