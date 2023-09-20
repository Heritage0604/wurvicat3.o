import { authModalState } from '@/atoms/authModalAtom'
import { Flex,Box,Image,Link,Icon,Text,Input,Button } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import {useSetRecoilState} from "recoil"
import {useRouter} from "next/navigation"

const ResetPassword = () => {
       const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const setAuthModalState=useSetRecoilState(authModalState)
   const router=useRouter()


   const handleSubmit= async(e: React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()
alert(email)
alert(password)
}

         const handleClick2=()=>{
setAuthModalState((prev)=>({...prev,type:"login"}))
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
          
            <Flex justify='space-between'   ml={"3px"} mt={"2vh"}>
              <Text color='red.500'></Text>
              <Text onClick={handleClick2} cursor='pointer' color='orange.500'>Log In</Text>
            </Flex>
            <Button type={'submit'} bg={"orange.500"} _hover={{bg:"orange.400"}} color='white' mt={"2vh"}>Submit</Button>
          </form>

        </Flex>
  )
}

export default ResetPassword