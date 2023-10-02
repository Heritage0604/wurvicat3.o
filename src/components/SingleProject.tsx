import { Flex,Image,Text,SimpleGrid,Grid,Link,Input,Box,Icon,Button,useDisclosure } from '@chakra-ui/react'
import React,{useState,useEffect,useRef} from 'react'
import {GoShare} from 'react-icons/go'
import {BsBookmarkPlusFill,BsFillPlayCircleFill,BsStopFill,BsFillPlayFill,BsPauseCircleFill,BsFillPauseFill} from 'react-icons/bs'
import {toast} from "react-toastify" 
import OtherProjects from './OtherProjects'
import {useRouter} from "next/router"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

type SingleProjectProps = {
    projectData:any
};

const SingleProject:React.FC<SingleProjectProps> = ({projectData}) => {
     const { isOpen, onOpen, onClose } = useDisclosure()
    const router=useRouter()
    const[showImg,setShowImg]=useState(0)
    const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Share Link Example',
        text: 'Check out this link!',
        url: window.location.href
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => alert('Error sharing'));
    } else {
      alert('Web Share API is not supported in this browser');
    }
  }


  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<any>(null);


  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (!isPlaying) {
      const newUtterance = new SpeechSynthesisUtterance(projectData.description);
      utteranceRef.current = newUtterance;
      synth.speak(newUtterance);
      setIsPlaying(true);
    }
  }

  const handlePause = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPlaying(false);
  }

  const handleResume = () => {
    const synth = window.speechSynthesis;
    synth.resume();
    setIsPlaying(true);
  }

  const handleReset = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPlaying(false);
    utteranceRef.current=null
  }

 
  useEffect(()=>{
handleReset();
setShowImg(0)
  },[router.query.id])


    
    return (
       <Flex flexDir='column'>
         <Flex p='6'  mt={"1vh"} flexDir={{base:"column"}} align='center' justify='center' width={"100%"}>
            <Flex flexDir='column' maxWidth={'800px'}  width={"100%"}>

                {/* image  */}
                <Flex cursor={'pointer'} onClick={onOpen} width='100%'>
                    {projectData.imageURL.length>0 &&( <Image borderRadius='10px' mb={"2px"} height={"300px"} objectFit={'cover'} width={'100%'} src={projectData.imageURL[showImg].image} alt={projectData.title}/>)}
                </Flex>

                     <Flex mt='20px'    width='100%'>
                {projectData.imageURL.length > 1 && projectData.imageURL.map((img:any,idx:number)=>{
                        return(
                            <Flex mr='20px'onClick={()=>setShowImg(idx)} cursor={'pointer'} key={idx} borderRadius={'10px'} _hover={{border:showImg==idx ?'1px solid #DD6B20':'1px solid gray'}} border={showImg == idx ? '1px solid #DD6B20':"none"}>
                                <Image borderRadius='10px' width={'70px'} src={img.image}/>
                            </Flex>
                        )
                    })}                
                        </Flex>

                      

                  <Flex mt='14px' align='center' justify='space-between' width={{base:'100%',lg:'100%'}}>
                    <Flex ml='1%' align='center'>
                        <Text fontSize='18px' fontWeight={600}>{new Date(projectData.createdAt.seconds *1000).toDateString()}</Text>

                        {/* create a book mark for future project */}
                        {/* <Icon cursor={'pointer'} fontSize='20px' ml='10px' as={BsBookmarkPlusFill}/> */}
                    </Flex>
                        <Flex align='center' mr='1%' justify={'flex-end'}  width='150px'>
                        <Icon ml='7%' cursor='pointer' onClick={handleShare} fontSize='22px' as={GoShare}/>
                        <Icon ml='14%' cursor='pointer' onClick={isPlaying?handlePause:utteranceRef.current==null ?handlePlay:handleResume} fontSize='22px' as={isPlaying ? BsPauseCircleFill: BsFillPlayCircleFill}/>
                        <Button ml='1%' _hover={{bg:'transparent'}} isDisabled={isPlaying==false} variant='ghost'>
                            <Icon  onClick={handleReset} cursor='pointer' fontSize='31px' as={BsStopFill}/>
                        </Button>
                        
                        </Flex>
                    </Flex>

                {/* title and share button */}
                <Flex  width='100%' justify='space-between' mt='20px'>
                    <Text fontSize='30px' fontWeight={700}>{projectData.title}</Text>
                    
                </Flex>

              

                {/* description of project */}
                <Box mt='20px' width='100%'  lineHeight='30px' dangerouslySetInnerHTML={{__html:projectData.description}} />
            </Flex>
            
        </Flex>
        <OtherProjects projectData={projectData}/>
        <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Project Images</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image borderRadius='10px' mb={"2px"}  height={"400px"} objectFit={'contain'} width={'100%'} src={projectData.imageURL[showImg].image} alt={projectData.title}/>
             <Flex mt='20px'    width='100%'>
                {projectData.imageURL.length > 1 && projectData.imageURL.map((img:any,idx:number)=>{
                        return(
                            <Flex mr='20px'onClick={()=>setShowImg(idx)} cursor={'pointer'} key={idx} borderRadius={'10px'} _hover={{border:showImg==idx ?'1px solid #DD6B20':'1px solid gray'}} border={showImg == idx ? '1px solid #DD6B20':"none"}>
                                <Image borderRadius='10px' width={'70px'} src={img.image}/>
                            </Flex>
                        )
                    })}                
                        </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
       </Flex>
    )
}
export default SingleProject;