import React,{useRef} from 'react'
import { useRouter } from 'next/router'
import {signIn} from "next-auth/react"
import { toast } from 'react-hot-toast'

import Modal from './Modal'

import classes from "../styles/form.module.css"

function Login(props) {

    const emailRef = useRef();
    const passRef = useRef();

    const router = useRouter();

    const submitHandler = async(e) => {
        try {
            e.preventDefault();

            const email = emailRef.current.value;
            const pass = passRef.current.value;

            const status = await signIn("credentials",{
                email: email,
                password:pass,
                redirect: false
            })

            emailRef.current.value = "";
            passRef.current.value = "";

            console.log(status);

            if(status.error){
                toast.error("Invalid Credentials")
            }
            else{
                toast.success("Logged In Successfully")
                router.replace("/")
            }

        } catch (error) {
            console.log("Login error::");
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    const register = () => {
        router.replace("/#register")
    }

    return (
        <Modal>
            <div className = {classes.div}>
                <h1>Login</h1>
                <form onSubmit={submitHandler}>

                    <div className = {classes.input}>
                        <input ref = {emailRef} type="email" placeholder='Email' required/>
                    </div>
                    <div className = {classes.input}>
                        <input ref = {passRef} type="password" placeholder='Password' required/>
                    </div>

                    <button type="submit">Login</button>
                </form>
                <p>New to OLX? <span onClick = {register}>register</span></p>
            </div>
        </Modal>
    )
}

export default Login