import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from '../../services/redux/hooks'
import { useInView } from 'react-intersection-observer'

import Tabs from './tabs/tabs'
import Subtitle from './subtitle/subtitle'
import BurgerIngredient from './burger-ingredient/burger-ingredient'

import styles from './burger-ingredients.module.css'


const BurgerIngredients: React.FC = () => {
  const data = useSelector(state => state.ingredients.ingredients)
  const [current, setCurrent] = useState<string>('one')

  const bunRef = useRef<HTMLDivElement | null>(null)
  const mainRef = useRef<HTMLDivElement | null>(null)
  const sauceRef = useRef<HTMLDivElement | null>(null)

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

  if (!data) return <>Ничего нет</>

  return (
    <section className={styles.container}>
      <p className={`text text_type_main-large ${styles.title}`}>Соберите бургер</p>
      <Tabs styles={styles.tab} current={current} refs={[bunRef.current, mainRef.current, sauceRef.current]}/>
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
