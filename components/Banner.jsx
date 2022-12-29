import React from 'react'

import classes from "../styles/banner.module.css"

function Banner() {
  return (
    <div className = {classes.banner}>
        <p>Smartphones</p>
        <p>Laptops</p>
        <p>Fragrances</p>
        <p>Skincare</p>
        <p>groceries</p>
        <p>Home-Decoraiton</p>
    </div>
  )
}

export default Banner