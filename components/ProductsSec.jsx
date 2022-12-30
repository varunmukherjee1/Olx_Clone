import React from 'react'

import ProductCard from './ProductCard'
import classes from "../styles/productsSec.module.css"

function ProductsSec(props) {

    let myProducts = props.products

    if(props.search !== "*"){
        myProducts = myProducts.filter(p => {
            return (
                p.description.includes(props.search) ||
                p.category == props.search
            )
        })
    }

    if(props.cat !== ""){
        myProducts = myProducts.filter(p => {
            return (
                p.category === props.cat
            )
        })
    }

    return (
        <div className = {classes.div}>
            {props.view === "all" && <h1>Fresh recommendations</h1>}
            <ul className = {classes.ul}>
                {
                    myProducts.map((p,id) => {
                        return (
                            <li key = {id}>
                                <ProductCard product = {p} view = {props.view}/>
                            </li>
                        )
                    })
                }
                {
                    (myProducts.length === 0) && <h1>No Products 😶</h1>
                }
            </ul>
        </div>
    )
}

export default ProductsSec