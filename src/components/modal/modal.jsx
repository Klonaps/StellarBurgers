import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from "prop-types"

import ModalOverlay from '../modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css'

const modalRoot = document.getElementById("modalRoot")

const Modal = React.memo((props) => {
  const closeModal = () => {
    props.handlerChangeState(false)
  }

  useEffect(() => {
    const keydownCloseModal = (e) => {
      if(e.key === "Escape"){
        closeModal()
      }
    }

    document.addEventListener('keydown', keydownCloseModal)
    return () => {
      document.removeEventListener('keydown', keydownCloseModal)
    }
  }, []) // eslint-disable-line

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.content}>
            <div className={styles.cross} onClick={closeModal}>
              <CloseIcon type="primary" />
            </div>
            <p className="text text_type_main-large">
              {props.title}
            </p>
            {props.children}
          </div>
      </div>
      <ModalOverlay onClick={closeModal}/>
    </div>, modalRoot)
})

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  handlerChangeState: PropTypes.func.isRequired
}

export default Modal