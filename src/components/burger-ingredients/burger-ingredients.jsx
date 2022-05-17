import React, { useState } from 'react'
import PropTypes from "prop-types";

import Tabs from './tabs/tabs'
import Subtitle from './subtitle/subtitle'
import BurgerItem from './burger-ingredient/burger-ingredient'

import { PTIngredient, PTcurrentOrder } from '../../utils/prop-types';

import styles from './burger-ingredients.module.css'


const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState('one')

  const findCurrentOrder = (id) => {
    for (let i = 0; i < props.currentOrder.length; i++) {
      if (id === props.currentOrder[i]._id) return props.currentOrder[i].count
    }
  }

  return (
    <section className={styles.container}>
      <p className={`text text_type_main-large ${styles.title}`}>Соберите бургер</p>
      <Tabs styles={styles.tab} current={current} setCurrent={setCurrent}/>
      <div className={`${styles.content} custom-scroll`}>
        <Subtitle subtitle={'Булки'} />
        <div className={styles.box}>
        {props.data.map((dat) => (
          dat.type === "bun" ?
          <BurgerItem key={dat._id} name={dat.name} image={dat.image} price={dat.price} count={findCurrentOrder(dat._id)}/>
          :
          ''
        ))}
        </div>
        <Subtitle subtitle={'Начинки'} />
        <div className={styles.box}>
        {props.data.map((dat) => (
          dat.type === "main" ?
          <BurgerItem key={dat._id} name={dat.name} image={dat.image} price={dat.price} count={findCurrentOrder(dat._id)}/>
          :
          ''
        ))}
        </div>
        <Subtitle subtitle={'Соусы'} />
        <div className={styles.box}>
        {props.data.map((dat) => (
          dat.type === "sauce" ?
          <BurgerItem key={dat._id} name={dat.name} image={dat.image} price={dat.price} count={findCurrentOrder(dat._id)}/>
          :
          ''
        ))}
        </div>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PTIngredient.isRequired).isRequired,
  currentOrder: PropTypes.arrayOf(PTcurrentOrder.isRequired).isRequired
}

export default BurgerIngredients
