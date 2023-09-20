import React,{useEffect,useState} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db,storage } from '@/firebase/firebase';
import { collection,deleteDoc, getDocs,doc,serverTimestamp,Timestamp, query, where, orderBy } from "firebase/firestore";
import {useDisclosure,Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,MenuDivider,} from '@chakra-ui/react'
import { ref, deleteObject } from "firebase/storage";
import { BsPlus } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FiMoreHorizontal } from "react-icons/fi";
import { useRecoilState } from 'recoil';
import { productState,Product } from '@/atoms/Products';

type useProductsProps = {
    
};

const useProducts:React.FC<useProductsProps> = () => {
    const[user,loading,error]=useAuthState(auth)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [deleteProduct,setDeleteProduct]=useState<Product>()
    const[product,setProducts]=useState<Product[]>()
const getProducts = async () => {
    try {
      const productsQuery = query(
        collection(db, "products"),
        where("creatorId", "==", user?.email),
        
      );
      const productDocs = await getDocs(productsQuery);
      const comments:any = productDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

     setProducts(comments)
     return product
     
   

    } catch (error: any) {
      console.log("getPostComments error", error.message);
    }
  
  };

  useEffect(() => {
  

    getProducts();
  }, [user]);

 const onDeleteProduct = async (product:any)=>{
setDeleteProduct(product)
onOpen()
}
const deletingProduct=async()=>{
  try{
  await deleteDoc(doc(db, "products", deleteProduct!.id));
  onClose()
    setProducts((prevImage:any)=>prevImage.filter((item:any)=>item.id != deleteProduct!.id))
return product
   alert('it worked')   

 
 
}catch(err){
 alert('an error occured')
}
}

const onEditProduct=async(product:any)=>{
setEditProduct(product)
 router.push(`/seller/edit/${product.id}`)
}

    return <div>Have a good coding</div>
}
export default useProducts;