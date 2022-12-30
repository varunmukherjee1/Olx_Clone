import React from 'react'

import classes from "../styles/banner.module.css"

function Banner(props) {

  const handler = (type) => {
    props.setCat(type)
  }

  return (
    <div className = {classes.banner}>
        <p onClick = {() => handler("cars")}>Cars</p>
        <p onClick = {() => handler("properties")}>properties</p>
        <p onClick = {() => handler("mobiles")}>mobiles</p>
        <p onClick = {() => handler("jobs")}>jobs</p>
        <p onClick = {() => handler("bikes")}>bikes</p>
        <p onClick = {() => handler("electronics")}>electronics</p>
        <p onClick = {() => handler("furniture")}>furniture</p>
        <p onClick = {() => handler("fashion")}>fashion</p>
        <p onClick = {() => handler("hobbies")}>hobbies</p>
        <p onClick = {() => handler("pets")}>pets</p>
        <p onClick = {() => handler("services")}>services</p>
    </div>
  )
}

export default Banner