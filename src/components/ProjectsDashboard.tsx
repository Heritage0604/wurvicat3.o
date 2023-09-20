import { adminUserState } from '@/atoms/AdminUser'
import { auth,db, storage } from '@/firebase/firebase'
import { Flex,Text,Image,Input,Textarea,Button,Stack,Icon } from '@chakra-ui/react'
import React,{useEffect,useState,useRef} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import{MdOutlineCancel}from "react-icons/md"
import { useRecoilState } from 'recoil'
import { getDoc,doc ,updateDoc, arrayUnion, deleteField} from 'firebase/firestore';
import { collection, addDoc,Timestamp } from "firebase/firestore";
import {toast} from "react-toastify" 
import { useRouter } from 'next/router'
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage'
import { props,Projects } from '@/atoms/Project'


const ReactQuill = dynamic(import('react-quill'), { ssr: false })
const EditorModule = {
toolbar: [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }], 
  ['link', 'video'],         // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];




const ProjectsDashboard = () => {
      const[description,setDescription]=useState("")
      const[title,setTitle]=useState("")
      const [file, setFile] = useState<props[]>([]);
      const router=useRouter()
      const [user, loading, errorUser] = useAuthState(auth);
      const[userValue,setUserValue]=useRecoilState(adminUserState)
      const[error,setError]=useState("")
      const regex = /^\s*$/;
      

const sanitizedHTML = description.trim().replace(/<p><br><\/p>/g, '')
        const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if(file.length >= 7 ){
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
      // test if the title and description is empty
        if (regex.test(title) ||  sanitizedHTML == ''  ){
      // Empty string
       setError('Input values can not be  empty');
     alert("Input values can not be  empty")
    setTimeout(()=>{
setError("")
    },8000)
     return
    }

    try{
const projectData:any={
    title,
    description,
    createdAt:Timestamp.fromDate(new Date()),
    creatorId:user?.email,
   
}
const docRef = await addDoc(collection(db, "projects"),projectData);

// update file images in the database
if(file.length>0){
  file.map(async (img,index)=>{
   const imageRef = ref(storage, `projects/${img.id}/image`);
      await uploadString(imageRef, img.image, "data_url");
      const downloadURL =   await getDownloadURL(imageRef);
      await updateDoc(doc(db, "projects", docRef.id), {
       imageURL: arrayUnion({id:img.id,image:downloadURL})
      });
     
})
}

toast.success("Project Created Successfully",{position:"top-center",autoClose:1500,theme:"light"})
router.push('/admin/projects')
    }
    catch(error:any){
      toast.error("An Error Ocurred",{position:"top-center",autoClose:1500,theme:"light"})
      
    }

}


const  getUser= async(id:any)=>{
 const docRef = doc(db, "Admin", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  const userData:any=docSnap.data()
setUserValue(userData)
}
 else {
 
}
    }
    
useEffect(()=>{
if(user){
 getUser(user.email)
}

},[user,loading,error])

  return (
    <Flex position='relative' mt={"15vh"} justify='center' align='center'>
<Flex bg='white'  justify='space-around' mb={"10vh"} flexDirection={{base:"column"}} boxShadow='md' p='6' rounded='md' width={{base:"85%",md:"70%"}}>

    {/* title of the project */}
    <Flex mb={"5vh"} width={{base:"100%",lg:"100%"}} flexDirection={{base:"column",lg:"row"}}>
<Input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Project Title'/>
    </Flex>

      {/* image upload and stack */}
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



{/* text-editor and submitand cancel button */}
<Flex mt={"5vh"}  width={{base:'100%',lg:"100%"}} flexDir='column' >
  <ReactQuill value={description} 
  className='h-[300px] mb-12 lg:h-[400px] w-full'
 onChange={setDescription} placeholder="Project description"
 modules={EditorModule}  formats={formats}
 theme="snow" />

    <Flex mt={{base:"15vh",lg:"10vh"}} justify='flex-end' >
        <Button onClick={handleSubmit} color='white'  colorScheme='blue' mr={"30px"}>Submit</Button>
        <Button onClick={()=>router.push('/admin/projects')} variant="outline"  colorScheme='red' >Cancel</Button> 
    </Flex>

</Flex>



</Flex>
    </Flex>
  )
}

export default ProjectsDashboard