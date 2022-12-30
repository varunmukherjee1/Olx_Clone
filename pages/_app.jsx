import { Toaster } from 'react-hot-toast'
import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/router'
import { useState,useEffect } from 'react'

import Loader from '../components/Loader'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {

  const [loading,setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
      router.events.on('routeChangeStart',(url) => {
        console.log("start");
        setLoading(true);

        setTimeout(() => {
          setLoading(false)
        },5000)
      })
    
      router.events.on('routeChangeComplete',(url) => {
        console.log("end")
        setLoading(false);
      })
  },[]);

  return (
    <SessionProvider session={pageProps.session}>
      <Toaster position="top-center"/>
      <Component {...pageProps} />
      {loading && <Loader/>}
    </SessionProvider>
  )
}
