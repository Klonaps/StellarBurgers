import React from 'react'
import { useSelector } from '../../services/redux/hooks' 
import Loader from '../loader/loader'

import OrderElement from './order-element/order-element'
import styles from './orders-feed.module.css'

type TOrdersFeed = {
  title?: string;
  status?: boolean
}

const OrdersFeed: React.FC<TOrdersFeed> = (props) => {
  const { orders } = useSelector(store => store.websocet)
  const cn: string = props.title ? styles.feed : styles.feedwithout
  
  if (orders.length === 0) return <Loader fullscreen />
  const ordersIsReverse = props.status ? [...orders].reverse() : orders

  return (
    <div className={styles.box}>
      {props.title && <p className={`text text_type_main-large ${styles.title}`}>{props.title}</p>}
      <div className={`${cn} custom-scroll`}>
        {ordersIsReverse.map((order: any) => 
          <OrderElement
            key={order._id}
            date={order.createdAt}
            ids={order.ingredients}
            name={order.name}
            number={order.number}
            id={order._id}
            status={props.status ? order.status : null}
          />
        )}
      </div>
    </div>
  )
}

export default OrdersFeed