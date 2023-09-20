import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '@/components/Navbar';
import {useRouter} from "next/router"
import Head from 'next/head'
import{RecoilRoot} from "recoil"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router=useRouter()
  return (
      <RecoilRoot>
    <ChakraProvider>
          <Head>
<title>Wurvicat Int Ltd</title>
<meta name='viewport' content='width=device-width, initial-scale=1'/>
<link rel="shortcut icon" href="/wurvicat.png"  />
<meta name="description" content="wurvicat International Limited"/>
    </Head>
      {!router.pathname.includes('admin') && <Navbar/> }
       <ToastContainer />
      <Component {...pageProps} />
    </ChakraProvider>
      </RecoilRoot>
  )
}

export default MyApp;