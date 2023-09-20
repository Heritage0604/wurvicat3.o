import React,{useState} from 'react'
import {  Box,Flex,Image,Text, Link,Icon,keyframes } from '@chakra-ui/react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'
import dart from "../../public/dart.jpg"
import vision from "../../public/vision.jpg"
import value from "../../public/value.jpg"


const Vision = () => {
       const img=[vision.src,dart.src,value.src]
    const [image,setImage]=useState(0)
    
  return (
  <Flex justify={'center'} >
        <Flex  ml={{base:"10",md:"0"}} mr={{base:"10px",md:"0"}}
         width={"100vw"} flexDir={{base:"column-reverse",md:"row"}}
          justify={'center'} className='max-w-6xl'
           mt={{base:"5vh",md:"20vh"}}>

<Flex mt={{base:"0",md:"7vw"}}  width={{base:"80vw",md:"30vw"}}>
        <Accordion allowToggle  width={"100%"} defaultIndex={[0]} allowMultiple={false}>
            {/* vision */}
  <AccordionItem>
    <h2>
      <AccordionButton onClick={()=>setImage(0)}  px={4}
    py={2}
    bg={"transparent"}
    transition='all 0.2s'
    borderRadius='md'
    border="none"
    borderWidth='1px'
    _hover={{ bg: 'transparent' }}
    _expanded={{ bg: 'transparent' }}
    _focus={{  bg: 'transparent', outline:"none" }}
    fontSize={{base:"15px",md:"18px"}} width={"100%"}>
        <Box as="span" flex='1' textAlign='left'>
        Our Vision
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
We aim to be known nationwide as the leading supplier of high standard,
quality, top OEM equipment to the Power, Manufacturing and Oil & Gas sectors.
    </AccordionPanel>
  </AccordionItem>

{/* mission */}
  <AccordionItem>
    <h2>
      <AccordionButton onClick={()=>setImage(1)}  py={2}
    bg={"transparent"}
    transition='all 0.2s'
    borderRadius='md'
    border="none"
    borderWidth='1px'
    _hover={{ bg: 'transparent' }}
    _expanded={{ bg: 'transparent' }}
    _focus={{  bg: 'transparent', outline:"none" }}
    fontSize={{base:"15px",md:"18px"}} width={"100%"}>
        <Box as="span" flex='1' textAlign='left'>
          Our Mission
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
We are committed to making a difference and keeping our fidelity by ensuring
efficiency in delivering services to our clients while maintaining a good
customer relationship. 
    </AccordionPanel>
  </AccordionItem>

{/* core values */}
  <AccordionItem>
    <h2>
      <AccordionButton onClick={()=>setImage(2)}   py={2}
    bg={"transparent"}
    transition='all 0.2s'
    borderRadius='md'
    border="none"
    borderWidth='1px'
    _hover={{ bg: 'transparent' }}
    _expanded={{ bg: 'transparent' }}
    _focus={{  bg: 'transparent', outline:"none" }}
    fontSize={{base:"15px",md:"18px"}} width={"100%"}>
        <Box as="span" flex='1' textAlign='left'>
          Our Core Values
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
<UnorderedList>
  <ListItem> Perseverance</ListItem>
  <ListItem>Reliability</ListItem>
  <ListItem>Quality</ListItem>
  <ListItem>Commitment</ListItem>

</UnorderedList>
    </AccordionPanel>
  </AccordionItem>

</Accordion>
</Flex>

<Flex width={{base:"80vw",md:"50vw"}}  height={"300px"} display={{base:"none",md:'flex'}}>
    <Image objectFit={'contain'} height={"350px"} alt='' src={img[image]}/>
</Flex>

<Flex  width={{base:"80vw",md:"50vw"}}  display={{base:"flex",md:'none'}}>
    <Image alt=''  src={img[image]}/>
</Flex>

</Flex>
</Flex>
  )
}

export default Vision