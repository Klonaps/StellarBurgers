import React from 'react'
import styles from './home-page.module.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-сonstructor'

const HomePage = () => {
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

export default HomePage