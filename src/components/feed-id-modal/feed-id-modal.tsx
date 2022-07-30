import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from '../../services/redux/hooks'
import { getCorrectDate } from '../../utils/calculate-date'
import { getCurrentOrder, calculateSum } from '../../utils/calculating'

import FeedOrderInfo from '../feed-order-info/feed-order-info'
import Loader from '../loader/loader'
import styles from './feed-id-modal.module.css'

const FeedIdModal: React.FC = () => {
  const params: { id: string } = useParams()
  const { orders } = useSelector(state => state.websocet)
  const { ingredients } = useSelector(state => state.ingredients)
  if (orders.length === 0) return <div className={styles.loader}><Loader /></div>

  const thisOrders = [...orders].find((order) => order.number === Number(params.id))
  if (!thisOrders) return <div className={styles.loader}>Такого заказа не существует</div>

  const orderIngredient = getCurrentOrder(thisOrders.ingredients, ingredients)

  return (
    <FeedOrderInfo
      number={params.id}
      name={thisOrders.name}
      date={getCorrectDate(thisOrders.createdAt)}
      status={thisOrders.status}
      ingredients={orderIngredient}
      sum={calculateSum(orderIngredient)}
      isModal
    />
  )
}

export default FeedIdModal