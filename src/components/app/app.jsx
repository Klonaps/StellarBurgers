import React, { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector, useDispatch } from 'react-redux'
import { getIngredients } from '../../services/actions/ingredients-actions'

import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-сonstructor'
import Error from '../error/error'
import Loader from '../loader/loader'
import styles from './app.module.css'

function App() {
  const dispatch = useDispatch()
  const { ingredientsRequest, ingredientsFailed } = useSelector(store => store.ingredients)

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <>
      {ingredientsFailed ?
        <Error />
        :
        <>
          <AppHeader />
          {ingredientsRequest ?
            <div className={styles.box}>
              <Loader />
            </div>
            :
            <DndProvider backend={HTML5Backend}>
              <main className={styles.main}>
                <div className={styles.container}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </div>
              </main>
            </DndProvider>
          }
        </>
      }
    </>
  )
}

export default App;