import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from '../../services/redux/hooks'
import { fetchOnceOrder } from '../../utils/API'
import { getCorrectDate } from '../../utils/calculate-date'
import { getCurrentOrderWithCount, calculateSum } from '../../utils/calculating'
import { ISocketOrders } from '../../utils/types'

import FeedOrderInfo from '../feed-order-info/feed-order-info'
import Loader from '../loader/loader'
import styles from './feed-id-page.module.css'

const FeedIdPage: React.FC = () => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ err, setErr ] = useState<boolean>(false)
  const [ order, setOrder ] = useState<ISocketOrders | null>(null)
  const params: { id: string } = useParams()

  useEffect(() => {
    setLoading(true)
    setErr(false)
    fetchOnceOrder(params.id)
      .then(res => res.json())
      .then(res => {
        if (res && res.success) {
          setLoading(false)
          setErr(false)
          setOrder(res.orders[0])
        }
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        setErr(true)
      })
  }, [params])

  const { ingredients } = useSelector(state => state.ingredients)

  if (loading) return <Loader fullscreen />
  if (err) return <>Произошла ошибка. Попробуйте выполнить запрос позже.</>
  if (!order) return <>Произошла ошибка. Попробуйте выполнить запрос позже.</>

  const orderIngredient = getCurrentOrderWithCount(order.ingredients, ingredients)

  return (
    <div className={styles.box}>
      <FeedOrderInfo
        number={params.id}
        name={order.name}
        date={getCorrectDate(order?.createdAt)}
        status={order.status}
        ingredients={orderIngredient}
        sum={calculateSum(orderIngredient)}
      />
    </div>
  )
}

export default FeedIdPage