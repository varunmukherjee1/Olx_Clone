import React,{useRef} from 'react'
import toast from "react-hot-toast"
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import classes from "../styles/productForm.module.css"

function ProductForm(props) {

    const {data,status} = useSession();
    const router = useRouter();

    const titleRef = useRef();
    const descRef = useRef();
    const priceRef = useRef();
    const picRef = useRef();
    const locRef = useRef();
    const nameRef = useRef();
    const noRef = useRef();

    const submitHandler = async () => {
        try {
            
            const title =  titleRef.current.value
            const desc =  descRef.current.value
            const price =  priceRef.current.value
            const pic =  picRef.current.value
            const loc =  locRef.current.value
            const name =  nameRef.current.value
            const no =  noRef.current.value

            let valid = title !== "" && desc !== "" && price !== "" && pic !== "" && loc !== "" && name !== "" && no !== ""

            if(!valid){
                toast.error("Please fill form correctly")
                return;
            }

            const res = await axios.post("/api/user/products",{
                title,
                desc,
                price,
                pic,
                loc,
                name,
                no,
                cat: props.currCat,
                email: data.user.email
            })

            if(res.data.success){
                toast.success(res.data.message);
                router.replace('/')
            }
            else{
                toast.error(res.data.message)
            }

            titleRef.current.value = "";
            descRef.current.value = "";
            priceRef.current.value = "";
            picRef.current.value = "";
            locRef.current.value = "";
            nameRef.current.value = "";
            noRef.current.value = "";
        
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong")
        }
    }

    const prevHandler = () => {
        props.back({
            fill: false,
            cat: props.currCat
        })
    }

  return (
    <div className = {classes.div}>
        {/* <h1>Post your ad</h1> */}

        <div className = {classes.bigBox}>
            <h2>Selected Category: <span>{props.currCat}</span></h2>
            <h4 onClick = {prevHandler}>Change ?</h4>

            <div className = {classes.box}>
                <h2>Include some details</h2>
            
                <label htmlFor="title">Ad title :</label>
                <input ref = {titleRef} id = "title" type="text" />

                <label htmlFor="desc">Description</label>
                <textarea ref = {descRef} id = "desc" cols="30" rows="10"></textarea>
            </div>

            <div className = {classes.box}>
                <h2>Set a price</h2>
                <label htmlFor="price">Price</label>
                <input type="number" ref = {priceRef} id="price" />
            </div>

            <div className = {classes.box}>
                <h2>Upload photo</h2>

                <label htmlFor="photo">Photo URL</label>
                <input type="text" ref = {picRef} id = "photo" placeholder='Enter photo URL'/>
            </div>

            <div className = {classes.box}>
                <h2>Confirm Location</h2>

                <label htmlFor="loc">Location</label>
                <input type="text" ref = {locRef} id = "loc" placeholder='Location'/>
            </div>
            
            <div className = {classes.box}>
                <h2>Your Details</h2>

                <label htmlFor="name">Name</label>
                <input type="text" ref = {nameRef} id = "name" placeholder='Name'/>

                <label htmlFor="phone">Phone No.</label>
                <input type="text" ref = {noRef} id = "phone" placeholder='Phone No.'/>
            </div>

            <div className = {classes.box}>
                <button onClick = {submitHandler}>Post now</button>
            </div>

        </div>
    </div>
  )
}

export default ProductForm