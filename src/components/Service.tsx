import { Flex,Text,Image,Link } from '@chakra-ui/react';
import React from 'react';

type ServiceProps = {
    
};

const Service:React.FC<ServiceProps> = () => {
    
    return (
        <>
        <Flex justify={'center'} >
        <Flex  width={"100vw"} flexDir={{base:"column",md:"row"}} justify={'center'} className='max-w-6xl' mt={{base:"5vh",md:"20vh"}}>

            <Flex className='flex-1' ml={{base:"0",md:"5vw",lg:"1vw"}}    >
                <Image src={"/ser.avif"} alt="service" width={"500px"} className='object-cover'/>
                 </Flex>

<Flex  align={{md:"flex-start"}} mt={{base:"10px",md:"0"}} ml={{base:"0",md:"10vw",lg:"2vw"}} className='flex-1' flexDir={'column'}>
    <Text ml={{base:"10",md:"0"}} mr={{base:"10px",md:"0"}} fontSize={{base:"20px",md:"25px"}}   >
        <b>Our service is phenomenal in <br/>
the world of
Sales and <br/> Distribution of Electrical <br/> Equipments
</b>
</Text>
<Text ml={{base:"10",md:"0"}} mr={{base:"20px",md:"0"}} mt={{base:"10px"}}>
    We provide exceptional service in
     the sales and distribution of Electrical Equipments using proven 
      cost-effective solutions through our
       strategic alliances with industry players
        that share our commitment to delivering 
        such value. <Link _hover={{color:'orange.500'}} href='/products'>LEARN MORE →</Link>
</Text>
     </Flex>
            </Flex>

    </Flex>
        </>
    )
}
export default Service;