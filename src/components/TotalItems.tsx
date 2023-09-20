'use client'

import { Flex,Text,Image,Link,Icon } from '@chakra-ui/react'
import React from 'react'
import {BiSolidBox} from "react-icons/bi"
import TotalComponents from './TotalComponents'

const TotalItems = () => {
  return (
   <Flex  overflowX='hidden' className="overflow-x-hidden" justify={{base:"center",lg:"space-around"}} align={'center'} flexDir={{base:"column",lg:"row"}} mt={"20vh"}>


<TotalComponents icon ={BiSolidBox} text='Total products' color={'#f57d2f'} amount={3}/>
<TotalComponents icon ={BiSolidBox} text='Total Orders' color={'#1b31fad8'} amount={3}/>
<TotalComponents icon ={BiSolidBox} text='Active Orders' color={'#008080'} amount={3}/>

   </Flex>

  )
}

export default TotalItems