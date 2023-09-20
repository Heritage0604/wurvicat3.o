import { Flex,Text } from '@chakra-ui/react';
import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

type TableComponentProps = {
    
};

const TableComponent:React.FC<TableComponentProps> = () => {
    
    return(
        <Flex flexDir={'column'} p={{base:"0",lg:'4'}} mt={"4vh"} justify={{base:'center',lg:'flex-start'}} align={{base:'center',lg:'flex-start'}}  width={{base:"100%",lg:"70%"}}>
        <Flex position={'relative'} width={{base:"85%",lg:"100%"}} boxShadow='sm' p='3' rounded='md' bg='white' flexDir='column'>
<Text fontWeight={700} fontSize={'20px'} color={'#ad0ffc'}>Active Orders</Text>
<Flex width={"30px"} right={"3%"} position='absolute' justify={'center'} align='center' color={"white"} height={"30px"} borderRadius={'50%'} bg={'#ad0ffc'}>1</Flex>
        </Flex>
        
            <Flex width={{base:"85%",lg:"100%"}} boxShadow='xl' p='3' rounded='md' bg='white' flexDir='column'>
        <TableContainer height={{base:"60vh"}} overflowY={"scroll"}>
  <Table variant='striped' colorScheme='gray'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td isNumeric>25.4</Td>
      </Tr>

      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>

      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>


  <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>


        <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>




        <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>



        <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>




        <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>




        <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>




        <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>




















































    </Tbody>
    <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
            </Flex>
        </Flex>
    )
}
export default TableComponent;