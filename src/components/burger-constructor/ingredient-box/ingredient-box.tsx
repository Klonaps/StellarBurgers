import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBurgerIngredient, SORT_BURGER_INGREDIENTS } from '../../../services/actions/order-ingredient-actions'
import { useDrop, useDrag } from 'react-dnd'
import { TOrderIngredient, TStoreOrderIngredient } from '../../../utils/types'
import type { Identifier, XYCoord } from 'dnd-core'

import styles from './ingredient-box.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

type TDragItem = {
  index: number
} & TOrderIngredient

const IngredientBox: React.FC<TOrderIngredient> = (props) => {
  const dispatch = useDispatch()
  //@ts-ignore
  const { ingredients }: TStoreOrderIngredient = useSelector(store => store.orderIngredient)
  const ingredientRef = useRef<HTMLDivElement | null>(null)

  const sortBurger = (item: TOrderIngredient): void => {
    const ingredientIndex: number = [...ingredients].findIndex((element)  => element.uuid === props.uuid)
    const newIngredientPosition: TOrderIngredient[] = [...ingredients].filter((element) => element.uuid !== item.uuid)
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

  const [{ handlerId }, dropRef] = useDrop<TDragItem, void, { handlerId: Identifier | null }>({
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
      const dragIndex: number = ingredients.findIndex(element => element.uuid === item.uuid)
      const hoverIndex: number = ingredients.findIndex(element => element.uuid === props.uuid)
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect: DOMRect = ingredientRef.current?.getBoundingClientRect()
      const hoverMiddleY: number = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY: number = (clientOffset as XYCoord).y - hoverBoundingRect.top
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

  const deleteIngredients = (uuid: string): void => {
    dispatch(deleteBurgerIngredient(uuid))
  }
  dragIngredientRef(dropRef(ingredientRef))

  const cn: string = isDrag ? styles.opacity : styles.item

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

export default IngredientBox