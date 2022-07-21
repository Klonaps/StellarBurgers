import React from 'react'
import styles from './modal-overlay.module.css'

type TModalOverlay = {
  onClick: () => void
}

const ModalOverlay: React.FC<TModalOverlay> = (props) => {
  return (
    <div className={styles.overlay} onClick={props.onClick}>
    </div>
  )
}

export default ModalOverlay