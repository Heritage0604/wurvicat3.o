import React from 'react'
import { Divider, Flex,Image,Text } from '@chakra-ui/react'

const AboutUs = () => {
  return (
    <Flex mt='10vh' width={"100%"} justify={"center"} >
        <Flex align={"center"} flexDir="column" width={{base:"90%",md:"80%"}} bg={'orange.500'}>
           <Text mt={"3vh"} mb={"2vh"} fontSize={{base:"22px",md:"30px"}}>WHO ARE WE</Text>
           <Flex borderTop={"1px solid"} width={"60%"}/>
           <Text mb={"3vh"} pl="10" pr={"10"} mt='2vh' ml={"10"} mr={"10"} color={"white"}>WURVICAT INTERNATIONAL LIMITED was
             incorporated on the 10th March 2009 with
              registration certificate number RC805980.
               Wurvicat Intl. aims to do business in the
                area of Construction, procurement and supply
                 of a wide range of electrical distribution
                  materials, project management, consultancy
                   and other relatedengineering services. Our
                    Foreign Partners are: Siemens (Germany), 
                    RS Isolsec (France), Emerson /AEES (France),
                     3M (United States).</Text>
        </Flex>
    </Flex>
  )
}

export default AboutUs