import { authModalState } from '@/atoms/authModalAtom'
import { Flex,Box,Image,Link,Icon,Text,Input,Button } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import {useSetRecoilState} from "recoil"
import {useRouter} from "next/navigation"
import { auth } from '@/firebase/firebase'
import {toast} from "react-toastify"
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'

const Login = () => {
     const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const setAuthModalState=useSetRecoilState(authModalState)
  const[errorSignup,setErrorSignup]=useState("")
   const router=useRouter()
   const [
  signInWithEmailAndPassword,
  user,
  loading,
  error,
] = useSignInWithEmailAndPassword(auth);
const regex = /^\s*$/;

const handleSubmit= async(e: React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()
      if (regex.test(email) ||  regex.test(password) ){
      // Empty string
       setErrorSignup('Input values can not be  empty');
     
    setTimeout(()=>{
setErrorSignup("")
    },8000)
     return
    }

    // try catch function
    try{
    const newUser= await signInWithEmailAndPassword(email,password)
         if(!newUser){
            
            throw new Error("")
    return
}
toast.success("Login Successfully",{position:"top-center",autoClose:1000,theme:"light"})
router.push("admin/dashboard")
    }
    catch(e:any){
toast.error("An error occured",{position:"top-center",autoClose:1500,theme:"light"})

    }
}

         const handleClick=()=>{
setAuthModalState((prev)=>({...prev,type:"register"}))
    }

            const handleClick2=()=>{
setAuthModalState((prev)=>({...prev,type:"forgotPassword"}))
    }



  return (
       <Flex width={{base:"85%",md:"50%"}} flexDirection={'column'} bg={'white'} p='6' boxShadow='xl' rounded={'md'}>
<Flex p='3' align='center' mb={"3vh"}>
            <Image boxSize="50px" src='/wurvicat.png' bg={"orange.500"} alt="wurvicat"/>
<Flex  ml={"10%"} flexDir='column'>
              <Text fontSize={"22px"} fontWeight={700}>Hey, hello 👋 <br/>  </Text>
<Text fontSize={"13px"} color={"gray"}>Enter the information you entered while registering</Text>
</Flex>
</Flex>
          <form onSubmit={handleSubmit}>
            <Input value={email} onChange={(e)=>setEmail(e.target.value)} variant='filled' placeholder="Email" type="email"/>
            <Input value={password} onChange={(e)=>setPassword(e.target.value)} variant='filled' placeholder="Password" mt={"3vh"} type="password"/>
            <Flex justify='space-between'   ml={"3px"} mt={"2vh"}>
              <Text color='red.500'>{errorSignup}</Text>
              <Text onClick={handleClick2} cursor='pointer' color='orange.500'>Forgot Password?</Text>
            </Flex>
            <Button type={'submit'} bg={"orange.500"} _hover={{bg:"orange.400"}} color='white' mt={"2vh"}>Log In</Button>
          </form>
          <Flex  align='center' mt={"2vh"}><Text color='gray' fontSize={"15px"}>Approved admins can create Account</Text> <Link onClick={handleClick} color='orange.500' ml={"2"}>Create Account</Link></Flex>
        </Flex>
  )
}

export default Login