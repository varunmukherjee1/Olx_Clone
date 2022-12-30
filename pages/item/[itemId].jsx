import React from 'react'
import { getSession , useSession} from 'next-auth/react'
import { MongoClient, ObjectId } from 'mongodb'
import Image from 'next/image'

import Navbar from '../../components/Navbar'
import classes from "../../styles/item.module.css"
import profilePic from "../../public/images/profile_pic.png"
import Strip from '../../components/Strip'

function Item(props) {

    const {data,status} = useSession();
    const p = props.product;

    let rupee = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    });

    return (
        <>
            <Navbar/>
            <Strip/>
            <div className = {classes.div}>
                <div className = {classes.left}>
                    <div className = {classes.bigBox}>
                        <div className = {classes.img}>
                            <img src= {p.pic} alt="prouct pic" />
                        </div>
                        <div className = {classes.box}>
                            <h2>Description</h2>
                            <p>{p.description}</p>
                        </div>
                    </div>
                </div>
                <div className = {classes.right}>
                    <div className = {classes.bigBox}>
                        <h2 className = {classes.price}>{rupee.format(p.price)}</h2>
                        <p className = {classes.title}>{p.title}</p>
                        <p className = {classes.loc}>{p.location}</p>
                    </div>
                    <div className = {classes.bigBox}>
                        <h2>Seller description</h2>
                        <div className = {classes.seller}>
                            <Image src= {profilePic} alt="profile pic" width = "40" height = "40"/>
                            <p>{p.seller_name}</p>
                        </div>
                        <p><strong>Phone No. :</strong> {p.seller_no}</p>
                        <p><strong>Email:</strong> {p.sellerEmail}</p>
                    </div>
                    <div className = {classes.bigBox}>
                        <button>Buy Now</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Item

export async function getServerSideProps(context){

    const session = await getSession(context);
    
    const objId = context.params.itemId;
    const client = await MongoClient.connect("mongodb://localhost:27017/olx");
    const products = client.db().collection("products")

    const reqProd = await products.findOne({_id: ObjectId(objId)})

    console.log(reqProd)

    return ({
        props:{
            session,
            product: {
                ...reqProd,
                _id: reqProd._id.toString()
            }
        }
    })
}