import React from 'react'
import styles from './error.module.css'

const Error: React.FC = () => {
  return (
    <div className={styles.box}>
      <p className="text text_type_main-large">
        Упс! Кажется, произошла ошибка...
      </p>
    </div>
  )
}

export default Error