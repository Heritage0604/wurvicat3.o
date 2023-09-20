import { authModalState } from '@/atoms/authModalAtom'
import { Flex,Box,Image,Link,Icon,Text,Input,Button } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import {useSetRecoilState} from "recoil"
import {useRouter} from "next/navigation"
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth,db,storage } from '@/firebase/firebase'
import { setDoc,doc } from 'firebase/firestore'
import {toast} from "react-toastify" 
import { AdminUser } from '@/atoms/AdminUser'

const Signup = () => {
        const[userName,setUserName]=useState("")
        const[firstName,setFirstName]=useState("")
        const[lastName,setLastName]=useState("")
        const[errorSignup,setErrorSignup]=useState("")
        const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
   const regex = /^\s*$/;
  const setAuthModalState=useSetRecoilState(authModalState)
   const router=useRouter()
    const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

const handleSubmit= async(e: React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()
        if (regex.test(email) ||  regex.test(password) ||  regex.test(firstName) ||  regex.test(lastName) ||  regex.test(userName ) ){
      // Empty string
       setErrorSignup('Input values can not be  empty');
     
    setTimeout(()=>{
setErrorSignup("")
    },8000)
     return
    }


    //try catch function
    try{

 const newuser=await createUserWithEmailAndPassword(email, password)
if(!newuser){
    throw new Error("An error occured")
}

toast.success("Account Created Successfully",{position:"top-center",autoClose:1500,theme:"light"})
// router.push("admin/profile")
    } catch(e:any){
toast.error("An error occured",{position:"top-center",autoClose:1500,theme:"light"})
    }
}

         const handleClick=()=>{
setAuthModalState((prev)=>({...prev,type:"login"}))
    }
    

const createUserDocument= async(userid:string)=>{
 setDoc(doc(db, "Admin", userid), {
firstName,
lastName,
email,
userName
});
 }

useEffect(()=>{
if(user){
  createUserDocument(email)
}
},[user])

  return (
     <Flex width={{base:"85%",md:"50%"}} flexDirection={'column'} bg={'white'} p='6' boxShadow='xl' rounded={'md'}>
<Flex p='3' align='center' mb={"3vh"}>
            <Image boxSize="50px" src='/wurvicat.png' bg={"orange.500"} alt="wurvicat"/>
<Flex  ml={"10%"} flexDir='column'>
              <Text fontSize={"22px"} fontWeight={700}>Hey, hello 👋 <br/>  </Text>
<Text fontSize={"13px"} color={"gray"}>Enter the following  information  while registering</Text>
</Flex>
</Flex>
          <form onSubmit={handleSubmit}>
            <Input value={firstName} onChange={(e)=>setFirstName(e.target.value)} variant='filled' placeholder="FirstName"  mt={"3vh"} type="text"/>
            <Input value={lastName} onChange={(e)=>setLastName(e.target.value)} variant='filled' placeholder="LastName"  mt={"3vh"} type="text"/>
            <Input value={userName} onChange={(e)=>setUserName(e.target.value)} variant='filled' placeholder="UserName"  mt={"3vh"} type="text"/>
            <Input value={email} onChange={(e)=>setEmail(e.target.value)} variant='filled' placeholder="Email"  mt={"3vh"} type="email"/>
            <Input value={password} onChange={(e)=>setPassword(e.target.value)} variant='filled' placeholder="Password" mt={"3vh"} type="password"/>
            <Flex justify='space-between'   ml={"3px"} mt={"2vh"}>
              <Text color='red.500'>{errorSignup}</Text>
             
            </Flex>
            <Button type={'submit'} bg={"orange.500"} _hover={{bg:"orange.400"}} color='white' mt={"2vh"}>Sign Up</Button>
          </form>
         <Flex   align='center' mt={"2vh"}><Text color='gray' fontSize={"15px"}>Already have an Account</Text> <Link onClick={handleClick} color='orange.500' ml={"2"}>Log In</Link></Flex>
        </Flex>
  )
}

export default Signup