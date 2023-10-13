import { Flex,Image,Text,SimpleGrid,Grid,Link,Input,Box,Icon } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import JsonData from "../MOCK_DATA.json"
import ReactPaginate from 'react-paginate';
import { Product, productState } from '@/atoms/Products';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BsFillCartPlusFill,BsCartCheckFill} from 'react-icons/bs'
import {toast} from "react-toastify" 


type Props={
    productData:any
}

const Products:React.FC<Props> = ({productData}) => {
    // const[users,setUsers]=useState(JsonData.splice(0,65))
    // const[search,setSearch]=useState("")
    // const[pageNumber,setPageNumber]=useState(1)
    // const[userPerPage,setUserPerPage]=useState(12);
    // const pagesVisited=pageNumber*userPerPage
    // const pageCount=Math.ceil(users.length/userPerPage)
    const[products,setProducts]=useState<any>(productData)
    const[productItem,setProductItem]=useRecoilState(productState)
    const [myCart,setMyCart]=useState<string[] |string >([])
    const[searchCart,setSearchCart]=useState('')
    const router=useRouter()
    const[cartNumber,setCartNumber]=useState(0)
    const[checkCart,setCheckCart]=useState<string[] |string >([])
// console.log(products[0].map((product:any)=>{
// console.log(product.id)
// }))

    // const changePage=(event:any)=>{
    //     setPageNumber(event.selected)
    // }

    const nextPage=(selectedProduct:Product)=>{
setProductItem(selectedProduct)
router.push(`/products/${selectedProduct.id}`)
    }

    const addToCart=(e:React.MouseEvent<SVGElement, MouseEvent>,product:any)=>{
        e.stopPropagation();
        const myStringCart=localStorage.getItem('myCart')
        try{
            if(myStringCart){
                const myArrayCart=myStringCart.split(',')
                myArrayCart.push(product.id)
                 const setData=localStorage.setItem('myCart',myArrayCart.join(' '))
                // localStorage.clear()
                getCartItems()
            }else{
                setMyCart([product.id])
                const setData=localStorage.setItem('myCart',product.id)

                getCartItems()
            }
            toast.success("Product Added to Cart",{position:"top-center",autoClose:1500,theme:"light"})
        }
        catch(e:any){
            toast.success("An Error Occured",{position:"top-center",autoClose:1500,theme:"light"})
        }
}

const removeFromCart=(e:React.MouseEvent<SVGElement, MouseEvent>,product:any)=>{
  e.stopPropagation();
        const myStringCart=localStorage.getItem('myCart')
        try{
                if(myStringCart){
                    
                   const newArray=myStringCart.split(' ')
                   const filteredArray=newArray.filter(item => item !== product.id)
                   const setData=localStorage.setItem('myCart',filteredArray.join(' '))
                   getCartItems()
                }
                toast.success("Product removed from cart",{position:"top-center",autoClose:1500,theme:"light"})
        }catch(e:any){
            toast.error("An Error Occured",{position:"top-center",autoClose:1500,theme:"light"})
        }

}

const getCartItems=()=>{
    const myStringCart=localStorage.getItem('myCart')
    if(myStringCart){
        setCheckCart(myStringCart)
        setCartNumber(myStringCart.split(' ').length)
    }
    else{
        setCheckCart('')
            setCartNumber(0)
    }
}

useEffect(()=>{
    getCartItems()
},[myCart,checkCart])



  return (
   <Flex p='6'  mt={"5vh"} flexDir={{base:"column"}} align='center' justify='center' width={"100%"} >
<Flex  className='max-w-5xl' align='center'    width='100%'  > 
    <Input width={{base:'90%',lg:"90%"}} placeholder="Search Products" value={searchCart} onChange={(e)=>setSearchCart(e.target.value)}/>
<Link href='/cart' _hover={{transform:'scale(1.2)'}} cursor='pointer'  width='40px' position='relative' ml='10%'>
        <Icon  duration={'0.5s'}   fontSize='25px' as={AiOutlineShoppingCart}/>
<Flex right='5px' top='-5px'  position='absolute' bg='orange.500' width='20px' height='20px' align='center' justify='center' color='white' borderRadius='50%'>{cartNumber}</Flex>
</Link>
</Flex>
<SimpleGrid   columns={{base:2,lg:4}} spacing={10} mt='5vh' className='max-w-5xl '   width='100%'   >
    {products.filter((item:any)=>{
        return item.name.toLowerCase() ===""?item :item.name.toLowerCase().includes(searchCart.toLowerCase())
      } ).map((product:any)=>{
        
        return(
            <Box cursor={'pointer'} key={product.id} onClick={()=>nextPage(product)}  width={{base:"170px",lg:"200px"}} borderRadius={'10px'} boxShadow={'md'} p='6' >
{product.imageURL.length>0 &&( <Image mb={"2px"} height={"150px"} objectFit={'contain'} width={'100%'} src={product.imageURL[0].image} alt={product.name}/>)}

                <Text  fontSize={{base:'15px',lg:"18px"}} >{product.name}</Text>
            <Flex justify='space-between' >
                <Text color='orange.500'fontWeight={600} fontSize={"13px"}>&#8358; {product.price.includes(".") ?`${product.price}`  :`${product.price}.00`}</Text>
                <Icon color='orange.500' fontSize='23px' onClick={(e)=>{
                    checkCart.includes(product!.id) ?removeFromCart(e,product): addToCart(e,product)
                }}
                  as={ checkCart.includes(product!.id) ? BsCartCheckFill:BsFillCartPlusFill}
                  />
            </Flex>


        </Box>
        )
    })}
</SimpleGrid>

{/* <ReactPaginate

nextLabel={"Next"}
  previousLabel={"Previous"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
/> */}
   </Flex> 
  )
}

export default Products