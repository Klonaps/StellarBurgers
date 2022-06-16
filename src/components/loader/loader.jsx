import React from 'react'
import styles from './loader.module.css'

const Loader = ({ fullscreen }) => {
  const cn = fullscreen ? styles.fullscreen : ''
  return (
    <div className={cn}>
      <span className={styles.loader} />
    </div>
  )
}

export default Loader