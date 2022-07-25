import React from 'react'
import OrderElement from './order-element/order-element';
import styles from './orders-feed.module.css'

type TOrdersFeed = {
  title?: string;
}

const OrdersFeed: React.FC<TOrdersFeed> = (props) => {
  return (
    <div className={styles.box}>
      {props.title && <p className={`text text_type_main-large ${styles.title}`}>{props.title}</p>}
      <div className={styles.feed}>
        <OrderElement />
      </div>
    </div>
  )
}

export default OrdersFeed