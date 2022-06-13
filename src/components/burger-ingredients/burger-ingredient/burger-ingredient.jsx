import React, { useState } from 'react'
import PropTypes from "prop-types"
import { useDrag } from 'react-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_INGREDIENT_INFO, DELETE_INGREDIENT_INFO } from '../../../services/actions/ingredient-details-actions'

import { ingredientType } from '../../../utils/prop-types'
import {CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../../modal/modal'
import IngredientDetails from '../../ingredient-details/ingredient-details'

import styles from './burger-ingredient.module.css'

const BurgerIngredient = React.memo((props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { _id, type, name, image, price } = props.data
  const { ingredients, bun } = useSelector(store => store.orderIngredient)
  const dispatch = useDispatch()

  const closeModal = (bool) => {
    setIsModalVisible(bool)
    dispatch({type: DELETE_INGREDIENT_INFO})
  }

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {...props.data},
  })

  const handlerOpenModal = () => {
    setIsModalVisible(true)
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
    <>
    {isModalVisible && <Modal title="Детали ингредиента" handlerChangeState={closeModal}><IngredientDetails/></Modal>}
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
    </>
  )
})

BurgerIngredient.propTypes = PropTypes.shape(ingredientType.isRequired).isRequired

export default BurgerIngredient