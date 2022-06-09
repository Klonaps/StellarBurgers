import React from 'react'
import PropTypes from 'prop-types'

import styles from './burger-constructor.module.css'

import { ingredientType } from '../../utils/prop-types';
import {ConstructorElement, Button, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructor = React.memo((props) => {
  return (
    <section className={styles.container}>
      <div className={styles.items}>
        <div className={styles.bun}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${props.currentOrder[0].name} (верх)`}
            price={props.currentOrder[0].price}
            thumbnail={props.currentOrder[0].image}
          />
        </div>
        <div className={`${styles.scrollableItems} custom-scroll`}>
          {props.currentOrder.map((order, index) => (
            order.type !== "bun" ?
            <div key={index} className={styles.item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={order.name}
                price={order.price}
                thumbnail={order.image}
              />
            </div>
            :
            ''
          ))}
        </div>
        <div className={styles.bun}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${props.currentOrder[0].name} (низ)`}
            price={props.currentOrder[0].price}
            thumbnail={props.currentOrder[0].image}
          />
        </div>
      </div>
      <div className={styles.bottomBox}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">
            {props.sum}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={props.handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
})

BurgerConstructor.propTypes = {
  currentOrder: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  sum: PropTypes.number.isRequired,
  handleOpenModal: PropTypes.func,
}

export default BurgerConstructor