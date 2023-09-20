import { Flex } from '@chakra-ui/react'
import { authModalState } from "@/atoms/authModalAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import ResetPassword from '@/components/ResetPassword';
import { useEffect, useState } from "react";
import { auth, db } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
const Index = () => {
 
	const authModal = useRecoilValue(authModalState);
const [pageLoading, setPageLoading] = useState(true);
	const router = useRouter();
  const [user, loading, error] = useAuthState(auth);



	useEffect(() => {
		if (user) {
			router.push("/admin/profile")
		};
		if (!loading && !user) setPageLoading(false);
	}, [user, router, loading]);

	if (pageLoading) return null;
  return (
    <Flex justify='center' align='center' className='bg-slate-100 w-screen h-screen overflow-x-hidden'>
     {authModal.type === "login" ? <Login /> : authModal.type === "register" ? <Signup /> : <ResetPassword />}
    </Flex>
  )
}

export default Index