import React from 'react'

import ProductCard from './ProductCard'
import classes from "../styles/productsSec.module.css"

function ProductsSec(props) {
  return (
    <div className = {classes.div}>
        <ul className = {classes.ul}>
            {
                props.products.map((p,id) => {
                    return (
                        <li key = {id}>
                            <ProductCard product = {p} view = {props.view}/>
                        </li>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default ProductsSec