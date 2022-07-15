import React from 'react'
import styles from './loader.module.css'

type TLoader = {
  fullscreen?: boolean
}

const Loader: React.FC<TLoader> = ({ fullscreen }) => {
  const cn: string = fullscreen ? styles.fullscreen : ''
  
  return (
    <div className={cn}>
      <span className={styles.loader} />
    </div>
  )
}

export default Loader