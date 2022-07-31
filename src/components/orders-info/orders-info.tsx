import React from 'react'
import OrderNumber from './order-number/order-number'
import styles from './orders-info.module.css'
import { useSelector } from '../../services/redux/hooks'

const OrdersInfo: React.FC = () => {
  const { total, totalToday, orders } = useSelector(state => state.websocet)
  const readyOrders = orders.filter((order: any) => order.status === 'done').slice(0, 10)
  const pendingOrders = orders.filter((order: any) => order.status === 'pending').slice(0, 10)

  return (
    <div className={styles.box}>
      <div className={styles.orders}>
        <div className={styles.order}>
          <p className={`text text_type_main-medium ${styles.order__title}`}>Готовы:</p>
          <div className={styles.order__box}>
            {readyOrders.map((order: any, index: number) => (
              <p key={index} className={`text text_type_digits-default ${styles.order__ready}`}>{order.number}</p>
            ))}
          </div>
        </div>
        <div className={styles.order}>
          <p className={`text text_type_main-medium ${styles.order__title}`}>В работе:</p>
          <div className={styles.order__box}>
            {pendingOrders.map((order: any, index: number) => (
              <p key={index} className={`text text_type_digits-default ${styles.order__number}`}>{order.number}</p>
            ))}
          </div>
        </div>
      </div>
      <OrderNumber title='Выполнено за все время:' sum={total || 0}/>
      <OrderNumber title='Выполнено за сегодня:' sum={totalToday || 0}/>
    </div>
  )
}

export default OrdersInfo