import React,{useRef} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-hot-toast'

import Modal from './Modal'

import classes from "../styles/form.module.css"

function Register(props) {

    const emailRef = useRef();
    const passRef = useRef();
    const rePassRef = useRef();

    const router = useRouter();

    const submitHandler = async (e) => {

        try {
            e.preventDefault();

            const email = emailRef.current.value;
            const pass = passRef.current.value;
            const rePass = rePassRef.current.value;

            if(pass !== rePass){
                toast.error("Password's don't match")
                return;
            }

            const res = await axios.post("/api/auth/signup",{
                email,
                password:pass
            });

            if(res.data.success){
                toast.success(res.data.message)
            }
            else{
                toast.error(res.data.message)
            }

            emailRef.current.value = "";
            passRef.current.value = "";
            rePassRef.current.value = "";

            router.replace("/#login")
        } catch (error) {
            console.log(error)
            toast.error("Something went Wrong");
        }

    }

    const login = () => {
        router.replace("/#login")
    }

    return (
        <Modal>
            <div className = {classes.div}>
                <h1>Register</h1>
                <form onSubmit={submitHandler}>

                    <div className = {classes.input}>
                        <input ref = {emailRef} type="email" placeholder='Email' required/>
                    </div>
                    <div className = {classes.input}>
                        <input ref = {passRef} type="password" placeholder='Password' required/>
                    </div>
                    <div className = {classes.input}>
                        <input ref = {rePassRef} type="password" placeholder='Re-Password' required/>
                    </div>

                    <button type="submit">Register</button>
                </form>
                <p>New to OLX? <span onClick = {login}>login</span></p>
            </div>
        </Modal>
    )
}

export default Register