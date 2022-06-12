import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBurgerIngredient, addBurgerBuns } from '../../services/actions/order-ingredient-actions'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'

import styles from './burger-constructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import NoneIngredient from './none-ingredient/none-ingredient'
import PriceBox from './price-box/price-box'
import IngredientBox from './ingredient-box/ingredient-box'

const BurgerConstructor = React.memo(() => {
  const dispatch = useDispatch()
  const { bun, ingredients } = useSelector(store => store.orderIngredient)

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      onDropHandler(item);
    }
  })
  const onDropHandler = (item) => {
    const uuid = uuidv4()
    if (item.type !== 'bun') {
      dispatch(addBurgerIngredient(item, uuid))
    } else {
      dispatch(addBurgerBuns(item, uuid))
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
})

export default BurgerConstructor