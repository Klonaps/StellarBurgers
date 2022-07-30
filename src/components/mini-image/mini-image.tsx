import React from 'react'
import styles from './mini-image.module.css'

type TMiniInmage = {
  image: string,
  number?: number
}

const MiniImage: React.FC<TMiniInmage> = (props) => {
  return (
    <div className={styles.img__box}>
      <div className={styles.box__border}>
        <div className={styles.box}>
          {props.number ?
          <>
            <div className={styles.shadow}>
              <p className="text text_type_digits-default">+{props.number}</p>
            </div>
            <img src={props.image} alt="Ингредиент" height='52px' />
          </>
          :
          <img src={props.image} alt="Ингредиент" height='52px' />
          }
        </div>
      </div>
    </div>
  )
}

export default MiniImage