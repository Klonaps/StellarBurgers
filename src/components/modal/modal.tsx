import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import ModalOverlay from '../modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css'

const modalRoot = document.getElementById("modalRoot") as HTMLElement

type TModal = {
  handlerChangeState (param: boolean): void,
  title?: string,
  children: React.ReactNode,
}

type KeyboardEvent = {
  key: string;
}

const Modal: React.FC<TModal> = (props) => {
  const closeModal = (): void => {
    props.handlerChangeState(false)
  }

  useEffect(() => {
    const keydownCloseModal = (e: KeyboardEvent): void  => {
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
      <div className={styles.modal} onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
          <div className={styles.content}>
            <div className={styles.cross} onClick={closeModal} data-testid={'close'}>
              <CloseIcon type="primary" />
            </div>
            <p className={`text text_type_main-large`}>
              {props.title}
            </p>
            {props.children}
          </div>
      </div>
      <ModalOverlay onClick={closeModal}/>
    </div>, modalRoot)
}

export default Modal