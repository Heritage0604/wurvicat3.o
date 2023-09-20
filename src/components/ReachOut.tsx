import { Flex,Text,Link, textDecoration } from '@chakra-ui/react';
import React from 'react';

type ReachOutProps = {
    
};

const ReachOut:React.FC<ReachOutProps> = () => {
    
    return(
        <Flex mb={"20vh"} align='center' justify='center' mt={"10vh"}   flexDir={'column'} >
<Flex justify='center'   width={"100%"}>
    <Text fontWeight={700} fontSize={'20px'}>
Would you like to reach out to us?
</Text>
</Flex>
<Flex justify={'space-around'} mt={"2vw"} width={"85%"} borderTop={'2px solid black'}>
<Link href="/about" mt={"2vh"} fontWeight={600} _hover={{textDecoration:"none",color:"orange.500"}} fontSize={{base:"15px",md:'20px'}}  >General Enquires</Link>
<Flex borderRight="2px solid" height={"40px"} mt={"2vh"}  ></Flex>
<Link href={"tel:08033848454"}  mt={"2vh"} _hover={{textDecoration:"none",color:"orange.500"}} fontWeight={600} fontSize={{base:"15px",md:'20px'}}  >08033848454</Link>
<Flex borderRight="2px solid" height={"40px"} mt={"2vh"} ></Flex>
<Link href={"mailto:info@wurvicat.com"} mt={"2vh"} fontWeight={600} fontSize={{base:"15px",md:'20px'}} _hover={{textDecoration:"none",color:"orange.500"}}  >info@wurvicat.com</Link>
</Flex>
<Flex mt={"10vh"} border={"1px solid"} height={"50vh"} width={{base:'85%',md:"40%"}}>
<Flex className='flex-1' justify='center' align='center' border="1px solid">
    <Link color={"white"} fontWeight={700} _hover={{textDecoration:"none"}} p={"10px"} textAlign={'center'} height={"50px"} bg={"orange.500"}>Projects Overview</Link>
</Flex>
<Flex flexDir={'column'} justify='center' align='center' className='flex-1' border="1px solid">
   <Text fontSize={"40px"} fontWeight={600}>
    50+</Text>
    
    <Text fontSize={{base:"17px",md:'20px'}} fontWeight={600}>projects completed </Text> 
</Flex>
</Flex>
        </Flex>
    )
}
export default ReachOut;