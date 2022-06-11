import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { OPEN_ORDER_MODAL } from '../../../services/actions/modal-actions'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../../order-details/order-details'
import styles from './price-box.module.css'

const PriceBox = () => {
  const {ingredients, bun} = useSelector(store => store.orderIngredient)
  const { orderModalOpen } = useSelector(store => store.modal)
  const dispatch = useDispatch()

  const handlerOpenModal = () => {
    dispatch({
      type: OPEN_ORDER_MODAL
    })
  }

  const totalPrice = () => {
    return ingredients.reduce((sum, item) => sum + item.price, 0) + (bun.reduce((sum, item) => sum + item.price, 0) * 2)
  }

  return (
    <>
      {orderModalOpen && <OrderDetails/>}
      {totalPrice() === 0 ? "" :
        <div className={styles.bottomBox}>
          <div className={styles.price}>
            <p className="text text_type_digits-medium">{totalPrice()}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" onClick={handlerOpenModal}>Оформить заказ</Button>
        </div>
      }
    </>
  )
}

export default PriceBox