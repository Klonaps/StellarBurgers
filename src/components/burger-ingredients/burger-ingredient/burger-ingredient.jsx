import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import PropTypes from "prop-types"
import { useDrag } from 'react-dnd'
import { useSelector } from 'react-redux'

import { ingredientType } from '../../../utils/prop-types'
import {CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-ingredient.module.css'

const BurgerIngredient = React.memo((props) => {
  const location = useLocation()
  const history = useHistory()
  const { _id, type, name, image, price } = props.data
  const { ingredients, bun } = useSelector(store => store.orderIngredient)

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {...props.data},
  })

  const handlerOpenModal = () => {
    history.replace({
      pathname: `/ingredients/${_id}`,
      state: { background: location }
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