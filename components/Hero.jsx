import React from 'react'
import Link from 'next/link'

import classes from "../styles/hero.module.css"

function Hero() {
  return (
    <div className = {classes.hero}>
        <Link href = "/postAd">
            Sell Car
        </Link>
    </div>
  )
}

export default Hero