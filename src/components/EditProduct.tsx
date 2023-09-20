import { adminUserState } from '@/atoms/AdminUser'
import { Product, props } from '@/atoms/Products'
import { auth,db, storage } from '@/firebase/firebase'
import { Flex,Text,Image,Input,Textarea,Button,Stack,Icon } from '@chakra-ui/react'
import React,{useEffect,useState,useRef} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import{MdOutlineCancel}from "react-icons/md"
import { useRecoilState } from 'recoil'
import { getDoc,doc ,updateDoc, arrayUnion, deleteField, arrayRemove} from 'firebase/firestore';
import { collection, addDoc,Timestamp } from "firebase/firestore";
import {toast} from "react-toastify" 
import { useRouter } from 'next/router'
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage'

type EditProductProps = {
    productData:Product
};

const ReactQuill = dynamic(import('react-quill'), { ssr: false })

const EditorModule = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
 clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link',
  ];

const EditProduct:React.FC<EditProductProps> = ({productData}) => {


    const[name,setName]=useState("")
    const [value, setValue] = useState('');
    const quillRef = useRef<any>(null);
    const[description,setDescription]=useState("")
    const[price,setPrice]=useState("")
    const[category,setCategory]=useState("")
    const[error,setError]=useState("")
    const [file, setFile] = useState<props[]>([]);
    const [deleteFile, setDeleteFile] = useState<number[]>([]);
    const regex = /^\s*$/;
    const [user, loading, errorUser] = useAuthState(auth);
    const[userValue,setUserValue]=useRecoilState(adminUserState)
    
    const[editor,setEditor]=useState("")
    const router=useRouter()


const sanitizedHTML = description.trim().replace(/<p><br><\/p>/g, '')


   const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if(file.length >= 5 ){
        return
    }
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setFile((prevImage)=>[...prevImage,{image:readerEvent.target?.result as string,id:Date.now() as number}]);
      }
    };
  };
  
  const onRemoveImage=(id:number)=>{
    setDeleteFile((prevId)=>[...prevId,id])
setFile((prevImage)=>prevImage.filter((item)=>item.id != id))

  }

const handleSubmit= async()=>{
    ;
      
        if (regex.test(name) ||  regex.test(price) ||  regex.test(category) ||  sanitizedHTML == ''  ){
      // Empty string
       setError('Input values can not be  empty');
     alert("Input values can not be  empty")
    setTimeout(()=>{
setError("")
    },8000)
     return
    }
try{

const productData2:any={
    name,
    category,
    description,
    price,
    
   
}
const productRef = doc(db, "products", `${router.query.id}`)
await updateDoc(productRef,productData2);

       if(deleteFile){
            deleteFile.map(async (id)=>{
                // Create a reference to the file to delete
            const desertRef = ref(storage, `products/${id}/image`);
            const downloadURL =   await getDownloadURL(desertRef)

            deleteObject(desertRef).then(() => {
                      updateDoc(doc(db, "products", `${router.query.id}`), {
       imageURL: arrayRemove({id:id,image:downloadURL})
      });
            }).catch((error) => {
  throw new Error('an error occured')
            });
            })
        }

//    update new images
if(file.length>0){
file.map(async (img,index)=>{
   const imageRef = ref(storage, `products/${img.id}/image`);
      await uploadString(imageRef, img.image, "data_url");
      const downloadURL =   await getDownloadURL(imageRef);
      await updateDoc(doc(db, "products", `${router.query.id}`), {
       imageURL: arrayUnion({id:img.id,image:downloadURL})
      });
     
})
}


toast.success("Product Created Successfully",{position:"top-center",autoClose:1500,theme:"light"})
router.push('/admin/products')
}
catch(e:any){
toast.error("An Error Ocurred",{position:"top-center",autoClose:1500,theme:"light"})

}


}


const  getUser= async(id:any)=>{
 const docRef = doc(db, "Admin", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  const userData:any=docSnap.data()
setUserValue(userData)
setName(productData.name)
setDescription(productData.description)
setPrice(productData.price)
setCategory(productData.category)
if(productData.imageURL){
setFile(productData!.imageURL)

}


 
} else {
 
}
    }
    
useEffect(()=>{
if(user){
 getUser(user.email)
}

},[user])


    return (
         <Flex   position='relative' mt={"15vh"} justify='center' align='center'>

<Flex bg='white'  justify='space-around' mb={"10vh"} flexDirection={{base:"column",lg:'row'}} boxShadow='md' p='6' rounded='md' width={{base:"85%",md:"70%"}}>

    {/* product name,price,category and images */}
<Flex flexDir='column'  width={{base:'100%',lg:"50%"}}>

<Flex flexDir='column'>
        <Text ml={"1px"} mb={"5px"}>Product Name</Text>
<Input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Product Name'/>
</Flex>

<Flex mt='20px' flexDir='column'>
        <Text  ml={"1px"} mb={"5px"}>Price</Text>
<Input type="number" inputMode="numeric" value={price} onChange={(e)=>setPrice(e.target.value)}  placeholder='Product Price'/>
</Flex>

<Flex mt='20px' flexDir='column'>
        <Text ml={"1px"} mb={"5px"}>Category</Text>
<Input  value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='Product Category'/>
</Flex>


<Flex flexWrap={"wrap"} width={"100%"} mt={"10px"}>
   <label   className='w-[90px] h-20 cursor-pointer bg-gray-300 text-sm text-gray-500 rounded-lg border flex justify-center items-center'>
     
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-1 mr-1 w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>
     Upload
<input type="file" className='hidden' accept="image/*" onChange={onSelectImage} />

        </label>
       {file.length>0 ?"": <Flex mt={"20px"} ml={"10px"}>
          <Text>No Photos Uploaded</Text>
        </Flex>}
        
        {file.map((img,index)=>{
         
            return(
              <Stack key={img?.id} direction='row' position="relative">
  <Image

  position="relative"
  ml={"10px"}
  mt="10px"
  borderRadius={"10px"}
    boxSize='68px' 
    objectFit='cover'
    src={img?.image}
    alt='Dan Abramov'
  />
 <Icon onClick={()=>onRemoveImage(img.id)}  as={MdOutlineCancel} cursor={"pointer"} color={'red.500'} fontSize={"22px"} position="absolute" right={"0px"} top={"8px"}/>



</Stack>
            )
        })}
        </Flex>


</Flex>


{/* description textarea */}
<Flex  ml={{base:'0',lg:"10vw"}} width={{base:'100%',lg:"40%"}} flexDir='column' mt={{base:"5vh",lg:"0"}}>
    <Text>Product Description</Text>
  <ReactQuill value={description} 
  className='h-[300px] mb-12 lg:h-[400px] w-full'
 onChange={setDescription} placeholder="Product description"
 modules={EditorModule}  formats={formats}
 theme="snow" />

    <Flex mt={"10vh"} justify='flex-end' >
        <Button onClick={handleSubmit} color='white'  colorScheme='blue' mr={"30px"}>Submit</Button>
        <Button variant="outline" onClick={()=>router.push('/admin/products')}  colorScheme='red' >Cancel</Button> 
    </Flex>

</Flex>

   </Flex>
   </Flex>
    )}
export default EditProduct;