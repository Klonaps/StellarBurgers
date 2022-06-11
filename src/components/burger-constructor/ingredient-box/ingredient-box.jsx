import React from 'react'
import PropTypes from 'prop-types'
import { ingredientType } from '../../../utils/prop-types'
import { useDispatch } from 'react-redux'
import { deleteBurgerIngredient, SORT_BURGER_INGREDIENTS } from '../../../services/actions/order-ingredient-actions'
import { useDrop, useDrag } from 'react-dnd'

import styles from './ingredient-box.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const IngredientBox = (props) => {
  const dispatch = useDispatch()

  const sortBurger = (item) => {
    dispatch({
      type: SORT_BURGER_INGREDIENTS,
      payload: item,
      oldElemet: props.uuid
    })
  }

  const [{isDrag}, dragIngredientRef] = useDrag({
    type: 'ingredients',
    item: {...props},
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  const [, dropRef] = useDrop({
    accept: 'ingredients',
    drop(item) {
      sortBurger(item)
    }
  })

  const deleteIngredients = (uuid) => {
    dispatch(deleteBurgerIngredient(uuid))
  }

  return (
    !isDrag &&
    <div ref={dropRef}>
      <div className={styles.item} ref={dragIngredientRef}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={props.name}
          price={props.price}
          thumbnail={props.image}
          handleClose={() => deleteIngredients(props.uuid)}
        />
      </div>
    </div>
  )
}

IngredientBox.propTypes = {
  props: PropTypes.shape(ingredientType)
}

export default IngredientBox