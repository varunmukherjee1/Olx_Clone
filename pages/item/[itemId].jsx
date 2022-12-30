import React from 'react'
import { getSession , useSession} from 'next-auth/react'
import { MongoClient, ObjectId } from 'mongodb'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'
import toast from "react-hot-toast"


import Navbar from '../../components/Navbar'
import classes from "../../styles/item.module.css"
import profilePic from "../../public/images/profile_pic.png"
import Strip from '../../components/Strip'

function Item(props) {

    const {data,status} = useSession();
    const p = props.product;
    const router = useRouter();

    let rupee = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    });

    // console.log(p);

    // const buyHandler = async () => {
    //     console.log("HI....");
    // }

    const buyHandler = async () => {

        try {
            
            if(status !== "authenticated"){
                router.replace("/#login")
                return;
            }

            const response = await axios.post("/api/user/buyProduct",{
                pid: p._id,
                uEmail: data.user.email
            })

            console.log(response.data)


            if(response.data.success){
                toast.success("Product Bought")
                router.replace("/")
            }
            else{
                toast.error("Process failed")
            }

        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong")
        }
    }

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
                        <button onClick = {buyHandler}>Buy Now</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Item;

export async function getServerSideProps(context){

    const session = await getSession(context);
    
    const objId = context.params.itemId;
    const client = await MongoClient.connect("mongodb://localhost:27017/olx");
    const products = client.db().collection("products")

    const reqProd = await products.findOne({_id: ObjectId(objId)})

    // console.log(reqProd)

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