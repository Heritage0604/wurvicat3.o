import React from 'react'
import { Flex,Image,Text } from '@chakra-ui/react'
type AboutHeroProps={
  imageurl:string;
  text:string
}
const AboutHero:React.FC<AboutHeroProps> = ({imageurl,text}) => {
  return (
      <Flex >
<Flex  position="relative" width={"100vw"}>
    <Image className=' w-screen h-[20rem] md:h-[30rem]   overflow-x-hidden object-cover'  src={imageurl} alt="about us"/>
<Text position="absolute" top={{base:'50%',md:'50%'}} left={"50%"} transform={'translate(-50%, -50%)'} color={"white"} fontSize={{base:"30px",md:"50px"}}>{text}</Text>
<Flex position="absolute" mt={"1vh"} top={{base:'60%',md:'60%'}} left={"50%"} transform={'translate(-50%, -50%)'} borderTop={"8px solid #dd6b20"} width={"40%"}></Flex>
</Flex>
</Flex>
  )
}

export default AboutHero

