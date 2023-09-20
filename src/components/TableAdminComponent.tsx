'use client'
import { Flex } from '@chakra-ui/react'
import React from 'react'
import TableComponent from './TableComponent'
import AdminComponent from './AdminComponent'

const TableAdminComponent = () => {
  return (
 <Flex flexDir={{base:"column",lg:"row"}}>
    <TableComponent/>
    <AdminComponent/>
 </Flex>
  )
}

export default TableAdminComponent