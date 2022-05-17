import React from 'react'
import PropTypes from "prop-types";
import {CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-ingredient.module.css'

const BurgerItem = (props) => {
  return (
    <div className={styles.item}>
      {props.count && <Counter count={props.count} size="default" />}
      <img className={styles.img} src={props.image} alt={props.name} />
      <div className={styles.price}>
        <p className="text text_type_digits-default">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.name}`}>
        {props.name}
      </p>
    </div>
  )
}

BurgerItem.propTypes = {
  count: PropTypes.number,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}

export default BurgerItem