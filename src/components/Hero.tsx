import React from 'react'
import { Box,Flex,Image,Text, Link,Icon } from '@chakra-ui/react'
import Slider from './Slider'
const Hero = () => {
  return (
    <>
   <Flex justify={"center"} className='bg-slate-50 ' overflowX={'hidden'}  height={'100%'} >
   <Box>
    <Slider/>
   </Box>
   </Flex>
    </>
  )
}

export default Hero