import React, { useRef } from 'react'
import { useDispatch, useSelector } from '../../../services/redux/hooks'
import { deleteBurgerIngredient, sortBurgerIngredients } from '../../../services/redux/reducers/order-ingredients/actions'
import { useDrop, useDrag } from 'react-dnd'
import { TOrderIngredient } from '../../../utils/types'
import type { Identifier, XYCoord } from 'dnd-core'

import styles from './ingredient-box.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

type TDragItem = {
  index?: number
} & TOrderIngredient

const IngredientBox: React.FC<TOrderIngredient> = (props) => {
  const dispatch = useDispatch()
  const { ingredients } = useSelector(store => store.orderIngredients)
  const ingredientRef = useRef<HTMLDivElement | null>(null)

  const sortBurger = (item: any): void => {
    const ingredientIndex: number = [...ingredients].findIndex((element)  => element.uuid === props.uuid)
    const newIngredientPosition: TOrderIngredient[] = [...ingredients].filter((element) => element.uuid !== item.uuid)
    newIngredientPosition.splice(ingredientIndex, 0, item)
    dispatch(sortBurgerIngredients(newIngredientPosition))
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