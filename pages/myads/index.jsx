import React,{useState,useEffect} from 'react'
import { MongoClient, ObjectId} from 'mongodb'
import { useSession,getSession } from 'next-auth/react'
import { useRouter,Router } from 'next/router'

import classes from "../../styles/myads.module.css"
import Navbar from '../../components/Navbar'
import Banner from '../../components/Banner'
import ProductsSec from "../../components/ProductsSec"

export default function MyAds(props) {

  const {data,status} = useSession();
  const router = useRouter();
  const [currTab,setCurrTab] = useState("sold")

  const setSold = () => {
    setCurrTab("sold")
  }

  const setUnSold = () => {
    setCurrTab("unsold")
  }

  const setOrder = () => {
    setCurrTab("orders")
  }

  useEffect(() => {
    if(router.asPath === "/myads#orders"){
      setCurrTab("orders")
    }
  },[]);

  return (
    <>
      <Navbar/>
      <Banner/>
      <div className = {classes.div}>
        <div className = {classes.tabs}>
          <div className = {classes.head}>
            <p className = {(currTab == "sold"? classes.active:"")} onClick = {setSold}>
              {`Sold (${props.sold.length})`}
            </p>
            <p className = {(currTab == "unsold"? classes.active:"")} onClick = {setUnSold}>
              {`Un-Sold (${props.unsold.length})`}
            </p>
            <p className = {(currTab == "orders"? classes.active:"")} onClick = {setOrder}>
              {`Orders (${props.bought.length})`}
            </p>
          </div>
          <div className = {classes.body}>
            <ProductsSec products = {(currTab === "sold")? props.sold: (currTab === "unsold")? props.unsold: props.bought} view = "user"/>
          </div>
        </div>
      </div>

    </>
  )
}

// export default MyAds;

export async function getServerSideProps(context) {

  const session = await getSession(context);

  if(!session){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const client = await MongoClient.connect("mongodb://localhost:27017/olx");
  const db = client.db();
  const users = db.collection("users")
  const products = db.collection("products")

  const user = await users.findOne({email:session.user.email});

  let sold = []
  let unsold = []
  let bought  = []


  if(user.products.length > 0){

    for(const pid of user.products){
      const prd = await products.findOne({_id: ObjectId(pid)})
  
      if(prd.status === "sold"){
        sold.push({
          ...prd,
          _id: pid
        });
      }
      else{
        unsold.push({
          ...prd,
          _id: pid
        });
      }
    }
  }

  if(user.bought.length > 0){
    for(const pid of user.bought){
      const prd = await products.findOne({_id: ObjectId(pid)})
  
      bought.push({
        ...prd,
        _id: pid
      })
    }
  }

  return {
    props:{
      session:session,
      sold,
      unsold,
      bought,
    }
  }
}