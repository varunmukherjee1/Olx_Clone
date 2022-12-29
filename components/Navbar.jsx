import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

import SellButton from './SellButton'

import classes from "../styles/navbar.module.css"
import searchIcon from "../public/images/search-13-512.png"
import userPic from "../public/images/profile_pic.png"
import downArrow from "../public/images/down-arrow.png"

function Navbar(props) {

    const router = useRouter();
    const {data,status} = useSession();

    const [showCard,setShowCard] = useState(false);

    let name = ""

    if(status === "authenticated"){
        name = data.user.name;
    }

    const login = () => {
        router.push("/#login");
    }

    const logoutHandler = () => {
        signOut();
        router.replace("/");
    }

  return (
    <>
        <div className = {classes.container}>
            <div className = {classes.logo}>
                <img src= "/images/olx_logo_grey.png" alt="logo" />
            </div>

            <select name="location" id="location">
                <option value="Delhi">Delhi</option>
                <option value="Punjab">Punjab</option>
                <option value="Odisa">Odisa</option>
            </select>

            <div className = {classes.search}>
                <div>
                    <input type="text" />
                </div>
                <div>
                    <Image src = {searchIcon} alt = "search" width = "25" height = "25"/>
                </div>
            </div>

            { (status !== "authenticated") &&
                <div className = {classes.login}>
                    <p onClick = {login}>Login</p>
                </div>
            }

            {(status === "authenticated") && 
                <div className = {classes.user} onClick = {() => (setShowCard(!showCard))}>
                    <div className = {classes.pic}>
                        <Image src = {userPic} width = "40" alt = "profile"/>
                    </div>
                    <Image src = {downArrow} width = "30" alt = "arrow"/>
                </div>
            }

            {(status === "authenticated") && showCard &&
                <div className= {classes.card}>
                    <div className = {classes.intro}>
                        <div>
                            <Image src = {userPic} width = "55" alt = "profile"/>
                        </div>
                        <div>
                            <p>Hello,</p>
                            <h2>{name}</h2>
                        </div>
                    </div>
                    <div className = {classes.adds}>
                        <i className ="fa-regular fa-id-card"></i>
                        <p>My ADS</p>
                    </div>
                    <div className = {classes.control} onClick = {logoutHandler}>
                        <i className ="fa-solid fa-arrow-right-from-bracket"></i>
                        <p>Logout</p>
                    </div>
                </div>
            }

            <SellButton/>
        </div>
    </>
  )
}

export default Navbar