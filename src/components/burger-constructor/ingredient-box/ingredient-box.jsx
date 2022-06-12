import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { ingredientType } from '../../../utils/prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBurgerIngredient, SORT_BURGER_INGREDIENTS } from '../../../services/actions/order-ingredient-actions'
import { useDrop, useDrag } from 'react-dnd'

import styles from './ingredient-box.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const IngredientBox = (props) => {
  const dispatch = useDispatch()
  const { ingredients } = useSelector(store => store.orderIngredient)
  const ingredientRef = useRef(null)

  const sortBurger = (item) => {
    const ingredientIndex = [...ingredients].findIndex(element => element.uuid === props.uuid)
    const newIngredientPosition = [...ingredients].filter(element => element.uuid !== item.uuid)
    newIngredientPosition.splice(ingredientIndex, 0, item)
    dispatch({
      type: SORT_BURGER_INGREDIENTS,
      payload: newIngredientPosition,
    })
  }

  const [{isDrag}, dragIngredientRef] = useDrag({
    type: 'ingredients',
    item: {...props},
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  const [{ handlerId }, dropRef] = useDrop({
    accept: 'ingredients',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ingredientRef.current) {
        return
      }
      const dragIndex = ingredients.findIndex(element => element.uuid === item.uuid)
      const hoverIndex = ingredients.findIndex(element => element.uuid === props.uuid)
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ingredientRef.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      sortBurger(item)
      item.index = hoverIndex
    }
  })

  const deleteIngredients = (uuid) => {
    dispatch(deleteBurgerIngredient(uuid))
  }
  dragIngredientRef(dropRef(ingredientRef))

  const cn = isDrag ? styles.opacity : styles.item

  return (
    <div className={cn} ref={ingredientRef} data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={props.name}
        price={props.price}
        thumbnail={props.image}
        handleClose={() => deleteIngredients(props.uuid)}
      />
    </div>
  )
}

IngredientBox.propTypes = {
  props: PropTypes.shape(ingredientType)
}

export default IngredientBox