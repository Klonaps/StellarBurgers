import React from 'react'

import styles from './input-loader.module.css'
import Loader from '../loader/loader'

const InputLoader = () => {
  return (
    <div className={styles.box}>
      <Loader />
    </div>
  )
}

export default InputLoader