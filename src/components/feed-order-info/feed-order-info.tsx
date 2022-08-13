import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import Ingredient from './ingredient/ingredient'
import styles from './feed-order-info.module.css'
import { TCurrentOrderWithCount } from '../../utils/types'

type TFeedOrderInfo = {
  isModal?: boolean,
  number: string,
  name: string,
  date: string,
  status: string,
  ingredients: TCurrentOrderWithCount[],
  sum: number
}

const FeedOrderInfo: React.FC<TFeedOrderInfo> = (props) => {
  const cn: string = props.isModal ? styles.number__modal : styles.number
  const status: string = props.status === 'done' ? 'Выполнен' : props.status === 'created' ? 'Создан' : 'Готовится'

  return (
    <div className={styles.content}>
      <div className={styles.box}>
        <p className={`${cn} text_type_digits-default`}>#{props.number}</p>
        <p className={`${styles.name} text_type_main-medium`}>{props.name}</p>
        {props.status === 'done' ?
          <p className={`text text_type_main-default ${styles.status} ${styles.done}`}>{status}</p>
        :
          <p className={`text text_type_main-default ${styles.status}`}>{status}</p>
        }
        <p className={`${styles.compound} text_type_main-medium`}>Состав:</p>
        <div className={`custom-scroll ${styles.order}`}>
          {props.ingredients?.map((ingredient, index) => {
            if (ingredient.type === 'bun') return <Ingredient key={index} img={ingredient.image_mobile} name={ingredient.name} price={ingredient.price} count={2} />
            return <Ingredient key={index} img={ingredient.image_mobile} name={ingredient.name} price={ingredient.price} count={ingredient.count}/>
          })}
        </div>
        <div className={styles.bottom}>
          <p className='text_type_main-default text_color_inactive'>{props.date}</p>
          <div className={styles.price}><p className={`text_type_digits-default`}>{props.sum}</p><CurrencyIcon type="primary" /></div>
        </div>
      </div>
    </div>
  )
}

export default FeedOrderInfo