import React from 'react'
import Image from 'next/image'

import classes from "../styles/productCard.module.css"

function ProductCard(props) {

    const p = props.product;    

  return (
    <div className = {classes.div}>
        <Image alt = "product Img" src = {p.pic} height = "160" width = "286"/>
    </div>
  )
}

export default ProductCard