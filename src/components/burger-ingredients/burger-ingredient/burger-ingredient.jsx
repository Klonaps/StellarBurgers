import React from 'react'
import PropTypes from "prop-types"
import { useDrag } from 'react-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { OPEN_DETAILS_MODAL } from '../../../services/actions/modal-actions'
import { ADD_INGREDIENT_INFO } from '../../../services/actions/ingredient-details-actions'

import { ingredientType } from '../../../utils/prop-types'
import {CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-ingredient.module.css'

const BurgerIngredient = React.memo((props) => {
  const { _id, type, name, image, price } = props.data
  const { ingredients, bun } = useSelector(store => store.orderIngredient)
  const dispatch = useDispatch()
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {...props.data},
  })

  const handlerOpenModal = () => {
    dispatch({
      type: OPEN_DETAILS_MODAL
    })
    dispatch({
      type: ADD_INGREDIENT_INFO,
      payload: props.data
    })
  }

  const calculateCount = () => {
    if (type === 'bun') {
      return bun.filter(b => b._id === _id).length * 2
    } else {
      return ingredients.filter(b => b._id === _id).length
    }
  }
  const count = calculateCount()

  return (
    <div className={styles.item} onClick={handlerOpenModal} ref={dragRef}>
      {count !== 0 ? <Counter count={count} size="default" /> : ''}
      <img className={styles.img} src={image} alt={name} />
      <div className={styles.price}>
        <p className={`text text_type_digits-default`}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.name}`}>
        {name}
      </p>
    </div>
  )
})

BurgerIngredient.propTypes = PropTypes.shape(ingredientType.isRequired).isRequired

export default BurgerIngredient