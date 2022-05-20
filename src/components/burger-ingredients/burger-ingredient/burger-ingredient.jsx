import React from 'react'
import PropTypes from "prop-types";

import { burgerIngredientType } from '../../../utils/prop-types'
import {CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-ingredient.module.css'

const BurgerIngredient = React.memo((props) => {
  return (
    <div className={styles.item} onClick={() => props.handleOpenModal(props.id)}>
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
})

BurgerIngredient.propTypes = PropTypes.shape(burgerIngredientType.isRequired).isRequired

export default BurgerIngredient