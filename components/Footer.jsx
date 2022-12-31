import React from 'react';

import classes from "../styles/footer.module.css"

function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.content}>
        <p>Other Countries Pakistan - South Africa - Indonesia</p>
        <p>Free Classifieds in India. © 2006-2021 OLX</p>
      </div>
    </div>
  );
}

export default Footer;

export const FooterHead = () => {

  return (
    <div className= {classes.footer_head}>
      <div className={classes.content}>
        <div>
          <div className= {classes.heading}>
            <p>POPULAR LOCATIONS</p>
          </div>
          <div className= {classes.list}>
            <ul>
              <li>kolkata</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Pune</li>
            </ul>
          </div>
        </div>
        <div>
          <div className= {classes.heading}>
            <p>TRENDING LOCATIONS</p>
          </div>
          <div className= {classes.list}>
            <ul>
              <li>Bhubaneswar</li>
              <li>Hydrabad</li>
              <li>Chandigarh</li>
              <li>Nashik</li>
            </ul>
          </div>
        </div>
        <div>
          <div className= {classes.heading}>
            <p>ABOUT US</p>
          </div>
          <div className= {classes.list}>
            <ul>
              <li>About OLX Group</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>OLXPeople</li>
              <li>Waah Jobs</li>
            </ul>
          </div>
        </div>
        <div>
          <div className= {classes.heading}>
            <p>OLX</p>
          </div>
          <div className= {classes.list}>
            <ul>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
              <li>Blog</li>
              <li>OLX Autos Sell Car</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
