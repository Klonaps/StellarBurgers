import React, { useState } from 'react'
import Modal from '../modal/modal'
import PropTypes from 'prop-types'

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Done from '../../images/done.png'

import styles from './order-details.module.css'

const OrderDetails = (props) => {
  const [orderDetail, setOrderDetail] = useState({number: Math.floor(Math.random() * 100000)})

  return (
    <Modal handlerCloseModal={props.handlerCloseModal}>
      <div className={styles.container}>
        <p className={`text text_type_digits-large ${styles.number}`}>{orderDetail.number}</p>
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
    </Modal>
  )
}

OrderDetails.propTypes = {
  handlerCloseModal: PropTypes.func,
}

export default OrderDetails