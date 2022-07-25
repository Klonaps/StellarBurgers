import React from 'react'
import styles from './mini-image.module.css'

const MiniImage: React.FC = () => {
  return (
    <div className={styles.box__border}>
      <div className={styles.box}>
        <img src={'https://code.s3.yandex.net/react/code/bun-02.png'} alt="img"
          height='56px'
        />
      </div>
    </div>
  )
}

export default MiniImage