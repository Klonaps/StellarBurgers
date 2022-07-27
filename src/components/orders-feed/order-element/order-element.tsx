import React from 'react'
import MiniImage from '../../mini-image/mini-image'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './order-element.module.css'

const OrderElement: React.FC = () => {
  return (
    <div className={styles.box}>
      <div className={styles.info}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GTM+3</p>
      </div>
      <p className="text text_type_main-medium">Death Star чето-там Burger</p>
      <div className={styles.details}>
        <div className={styles.ingredients}>
          <MiniImage />
          <MiniImage />
          <MiniImage />
          <MiniImage />
          <MiniImage />
          <MiniImage />
        </div>
        <div className={styles.sum}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon type={'primary'}/>
        </div>
      </div>
    </div>
  )
}

export default OrderElement