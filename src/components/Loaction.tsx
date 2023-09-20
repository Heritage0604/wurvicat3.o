import { Flex,Text,Image, Input,Textarea } from '@chakra-ui/react'
import React,{useState} from 'react'

const Loaction = () => {
     const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[subject,setSubject]=useState("")
    const[message,setMessage]=useState("")
  return (
    <Flex mb={"7vh"} width={"100%"} flexDirection={'column'}  align='center' justify="center" mt={"5vh"}>
<Flex  flexDirection={{base:'column',md:"row"}} width={{base:"100%",md:"80%"}} >
   <Flex flexDirection={{base:"column",md:"row"}} >
 
      <Flex width={{base:"100%",md:"60vw"}} display={{base:"none",md:"flex"}}  mt={{base:"0vh",md:"1vh"}}>
<Image objectFit={'cover'}  width={{base:"100%",md:"100%"}} alt='location' src={'/laptop-map.png'}/>
      </Flex>

     

     
      <Flex pt={"50px"} flexDirection={'column'} mt={{base:"0vh",md:"1vh"}}align={"center"} justify={"center"} bg={"orange.500"}>
        <Text fontSize={{base:"2xl",md:"3xl"}} color={"white"}>
          Contact Us
        </Text>
        <Text mb={"10vh"}  fontSize={"15px"} ml={"20%"} mt={"5vh"} mr={"20%"} color={"white"}>
Connect with us for all your electrical equipment needs. Our dedicated team of electrical engineering experts is here to provide you with top-notch products and technical support. Whether you're looking for high-quality components, advanced systems, or specialized solutions, we have the expertise to guide you. Reach out to us through the contact form or directly by email, and let's collaborate to power your projects with reliable, innovative electrical equipment solutions.
        </Text>
      </Flex>
    

     
    </Flex>


</Flex>
<Flex mt={"10vh"} justify={'center'} align='center'  flexDirection={{base:'column',md:"row"}} width={{base:"100%",md:"80%"}}>
    <Flex width={{base:"80%",md:"50%"}}  flexDir={'column'}>
    <Text mb={"3vh"} fontWeight={600} color={"gray"} fontSize={'20px'}>Kindly fill the form below</Text>

    <Flex mb={"5vh"} flexDir={'column'}>
        <Text>Your Name (required)
            
        </Text>
        <Input value={name} onChange={(e)=>setName(e.target.value)}/>
    </Flex>

    <Flex  mb={"5vh"} flexDir={'column'}>
        <Text>Your Email (required)
            
        </Text>
        <Input value={email} onChange={(e)=>setEmail(e.target.value)}/>
    </Flex>

    <Flex mb={"5vh"} flexDir={'column'}>
        <Text>Subject
            
        </Text>
        <Input value={subject} onChange={(e)=>setSubject(e.target.value)}/>
    </Flex>

    <Flex mb={"1vh"} flexDir={'column'}>
        <Text>Message
            
        </Text>
        <Textarea value={message} onChange={(e)=>setMessage(e.target.value)} />
    </Flex>

    <Text mb={'5vh'} p={"10px"} cursor={'pointer'}  color={'white'} bg={"gray"} textAlign={'center'} width={"70px"} border={"1px solid gray "}>Send</Text>
</Flex>

 
{/*the google map  */}
<Flex ml={{base:'0',md:"20px"}}  width={{base:"80%",md:"50%"}} >

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.063124359251!2d3.3318380999999997!3d6.639083500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b915baa1a5285%3A0x96f3b87f44ff8cf2!2s10%20Otunubi%20St%2C%20Ifako%20Agege%20101232%2C%20Lagos!5e0!3m2!1sen!2sng!4v1692186393105!5m2!1sen!2sng" width="100%" height="450"  loading="lazy" ></iframe>

</Flex>
</Flex>
    </Flex>
  )
}

export default Loaction