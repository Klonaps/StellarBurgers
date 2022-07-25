import React from 'react'
import styles from './feed-page.module.css'
import OrdersFeed from '../orders-feed/orders-feed'
import OrdersInfo from '../orders-info/orders-info'

const FeedPage: React.FC = () => {
  return (
    <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.feed}><OrdersFeed title="Лента заказов" /></div>
          <OrdersInfo />
        </div>
      </main>
  )
}

export default FeedPage