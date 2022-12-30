import React,{useState} from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';

import Category from '../../components/Category';
import ProductForm from '../../components/ProductForm';

import classes from "../../styles/postAd.module.css"

export default function PostAd() {

  const [state,setState] = useState({
    fill: false,
    cat: "Something"
  });

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
    <div className = {classes.div}>
      <h1>Post your ad</h1>
      {!state.fill && <Category currCat = {state.cat} next = {setState}/>}
      {state.fill && <ProductForm currCat = {state.cat} back = {setState}/>}
    </div>
  )
}