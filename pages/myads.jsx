import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import classes from "../styles/myads.module.css"
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'


function UserStatus() {

  const {status} = useSession();
  const router = useRouter();

  if(status === "loading"){
    return(
      <h1>Loading...</h1>
    )
  }

  if(status === "unauthenticated"){
    router.replace("/#login")
  }

  

  return (
    <>
      <Navbar/>
      <Banner/>
      <div className = {classes.div}>

      </div>

    </>
  )
}

export default UserStatus