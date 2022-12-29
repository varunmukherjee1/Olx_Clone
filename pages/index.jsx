import { useState } from "react"
import { useRouter } from "next/router";
import Head from "next/head";
import { useSession } from "next-auth/react";

import Navbar from "../components/Navbar"
import Banner from "../components/Banner"
import Login from "../components/Login";
import Register from "../components/Register";
import Hero from "../components/Hero";

export default function Home() {

  const router = useRouter();
  const {data,status} = useSession();

  console.log({data,status})

  return (
    <>
      <Head>
        <title>OLX</title>
      </Head>
      <Navbar/>
      <Banner/>
      <Hero/>

      {(router.asPath === "/#login") && <Login/>}
      {(router.asPath === "/#register") && <Register/>}
    </>
  )
}
