import React from 'react'
import MiniImage from '../../mini-image/mini-image'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './ingredient.module.css'

type TIngredient = {
  img: string,
  name: string,
  price: number,
  count?: string
}

const Ingredient: React.FC<TIngredient> = (props) => {
  return (
    <div className={styles.ingredient}>
      <div className={styles.ingredient__img}><MiniImage image={props.img} /></div>
      <p className={`${styles.ingredient__name} text_type_main-default`}>{props.name}</p>
      <div className={styles.ingredient__price}><p className={`text_type_digits-default`}>
        {props.count ? props.count : 1} x {props.price}</p><CurrencyIcon type="primary" />
        </div>
    </div>
  )
}

export default Ingredient