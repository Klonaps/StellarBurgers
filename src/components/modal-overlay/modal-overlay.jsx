import React from 'react'
import PropTypes from "prop-types";

import styles from './modal-overlay.module.css'

const ModalOverlay = (props) => {
  return (
    <div className={styles.overlay} onClick={props.onClick}>
    </div>
  )
}

ModalOverlay.propTypes = {
  handlerCloseModal: PropTypes.func,
}

export default ModalOverlay