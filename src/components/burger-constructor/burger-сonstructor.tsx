import React from 'react'
import { useDispatch, useSelector } from '../../services/redux/hooks'
import { addBurgerIngredients, addBurgerBuns } from '../../services/redux/reducers/order-ingredients/actions'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'

import styles from './burger-constructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import NoneIngredient from './none-ingredient/none-ingredient'
import PriceBox from './price-box/price-box'
import IngredientBox from './ingredient-box/ingredient-box'
import { TIngredient } from '../../utils/types'

const BurgerConstructor: React.FC = () => {
  const dispatch = useDispatch()
  const { bun, ingredients } = useSelector(store => store.orderIngredients)

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredient) {
      onDropHandler(item)
    }
  })
  const onDropHandler = (item: TIngredient): void => {
    const uuid: string = uuidv4()
    if (item.type !== 'bun') {
      dispatch(addBurgerIngredients({...item, uuid}))
    } else {
      dispatch(addBurgerBuns({...item, uuid}))
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.items} ref={dropRef}>
        <div className={styles.bun}>
          {bun.length === 0 ?
            <NoneIngredient title="Добавьте булку" type="up"/>
            :
            <ConstructorElement type="top" isLocked={true} text={`${bun[0].name} (верх)`} price={bun[0].price} thumbnail={bun[0].image}/>
          }
        </div>
          <div className={`${styles.scrollableItems} custom-scroll`}>
            {ingredients.length === 0 ? <NoneIngredient title="Добавьте ингредиент"/> : ''}
            {ingredients.map((ingredient) => (
              <IngredientBox key={ingredient.uuid} {...ingredient}/>
            ))}
          </div>
        <div className={styles.bun}>
          {bun.length === 0 ?
            <NoneIngredient title="Добавьте булку" type="bottom"/>
            :
            <ConstructorElement type="bottom" isLocked={true} text={`${bun[0].name} (низ)`} price={bun[0].price} thumbnail={bun[0].image} />
          }
        </div>
      </div>
      <PriceBox />
    </section>
  )
}

export default BurgerConstructor