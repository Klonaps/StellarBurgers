import React, { useState } from 'react'
import { useSelector } from '../../../services/redux/hooks'
import { useHistory } from 'react-router-dom'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../../order-details/order-details'
import Modal from '../../modal/modal'
import { TIngredient } from '../../../utils/types'
import styles from './price-box.module.css'

const PriceBox: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const { ingredients, bun } = useSelector(store => store.orderIngredients)
  const { user } = useSelector(store => store.user)
  const history = useHistory()

  const handlerOpenModal = (): void => {
    setIsModalVisible(true)
  }

  const getOrder = (): void => {
    if (!user) {
      history.push({
        pathname: '/login'
      })
    } else {
      handlerOpenModal()
    }
  }

  const totalPrice = (): number => {
    return ingredients.reduce((sum: number, item: TIngredient) => sum + item.price, 0) + (bun.reduce((sum: number, item: TIngredient) => sum + item.price, 0) * 2)
  }

  return (
    <>
      {isModalVisible && <Modal handlerChangeState={setIsModalVisible}><OrderDetails/></Modal>}
      {totalPrice() === 0 ? "" :
        <div className={styles.bottomBox}>
          <div className={styles.price}>
            <p className="text text_type_digits-medium">{totalPrice()}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" onClick={getOrder}>Оформить заказ</Button>
        </div>
      }
    </>
  )
}

export default PriceBox