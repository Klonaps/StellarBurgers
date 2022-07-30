import React, { useEffect } from 'react'
import OrdersPage from '../components/orders-page/orders-page'
import { useDispatch } from '../services/redux/hooks'
import { disconnect, connect } from '../services/redux/reducers/websocket/actions'
import { WS_URL } from '../utils/API'

const Orders: React.FC = () => {
  document.title = 'Stellar Burgers - История заказов'

  const dispatch = useDispatch()

  useEffect(() => {
    const accessToken: string | null = localStorage.getItem('accessToken')
    if (accessToken) {
      dispatch(connect(`${WS_URL}?token=${accessToken}`))
    }
    return () => {
      dispatch(disconnect())
    }
  }, [dispatch])

  return (
    <OrdersPage />
  )
}

export default Orders