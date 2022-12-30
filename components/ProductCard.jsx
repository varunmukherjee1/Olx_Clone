import React from 'react'
import Link from 'next/link';

import classes from "../styles/productCard.module.css"

function ProductCard(props) {

    const p = props.product;

    let rupee = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    });

    const pStatus = p.status;
    
    // console.log(p)

  return (
    <>
        {props.view === "all" && 
            <Link href = {`/item/${p._id}`} className = {classes.div}>
                <div className = {classes.img}>
                    <img alt = "product Img" src = {p.pic}/>
                </div>
                <div className = {classes.text}>
                    <div className = {classes.main}>
                        <h2>{rupee.format(p.price)}</h2>
                        <p>{p.title}</p>
                    </div>
                    <div className = {classes.loc}>
                        <p>{p.location}</p>
                    </div>
                </div>
            </Link>
        }
        {props.view === "user" && 
            <div href = {`/item/${p._id}`} className = {`${classes.div} ${classes.active}`}>
                <div className = {classes.img}>
                    <img alt = "product Img" src = {p.pic}/>
                </div>
                <div className = {classes.text}>
                    <div className = {classes.main}>
                        <h2>{rupee.format(p.price)}</h2>
                        <p>{p.title}</p>
                    </div>
                    <div className = {classes.loc}>
                        <p>{p.location}</p>
                    </div>
                </div>

                { !p.owner &&
                    <div className = {`${classes.status} ${pStatus === "sold"? classes.sold:classes.unsold}`}>
                        {pStatus === "sold"? "Sold":"Un-Sold"}
                    </div>
                }
            </div>
        }
    </>
  )
}

export default ProductCard