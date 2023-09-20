import React from 'react';
import {  Box,Flex,Image,Text, Link,Icon } from '@chakra-ui/react'
import  Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

type Slider2Props = {
    
};

    const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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

const Slider2:React.FC<Slider2Props> = () => {
    
    return(
          <Box   className=' overflow-x-hidden  '    >
         <Carousel 
         additionalTransfrom={0}
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
  <Flex position='relative'  className=' overflow-x-hidden '>
                    <Image   className=' w-[300px] h-[300px]   overflow-x-hidden object-cover'    src={'/hero.avif'} alt="image"/>
                </Flex>
  <Flex position='relative'  className=' overflow-x-hidden '>
                    <Image   className=' w-[300px] h-[300px]   overflow-x-hidden object-cover'    src={'/hero.avif'} alt="image"/>
                      
                        <Flex zIndex={1} bg={"black"} position={"absolute"} opacity={0.1}  top={"0%"} width={"100%"} height={"100%"}></Flex>

                </Flex>
  <Flex position='relative'  className=' overflow-x-hidden '>
                    <Image   className=' w-[300px] h-[300px]   overflow-x-hidden object-cover'    src={'/hero.avif'} alt="image"/>
                      
                        <Flex zIndex={1} bg={"black"} position={"absolute"} opacity={0.1}  top={"0%"} width={"100%"} height={"100%"}></Flex>

                </Flex>

        </Carousel>
           </Box>
    )
}
export default Slider2;