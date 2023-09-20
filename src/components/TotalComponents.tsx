import { Flex,Text,Image,Link,Icon } from '@chakra-ui/react'
import React from 'react'
import {BiSolidBox} from "react-icons/bi"

type TotalComponentsProps = {
    icon:any,
    text:string,
    amount:number,
    color:string,
};

const TotalComponents:React.FC<TotalComponentsProps> = ({icon,text,amount,color}) => {
    
    return(
        <Flex mb={"2vh"} boxShadow='xl' p='3' rounded='md' bg='white' width={{base:"85%",lg:"30%"}} >
    <Flex   justify='center' align='center' height={"100px"} p='10' width={"100px"} borderRadius={'2px'} bg={`${color}`}>
        <Icon fontSize={'30px'} color='white' as={icon}/>
    </Flex>
    <Flex mt={"13px"} flexDir='column' ml='5'>
        <Text color='gray' fontSize={'15px'}> {text}</Text>
        <Text fontSize={'27px'} fontWeight={700}>{amount}</Text>
    </Flex>
</Flex>
    )
}
export default TotalComponents;