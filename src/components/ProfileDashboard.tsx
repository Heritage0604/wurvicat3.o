import { db ,auth, storage} from '@/firebase/firebase';
import { Flex,Text,Image,Icon,Input, Textarea,Stack } from '@chakra-ui/react';
import { getDoc,doc ,updateDoc, arrayUnion, deleteField} from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React,{useState,useEffect,useRef} from 'react';
import {FaUserAlt} from "react-icons/fa"
import {MdOutlineCancel} from "react-icons/md"
import { useAuthState } from "react-firebase-hooks/auth";
import { AdminUser, adminUserState } from '@/atoms/AdminUser';
import {toast} from "react-toastify" 
import { useRecoilBridgeAcrossReactRoots_UNSTABLE, useRecoilState } from 'recoil';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';


type ProfileDashboardProps = {
    
};

type props={
  image:string;
  id:string
}

const ProfileDashboard:React.FC<ProfileDashboardProps> = () => {

    const[firstName,setFirstName]=useState("")
    const [user, loading, error] = useAuthState(auth);
    const[lastName,setLastName]=useState("")
    const[phoneNumber,setPhoneNumber]=useState<any>("")
    const[userName,setUserName]=useState("")
    const[email,setEmail]=useState("")
    const[location,setLocation]=useState("")
    const[image,setImage]=useState("")
    const [file, setFile] = useState<props[]>([]);
    const[userValue,setUserValue]=useRecoilState(adminUserState)
    
    

    const  getUser= async(id:any)=>{
 const docRef = doc(db, "Admin", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  const userData:any=docSnap.data()

  if(userData.location){
    setLocation(userData.location)
  }
  if(userData.phoneNumber){
    setPhoneNumber(userData.phoneNumber)
  }
  if(userData.file){
     setFile(userData.file)
  }
  setUserValue(userData)
  setFirstName(userData.firstName)
  setLastName(userData.lastName)
  setEmail(userData.email)
  setUserName(userData.userName)
 
} else {
 
}
    }
    
useEffect(()=>{
if(user){
 getUser(user.email)
}

},[user,loading,error])

      const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if(file.length >= 1 ){
        return
    }
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setFile((prevImage)=>[...prevImage,{image:readerEvent.target?.result as string,id:email}]);
      }
    };
  };
  
  const onRemoveImage=(id:string)=>{
setFile((prevImage)=>prevImage.filter((item)=>item.id != id))
  }


  const handleSubmit=async(id:string)=>{
const docRef = doc(db, "Admin", id);
try{
   updateDoc(docRef, {
    file: deleteField()
});

const desertRef = ref(storage, `admin/${email}/image`);

// Delete the file
deleteObject(desertRef).then(() => {
  // File deleted successfully
}).catch((error) => {
  // Uh-oh, an error occurred!
  console.log('empty user profile picture')
});

const updateData:AdminUser={
firstName,
lastName,
userName,
email,
phoneNumber,
location,
}
if(file.length > 0){
  file.map(async (img,index)=>{
   const imageRef = ref(storage, `admin/${img.id}/image`);
      await uploadString(imageRef, img.image, "data_url");
      const downloadURL =   await getDownloadURL(imageRef);
      await updateDoc(doc(db, "Admin", id), {
       file: arrayUnion({id:img.id,image:downloadURL})
      });
     
})
}

if(file.length == 0){
  if(userValue.file){
const imageRef = ref(storage, `admin/${email}/image`);
const cityRef = doc(db, 'Admin', id)
deleteObject(imageRef).then(() => {
  updateDoc(cityRef, {
    file: deleteField()
});
}).catch((error:any) => {
  throw new Error("an error occured")
})
  }

}
await updateDoc(docRef, updateData);
toast.success("Account Updated Successfully",{position:"top-center",autoClose:1500,theme:"light"})
 setUserValue({
    firstName,lastName,userName,email,location,phoneNumber,file
  })
}catch(e:any){
toast.error("An Error Ocurred",{position:"top-center",autoClose:1500,theme:"light"})
console.log(e.message)
}
  }

    return <Flex mt={"22vh"} mb={"10vh"} flexDir={{base:"column",lg:'row'}} align={{base:'center',lg:"flex-start"}} justify={{base:"center",lg:"space-around"}}  width={"100%"}>
<Flex flexDir={"column"}  width={{base:"85%",lg:"40%"}} position={'relative'} boxShadow='sm' p='6' rounded='md' bg='white'>
{file.length>0 ?  <Image
className='select-none'

  top={"-10"} left={"10"} position={'absolute'}
    borderRadius={"50%"}
    boxSize='100px' 
    border={"1px solid gray"}
    src={file[0].image}
    alt='Profile Picture'
  /> : <Icon bg='gray.300' top={"-10"} left={"10"} position={'absolute'} fontSize={"100px"} borderRadius={"50%"} p={"3"} border={"1px solid gray"} as={FaUserAlt}/>}
<Flex flexDir='column' mt={"10vh"}>
    <Text color={"gray"} mb={"2vh"}> <span className={'text-black'}>{userValue.firstName} {userValue.lastName}</span> / {userValue.email} </Text>
    <Text color={"gray"} mb={"2vh"}><span className={'text-black'}>UserName</span>  {userValue.userName} </Text>
    <Text color={"gray"} mb={"2vh"}><span className={'text-black'}>PhoneNumber</span> {userValue.phoneNumber} </Text>
    <Text color={"gray"} mb={"2vh"}><span className={'text-black'}>Location</span>  {userValue.location} </Text>
</Flex>
</Flex>

<Flex flexDir='column' mt={{base:"4vh",lg:'0'}} width={{base:"85%",lg:"40%"}} position={'relative'} boxShadow='sm' p='6' rounded='md' bg='white'>
  <Flex mb={"3vh"}>
     <Input mr={"5%"} variant='outline' value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder='FirstName' />
     <Input variant='outline' value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder='LastName' />
  </Flex>

   <Flex mb={"3vh"} >
     <Input mr={"5%"} value={email} onChange={(e)=>setEmail(e.target.value)} type={"email"} variant='outline' placeholder='Email' />
  <Input type="number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} inputMode="numeric"placeholder='PhoneNumber'   />
  </Flex>

   <Flex mb={"3vh"} >
     <Input variant='outline' value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder='UserName' />
    
  </Flex>

   <Flex  mb={'3vh'} >
       <label   className='w-[150px] mr-5 h-20 cursor-pointer bg-gray-300 text-sm text-gray-500 rounded-lg border flex justify-center items-center'>
     
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-1 mr-1 w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>
     Upload
<input onChange={onSelectImage} type="file" className='hidden' accept="image/*" />

        </label>
     <Textarea value={location} onChange={(e)=>setLocation(e.target.value)} variant='outline' placeholder='Location' />
  </Flex>


  <Flex>
    
     {file.length>0 ?"": <Flex mt={"20px"} ml={"10px"}>
         <Icon bg='gray.300'   fontSize={"100px"} borderRadius={"50%"} p={"3"} border={"1px solid gray"} as={FaUserAlt}/>
        </Flex>}
        
        {file.map((img,index)=>{
         
            return(
              <Stack  key={img?.id} direction='row' position="relative">
  <Image
className='select-none'
  position="relative"
  ml={"10px"}
  mt="10px"
  borderRadius={"10px"}
    boxSize='100px' 
    objectFit='cover'
    src={img?.image}
    alt='Dan Abramov'
  />
 <Icon onClick={()=>onRemoveImage(img.id)}  as={MdOutlineCancel} cursor={"pointer"} color={'red.500'} fontSize={"22px"} position="absolute" right={"0px"} top={"0px"}/>



</Stack>
            )
        })}
</Flex>


<Flex onClick={()=>handleSubmit(userValue.email)} mt={"2vh"} justify='flex-end'>
    <Text p={"2"} borderRadius={'5px'} bg={"blue.500"} cursor='pointer' color='white' _hover={{transform:"scale(1.1)",borderRadius:"7px"}} transition={"0.5s"} >Submit</Text>
</Flex>

</Flex>

    </Flex>
}
export default ProfileDashboard;


 