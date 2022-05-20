import React, { useState, useRef, useEffect } from 'react'
import PropTypes from "prop-types"

import Tabs from './tabs/tabs'
import Subtitle from './subtitle/subtitle'
import BurgerIngredient from './burger-ingredient/burger-ingredient'

import { ingredientType } from '../../utils/prop-types'

import styles from './burger-ingredients.module.css'


const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState('one')
  const bunRef = useRef(null)
  const mainRef = useRef(null)
  const sauceRef = useRef(null)
  const scrollBlockRef = useRef(null)

  useEffect(() => {
    const scroll = scrollBlockRef.current
    scroll.addEventListener("scroll", scrollSetter)
    return () => {
      scroll.removeEventListener("scroll", scrollSetter)
    }
  },[])

  const scrollSetter = () => {
    if (bunRef.current.getBoundingClientRect().top <= 340 && bunRef.current.getBoundingClientRect().top >= 53) {
      setCurrent('one')
    }
    if (mainRef.current.getBoundingClientRect().top <= 340 && mainRef.current.getBoundingClientRect().top >= 240) {
      setCurrent('two')
    }
    if (sauceRef.current.getBoundingClientRect().top <= 669 && sauceRef.current.getBoundingClientRect().top >= 587) {
      setCurrent('three')
    }
    if (sauceRef.current.getBoundingClientRect().top >= 695 && mainRef.current.getBoundingClientRect().top < 400) {
      setCurrent('two')
    }
  }

  const findCurrentOrder = (id) => {
    for (let i = 0; i < props.currentOrder.length; i++) {
      if (id === props.currentOrder[i]._id) return props.currentOrder[i].count
    }
  }

  return (
    <section className={styles.container}>
      <p className={`text text_type_main-large ${styles.title}`}>Соберите бургер</p>
      <Tabs styles={styles.tab} current={current} setCurrent={setCurrent} refs={[bunRef.current, mainRef.current, sauceRef.current]}/>
      <div className={`${styles.content} custom-scroll`} ref={scrollBlockRef}>
        <Subtitle subtitle={'Булки'} ref={bunRef}/>
        <div className={styles.box}>
        {props.data.map((dat) => (
          dat.type === "bun" ?
          <BurgerIngredient
            key={dat._id}
            id={dat._id} 
            handleOpenModal={props.handleOpenModal} 
            name={dat.name}
            image={dat.image}
            price={dat.price}
            count={findCurrentOrder(dat._id)}
          />
          :
          ''
        ))}
        </div>
        <Subtitle subtitle={'Начинки'} ref={mainRef}/>
        <div className={styles.box}>
        {props.data.map((dat) => (
          dat.type === "main" ?
          <BurgerIngredient
            key={dat._id}
            id={dat._id} 
            handleOpenModal={props.handleOpenModal}
            name={dat.name}
            image={dat.image}
            price={dat.price}
            count={findCurrentOrder(dat._id)}
          />
          :
          ''
        ))}
        </div>
        <Subtitle subtitle={'Соусы'} ref={sauceRef}/>
        <div className={styles.box}>
        {props.data.map((dat) => (
          dat.type === "sauce" ?
          <BurgerIngredient
            key={dat._id}
            id={dat._id} 
            handleOpenModal={props.handleOpenModal}
            name={dat.name}
            image={dat.image}
            price={dat.price}
            count={findCurrentOrder(dat._id)}
          />
          :
          ''
        ))}
        </div>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  currentOrder: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  handleOpenModal: PropTypes.func,
}

export default BurgerIngredients
