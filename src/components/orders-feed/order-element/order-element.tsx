import React, { useCallback } from 'react'
import { useSelector } from '../../../services/redux/hooks'
import { getCorrectDate } from '../../../utils/calculate-date'
import { getCurrentOrder, calculateSum } from '../../../utils/calculating'

import MiniImage from '../../mini-image/mini-image'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useHistory, useLocation } from 'react-router-dom'

import styles from './order-element.module.css'
import { TIngredient } from '../../../utils/types'

type TOrderElement = {
  date: string,
  ids: string[],
  name: string,
  number: number,
  id: string,
  status?: string
}

const OrderElement: React.FC<TOrderElement> = (props) => {
  const location = useLocation()
  const history = useHistory()
  const { ingredients } = useSelector(store => store.ingredients)
  const currentOrder = getCurrentOrder(props.ids, ingredients).reverse()
  const renderMiniImage = useCallback((ingredient: TIngredient, index: number): React.ReactNode => {
    return (
      <MiniImage key={index} image={ingredient.image_mobile}/>
    )
  }, [])

  const handlerOpenModal = (): void => {
    history.replace({
      pathname: props.status ? `/profile/orders/${props.number}` : `/feed/${props.number}`,
      state: { background: location }
    })
  }

  const renderMiniImageWithNumber = (): React.ReactNode => {
    const number: number = currentOrder.length - 5
    const newArray = currentOrder.slice(0, 5)
    return (
      <>
      {newArray.map((ingredient, index) => renderMiniImage(ingredient, index))}
      <MiniImage number={number} image={ingredients[5].image_mobile}/>
      </>
    )
  }
  const status: string | null = props.status ? props.status === 'done' ? 'Выполнен' : props.status === 'created' ? 'Создан' : 'Готовится' : null

  return (
    <div className={styles.box} onClick={handlerOpenModal}>
      <div className={styles.info}>
        <p className="text text_type_digits-default">#{props.number}</p>
        <p className="text text_type_main-default text_color_inactive">{getCorrectDate(props.date)}</p>
      </div>
      <p className="text text_type_main-medium">{props.name}</p>
      {props.status && props.status === 'done' ?
                        <p className={`text text_type_main-default ${styles.status} ${styles.done}`}>{status}</p>
                      :
                        <p className={`text text_type_main-default ${styles.status}`}>{status}</p>
      }
      <div className={styles.details}>
        <div className={styles.ingredients}>
          {currentOrder.length <= 7 ?
            currentOrder.map((ingredient, index) => renderMiniImage(ingredient, index))
          :
            renderMiniImageWithNumber()
          }
        </div>
        <div className={styles.sum}>
          <p className="text text_type_digits-default">{calculateSum(currentOrder)}</p>
          <CurrencyIcon type={'primary'}/>
        </div>
      </div>
    </div>
  )
}

export default OrderElement