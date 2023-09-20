import { Flex, Text,Box } from '@chakra-ui/react';
import React from 'react';
import Slider2 from './Slider2';

type RecentProjectsProps = {
    
};

const RecentProjects:React.FC<RecentProjectsProps> = () => {
    
    return(
        <Flex flexDir={"column"} mt={{base:"10vh",md:"20vh"}}  bg={"black"}>
<Text ml={{base:"7vw",md:"5vw"}} fontSize={{base:"20px",md:"25px"}} color='white' pl={{base:"50px",md:"100px"}} pt={{base:"20px",md:"50px"}}>
    Our recent projects
</Text>
<Flex justify={"center"} >
    <Box mb={"3vh"}  mt={"20px"} width={{base:"60%",md:"75%"}}  >
    <Slider2/>
</Box>
</Flex>
        </Flex>
    )
}
export default RecentProjects;