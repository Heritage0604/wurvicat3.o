import AdminNavbar from '@/components/AdminNavbar'
import { Skeleton,Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const ProfileLoader = () => {
  return (
    <Flex flexDir={'column'}>
        <AdminNavbar/>
        <Flex overflowX='hidden' className="overflow-x-hidden" justify={{base:"center",lg:"space-around"}} align={'center'} flexDir={{base:"column",lg:"row"}} mt={"20vh"}>
<Skeleton borderRadius={'20px'} width={{base:"85%",lg:"45%"}} rounded={"sm"} height={"50vh"}/>
<Skeleton mt={{base:"20px",lg:'0'}}  width={{base:"85%",lg:"45%"}}  borderRadius={'20px'}  rounded={"sm"} height={"50vh"}/>

        </Flex>
       
    </Flex>
  )
}

export default ProfileLoader