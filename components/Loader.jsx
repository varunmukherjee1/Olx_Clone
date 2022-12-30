import React from 'react'

import classes from "../styles/loader.module.css"

function Loader() {
  return (
    <div className = {classes.body}>
        <div className= {classes.loader}></div>
        <div className= {classes.loaderbody}></div>
    </div>
  )
}

export default Loader