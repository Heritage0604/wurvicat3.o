import { Flex,Text,Input,Button,Link,Textarea } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {toast} from "react-toastify"

type Props={
    ProductData:any
}
const CheckOut:React.FC<Props> = ({ProductData}) => {

  const[name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [location,setLocation]=useState('')
  const[phoneNumber,setPhoneNumber]=useState('')
  const[errorSignup,setErrorSignup]=useState("")
  const[productName,setProductName]=useState<string[]>([])
  const regex = /^\s*$/;
  
  useEffect(()=>{
ProductData.map((data:any)=>{
setProductName((prev)=>[...prev,data.name])
})
  },[])




    const handleSubmit = async () => {

             if (regex.test(email) ||  regex.test(name) || regex.test(location) || regex.test(phoneNumber) ){
      // Empty string
       setErrorSignup('Input values can not be  empty');
     
    setTimeout(()=>{
setErrorSignup("")
    },8000)
     return
    }
    const info=productName
    console.log(info)
    const name1 = 'John';
const message = `Hello ${name1}!\nWelcome to our website.\nWe hope you have a great day!`;

console.log(message);
    const formData={
        to:'adegbiteheritage6@gmail.com',
        subject:'An Email of Purchase',
        body:`Dear Wurvicat International Limited ,\nI hope this email finds you well. My name is ${name} and I would like to place an order for some items from your store. Below are my details:\n Name:${name}\nEmail:${email}\nPhone Number:${phoneNumber}\nLocation:${location}\nOrder Details:\n${productName.toString()}\nPlease let me know the total cost, including any applicable taxes or shipping fees. Additionally, kindly provide information on payment methods and any available discounts or promotions.\nI would appreciate it if you could confirm the availability of the requested items and provide an estimated delivery date.\nThank you for your prompt attention to this matter. I look forward to hearing from you soon.\n
          `
    }
    console.log(formData)
    
    try {
      const response = await axios.post('/api/sendEmail', formData);
      toast.success("Checkout Successful",{position:"top-center",autoClose:1000,theme:"light"})
    } catch (error) {
      console.error('Error:', error);
      toast.error("An Error Occurred",{position:"top-center",autoClose:1000,theme:"light"})
    }
  };

  return (
        <Flex mt={{base:'2vh',lg:'0'}}  className='max-w-5xl' align='center' flexDir={{base:"column"}} height='50vh' justify={'space-between'}    width={{base:'90%',lg:'40%'}}  > 

        <Input required placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <Input required placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <Input required placeholder='PhoneNumber'  inputMode='numeric' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
        <Textarea required placeholder='Address' value={location} onChange={(e)=>setLocation(e.target.value)}/>
        <Flex width={'100%'} color='red' >{errorSignup}</Flex>
        <Flex width={'100%'} justify='flex-end'><Button onClick={handleSubmit} bg='orange.400' _hover={{bg:'orange.500'}} >Check Out</Button></Flex>
</Flex>

  )
}

export default CheckOut