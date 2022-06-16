import React from 'react'
import styles from './order-screen.module.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-сonstructor'

const OrderScreen = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.main}>
        <div className={styles.container}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </main>
    </DndProvider>
  )
}

export default OrderScreen