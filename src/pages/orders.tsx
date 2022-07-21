import React from 'react'
import OrdersPage from '../components/orders-page/orders-page'

const Orders: React.FC = () => {
  document.title = 'Stellar Burgers - история заказов'
  return (
    <OrdersPage />
  )
}

export default Orders