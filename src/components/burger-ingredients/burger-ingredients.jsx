import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useInView } from 'react-intersection-observer'

import Tabs from './tabs/tabs'
import Subtitle from './subtitle/subtitle'
import BurgerIngredient from './burger-ingredient/burger-ingredient'
import IngredientDetails from '../ingredient-details/ingredient-details'

import styles from './burger-ingredients.module.css'


const BurgerIngredients = () => {
  const data = useSelector(state => state.ingredients.ingredients)
  const { detailsModalOpen } = useSelector(state => state.modal)
  const [current, setCurrent] = useState('one')

  const bunRef = useRef(null)
  const mainRef = useRef(null)
  const sauceRef = useRef(null)

  const [bunsRef, inViewBuns] = useInView({threshold: 0})
  const [mainsRef, inViewMains] = useInView({threshold: 0})
  const [saucesRef, inViewSauces] = useInView({threshold: 0})

  useEffect(() => {
    if (inViewBuns) {
      setCurrent('one')
    } else if (inViewMains && !inViewSauces) {
      setCurrent('two')
    } else if (inViewSauces) {
      setCurrent('three')
    }
  },[inViewBuns, inViewSauces, inViewMains])

  return (
    <section className={styles.container}>
      {detailsModalOpen && <IngredientDetails/>}
      <p className={`text text_type_main-large ${styles.title}`}>Соберите бургер</p>
      <Tabs styles={styles.tab} current={current} setCurrent={setCurrent} refs={[bunRef.current, mainRef.current, sauceRef.current]}/>
      <div className={`${styles.content} custom-scroll`}>
        <div ref={bunRef}>
          <Subtitle subtitle={'Булки'} ref={bunsRef}/>
          <div className={styles.box}>
          {data.map((dat) => (
            dat.type === "bun" ?
            <BurgerIngredient key={dat._id} data={dat}/>
            :
            ''
          ))}
          </div>
        </div>
        <div ref={mainsRef}>
          <Subtitle subtitle={'Начинки'} ref={mainRef}/>
          <div className={styles.box}>
          {data.map((dat) => (
            dat.type === "main" ?
            <BurgerIngredient key={dat._id} data={dat}/>
            :
            ''
          ))}
          </div>
        </div>
        <div ref={sauceRef}>
          <Subtitle subtitle={'Соусы'} ref={saucesRef}/>
          <div className={styles.box}>
          {data.map((dat) => (
            dat.type === "sauce" ?
            <BurgerIngredient key={dat._id} data={dat}/>
            :
            ''
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BurgerIngredients
