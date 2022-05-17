import React from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-сonstructor';

import { data } from '../../utils/data';

import styles from './app.module.css'

function App() {
  const currentOrder = [
    {
      ...data[0],
      count: 2,
    },
    {
      ...data[4],
      count: 1,
    },
    {
      ...data[5],
      count: 1,
    },
    {
      ...data[7],
      count: 1,
    },
    {
      ...data[10],
      count: 1,
    },
    {
      ...data[8],
      count: 2,
    },
    {
      ...data[8],
      count: 2,
    },
  ]
  const currentSum = () => {
    let sum = 0
    for (let i = 0; i < currentOrder.length; i++) {
      if (currentOrder[i].type === 'bun') {
        sum = sum + currentOrder[i].price * 2
      } else {
        sum = sum + currentOrder[i].price
      }
    }
    return sum
  }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          <BurgerIngredients data={data} currentOrder={currentOrder}/>
          <BurgerConstructor currentOrder={currentOrder} sum={currentSum()}/>
        </div>
      </main>
    </>
  );
}

export default App;
