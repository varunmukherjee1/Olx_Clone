import React from 'react'

import classes from "../styles/category.module.css"

function Category(props) {

    const handler = (type) => {
        props.next({
            fill: true,
            cat: type
        })
    }

  return (
    <div className = {classes.div}>
        {/* <h1>Post your ad</h1> */}

        <div className = {classes.bigBox}>
          <h2>choose a category</h2>
          <div className = {classes.box} onClick = {() => handler("cars")}>
            <i className ="fa-solid fa-car"></i>
            <p>{`OLX Autos (Cars)`}</p>
          </div>
          <div className = {classes.box} onClick = {() => handler("properties")}>
            <i className ="fa-solid fa-tree-city"></i>
            <p>{`Properties`}</p>
          </div>
          <div className = {classes.box} onClick = {() => handler("mobiles")}>
            <i className="fa-solid fa-mobile-screen-button"></i>
            <p>{`Moblies`}</p>
          </div>
          <div className = {classes.box} onClick = {() => handler("jobs")}>
            <i className="fa-solid fa-suitcase"></i>
            <p>{`Jobs`}</p>
          </div>
          <div className = {classes.box} onClick = {() => handler("bikes")}>
            <i className="fa-solid fa-motorcycle"></i>
            <p>{`Bikes`}</p>
          </div>
          <div className = {classes.box} onClick = {() => handler("electronics")}>
            <i className="fa-solid fa-desktop"></i>
            <p>{`Electronics & Appliances`}</p>
          </div>
          <div className = {classes.box} onClick = {() => handler("spares")}>
            <i className="fa-solid fa-gears"></i>
            <p>{`Commercial Vehicles & Spares`}</p>
          </div>
          <div className = {classes.box} onClick = {() => handler("furniture")}>
            <i className="fa-solid fa-couch"></i>
            <p>{`Furniture`}</p>
          </div>
          <div className = {classes.box} onClick = {() => handler("fashion")}>
            <i className="fa-solid fa-shirt"></i>
            <p>{`Fashion`}</p>
          </div>
          <div className = {classes.box} onClick = {() => handler("hobbies")}>
            <i className="fa-solid fa-guitar"></i>
            <p>{`Books, Sports & Hobbies`}</p>
          </div>
          <div className = {classes.box} onClick = {() => handler("pets")}>
            <i className="fa-solid fa-paw"></i>
            <p>{`Pets`}</p>
          </div>
          <div className = {classes.box} onClick = {() => handler("services")}>
            <i className="fa-solid fa-bell-concierge"></i>
            <p>{`Services`}</p>
          </div>
        </div>
    </div>
  )
}

export default Category