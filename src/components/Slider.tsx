import React from 'react'
import {  Box,Flex,Image,Text, Link,Icon } from '@chakra-ui/react'
import  Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'

const Slider = () => {



    // design for the carousel on different devices
    const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 
    // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
  return (
    <Box   className='w-screen overflow-x-hidden '   >
         <Carousel additionalTransfrom={0}
  arrows
  autoPlay
  autoPlaySpeed={8000}
  centerMode={false}
  showDots
  className=""
  containerClass="container-with-dots"
  dotListClass=""
  draggable
  focusOnSelect={false}
  infinite
  itemClass=""
  keyBoardControl
  minimumTouchDrag={80}
  pauseOnHover
  renderArrowsWhenDisabled={false}
  renderButtonGroupOutside={false}
  renderDotsOutside={false}
  responsive={responsive}
           >
       
    
         {/* first slider */}
                <Flex position='relative'  className='w-screen overflow-x-hidden '>
                    <Image   className=' w-screen h-[32rem]   overflow-x-hidden object-cover'    src={'/hero3.jpeg'} alt="image"/>
                      <Text zIndex={2} position='absolute' top={{base:"35%",md:'30%'}} fontWeight={700} left={'10%'} fontSize={{base:"22px",lg:"40px"}} color='white' >WELCOME TO</Text>
                    <Text zIndex={2} position='absolute' top='40%' fontWeight={900} left={'10%'} fontSize={{base:"35px",lg:"75px"}} color='orange.500' className="brightness-110" >WURVICAT</Text>
                    <Text zIndex={2} position='absolute' top={{base:'50%',md:'60%'}} fontWeight={700} left={'10%'} fontSize={{base:"24px",lg:"40px"}} color='white' >Engineering your future...</Text>
                    <Link zIndex={2} href='/about' bg={'orange.500'} _hover={{color:'white',transform: "scale(1.1)"}} p={'10px'} position='absolute' top={{base:"60%",md:'75%'}} fontWeight={700} left={'10%'} fontSize={{base:"15px",lg:"20px"}} color='black' >
                        WHO ARE WE
                        </Link>
                        <Flex zIndex={1} bg={"black"} position={"absolute"} opacity={0.2}  top={"0%"} width={"100%"} height={"100%"}></Flex>

                </Flex>
                <Flex position='relative'  className='w-screen overflow-x-hidden '>
                    <Image   className=' w-screen h-[32rem]   overflow-x-hidden object-cover'    src={'/hero.avif'} alt="image"/>
                      
                        <Flex zIndex={1} bg={"black"} position={"absolute"} opacity={0.1}  top={"0%"} width={"100%"} height={"100%"}></Flex>

                </Flex>

   

           </Carousel>
           </Box>
  )
}

export default Slider