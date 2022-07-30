import React from 'react'
import styles from './order-number.module.css'

type TOrderNubmer = {
  title: string,
  sum: number
}

const OrderNumber: React.FC<TOrderNubmer> = (props) => {
  return (
    <div className={styles.box}>
      <p className="text text_type_main-medium">{props.title}</p>
      <p className={`text text_type_digits-large ${styles.number}`}>{props.sum}</p>
    </div>
  )
}

export default OrderNumber