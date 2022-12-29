import React from 'react'
import { useRouter } from 'next/router'

import Portal from './Portal'

import classes from "../styles/modal.module.css"

function Modal(props) {

  const router = useRouter();

  const closeModal = () => {
    router.replace("/");
  }

  return (
    <Portal>
      <div className = {classes.modal}>
          <div className = {classes.overlay} onClick = {closeModal}></div>
          <div className = {classes.content}>
              <div className = {classes.cross} onClick = {closeModal}>&#9932;</div>
              {props.children}
          </div>
      </div>
    </Portal>
  )
}

export default Modal