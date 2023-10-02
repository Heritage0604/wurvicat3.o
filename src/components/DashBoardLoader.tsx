
import AdminNavbar from '@/components/AdminNavbar'
import { Skeleton,Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const DashBoardLoader = () => {
  return (
    <Flex flexDir={'column'}>
      
        <Flex overflowX='hidden' className="overflow-x-hidden" justify={{base:"center",lg:"space-around"}} align={'center'} flexDir={{base:"column",lg:"row"}} mt={"20vh"}>
<Skeleton borderRadius={'20px'} width={{base:"85%",lg:"25%"}} rounded={"sm"} height={"25vh"}/>
<Skeleton mt={{base:"20px",lg:'0'}}  width={{base:"85%",lg:"25%"}}  borderRadius={'20px'}  rounded={"sm"} height={"25vh"}/>
<Skeleton mt={{base:"20px",lg:'0'}} width={{base:"85%",lg:"25%"}} borderRadius={'20px'}  rounded={"sm"} height={"25vh"}/>
        </Flex>
        <Flex mb={"10vh"} overflowX='hidden' className="overflow-x-hidden" justify={{base:"flex-start",lg:"space-around"}} align={{base:"center",lg:'flex-start'}} flexDir={{base:"column",lg:"row"}} mt={"15vh"}>
            <Skeleton mt={{base:"20px",lg:'0'}} width={{base:"85%",lg:"45%"}} borderRadius={'20px'}  rounded={"sm"} height={"45vh"}/>
            <Skeleton mt={{base:"20px",lg:'0'}} width={{base:"85%",lg:"45%"}} borderRadius={'20px'}  rounded={"sm"} height={"45vh"}/>
        </Flex>
    </Flex>
  )
}

export default DashBoardLoader