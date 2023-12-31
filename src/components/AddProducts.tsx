import { adminUserState } from '@/atoms/AdminUser'
import { Product, props } from '@/atoms/Products'
import { auth,db, storage } from '@/firebase/firebase'
import { Flex,Text,Image,Input,Textarea,Button,Stack,Icon ,useDisclosure} from '@chakra-ui/react'
import React,{useEffect,useState,useRef} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import{MdOutlineCancel}from "react-icons/md"
import { useRecoilState } from 'recoil'
import { getDoc,doc ,updateDoc, arrayUnion, getDocs} from 'firebase/firestore';
import { collection, addDoc,Timestamp } from "firebase/firestore";
import {toast} from "react-toastify" 
import { useRouter } from 'next/router'
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import {BsChevronDown} from "react-icons/bs"
import {AiOutlinePlus} from "react-icons/ai"


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

const AddProducts = () => {

    const[name,setName]=useState("")
    const [value, setValue] = useState('');
      const { isOpen, onOpen, onClose } = useDisclosure()
      
    const quillRef = useRef<any>(null);
    const[description,setDescription]=useState("")
    const[price,setPrice]=useState("")
    const[category,setCategory]=useState("")
    const[error,setError]=useState("")
    const [file, setFile] = useState<props[]>([]);
    const regex = /^\s*$/;
    const [user, loading, errorUser] = useAuthState(auth);
    const[userValue,setUserValue]=useRecoilState(adminUserState)
    const[editor,setEditor]=useState("")
    const router=useRouter()
    const [categories,setCategories]=useState<any>([])
    
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
setFile((prevImage)=>prevImage.filter((item)=>item.id != id))
  }

const handleSubmit= async()=>{
    ;
      
        if (regex.test(name) ||  regex.test(price)   ||  sanitizedHTML == ''   ){
      // Empty string
       setError('Input values can not be  empty');
     alert("Input values can not be  empty")
    setTimeout(()=>{
setError("")
    },8000)
     return
    }

    if(file.length <= 0){
         setError('Input values can not be  empty');
     alert("Please select at least 1 image")
    setTimeout(()=>{
setError("")
    },8000)
     return
    }


    if( regex.test(category)){
               setError('Input values can not be  empty');
     alert("Please select a category")
    setTimeout(()=>{
setError("")
    },8000)
     return
    }
try{

const productData:Product={
    name,
    category,
    description,
    price,
    createdAt:Timestamp.fromDate(new Date()),
    creatorId:user?.email,
    imageURL:[]
   
}
const docRef = await addDoc(collection(db, "products"),productData);

if(file.length>0){
  file.map(async (img,index)=>{
   const imageRef = ref(storage, `products/${img.id}/image`);
      await uploadString(imageRef, img.image, "data_url");
      const downloadURL =   await getDownloadURL(imageRef);
      await updateDoc(doc(db, "products", docRef.id), {
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

 
} else {
 
}
    }
    

     const getCategories=async()=>{
const querySnapshot = await getDocs(collection(db, "categories"));
   const comments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));;
      setCategories(comments)
    

}

useEffect(()=>{
if(user){
 getUser(user.email)
 getCategories()
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

<Flex mt='20px'  >
  <Menu>
  <MenuButton as={Button}>
    {category ? category :'Categories'}  <Icon fontWeight={600} as={BsChevronDown}/>
  </MenuButton>
  <MenuList>
    {categories.map((cat:any,index:number)=>{
      return(
        <MenuItem key={index} onClick={()=>setCategory(cat.category)}>{cat.category} </MenuItem>
      )
    })}
  
  </MenuList>
</Menu>
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
              <Stack key={index} direction='row' position="relative">
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
        <Button onClick={()=>router.push('/admin/products')} variant="outline"  colorScheme='red' >Cancel</Button> 
    </Flex>

</Flex>

   </Flex>


   <Modal
        onClose={onClose}
        // finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={'inside'}
        size='md'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Product Categories</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder='Add Categories'/>
            
          </ModalBody>
          <ModalFooter>
            <Button variant={'outline'} colorScheme='red' onClick={onClose}>Close</Button>
            <Button colorScheme='blue' ml='10px' onClick={onClose}>Add to Categories</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
   </Flex>
  )
}

export default AddProducts