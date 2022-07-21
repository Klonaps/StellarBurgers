import React, { useEffect, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../loader/loader'
import { postOrder } from '../../services/actions/order-actions'
import { TStore, TStoreOrder } from '../../utils/types'

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Done from '../../images/done.png'

import styles from './order-details.module.css'

const OrderDetails: FC = () => {
  const dispatch = useDispatch()
  //@ts-ignore
  const { bun, ingredients }: TStore = useSelector(store => store.orderIngredient)
  //@ts-ignore
  const { currentOrder, orderRequest, orderFailed }: TStoreOrder = useSelector(store => store.order)

  useEffect(() => {
    const getIngredientIds = () => {
      const idsArray: string[] = []
      ingredients.map(ingredient => idsArray.push(ingredient._id))
      bun.map(b => idsArray.push(b._id))
      return idsArray
    }
    //@ts-ignore
    dispatch(postOrder({
      ingredients: getIngredientIds()
    }))
  }, [dispatch, bun, ingredients])

  return (
    <>
      {orderFailed ? 
        <div className={styles.box}>
          <p className="text text_type_main-large">
            Упс! Кажется, произошла ошибка...<br/>Попробуйте еще раз!
          </p>
        </div>
        :
        <>
          {orderRequest ?
            <div className={styles.box}>
              <Loader/>
            </div>
            :
            <div className={styles.container}>
              <p className={`text text_type_digits-large ${styles.number}`}>{currentOrder.number}</p>
              <p className={`text text_type_main-medium ${styles.numberDescription}`}>
                идентификатор заказа
              </p>
              <div className={styles.check}>
                <CheckMarkIcon type="primary" />
                <img className={styles.checkImg} src={Done} alt={'Done'}/>
              </div>
              <p className={`text text_type_main-default ${styles.status}`}>
                Ваш заказ начали готовить
              </p>
              <p className="text text_type_main-default text_color_inactive">
                Дождитесь готовности на орбитальной станции
              </p>
            </div>
          }
        </>
      }
    </>
  )
}

export default OrderDetails