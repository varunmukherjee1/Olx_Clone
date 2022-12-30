import React from 'react'

import ProductCard from './ProductCard'
import classes from "../styles/productsSec.module.css"

function ProductsSec(props) {
  return (
    <div className = {classes.div}>
        {props.view === "all" && <h1>Fresh recommendations</h1>}
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
            {
                (props.products.length === 0) && <h1>No Products 😶</h1>
            }
        </ul>
    </div>
  )
}

export default ProductsSec