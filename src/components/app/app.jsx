import React, {useEffect, useState} from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-сonstructor'
import IngredientDetails from '../ingredient-details/ingredient-details'
import OrderDetails from '../order-details/order-details';

import styles from './app.module.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [detailsId, setDetailsId] = useState('')
  const [isIngredientModalVisible, setIsIngredientModalVisible] = useState(false)
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false)
  const [data, setData] = useState([])

  const URL = 'https://norma.nomoreparties.space/api/ingredients'

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setIsError(false)
      try {
        const response = await fetch(URL)
        const result = await response.json()
        if (result.success === true) {
          setData(result.data)
          setIsLoading(false)
          setIsError(false)
        } else {
          setIsLoading(false)
          setIsError(true)
        }
      } catch (e) {
        console.log(e)
        setIsLoading(false)
        setIsError(true)
      }
    }
    fetchData()
  }, [])

  const currentOrder = [
    {...data[0], count: 2},
    {...data[4], count: 1},
    {...data[5], count: 1},
    {...data[11], count: 1},
    {...data[10], count: 2},
    {...data[10], count: 2},
    {...data[8], count: 1}
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

  const handlerOpenIngredientModal = (id) => {
    setDetailsId(id)
    setIsIngredientModalVisible(true)
  }
  const handlerOpenOrderModal = (id) => {
    setIsOrderModalVisible(true)
  }
  const handlerCloseModal = () => {
    setIsIngredientModalVisible(false)
    setIsOrderModalVisible(false)
  }

  return (
    <>
      {isError ?
        <div className={styles.loaderBox}>
          <p className="text text_type_main-large">
            Упс! Кажется, произошла ошибка...
          </p>
        </div>
        :
        <>
          {isIngredientModalVisible && <IngredientDetails handlerCloseModal={handlerCloseModal} data={data} id={detailsId}/>}
          {isOrderModalVisible && <OrderDetails handlerCloseModal={handlerCloseModal}/>}
          <AppHeader />
          {isLoading ?
            <div className={styles.loaderBox}><span className={styles.loader}></span></div>
            :
            <main className={styles.main}>
              <div className={styles.container}>
                <BurgerIngredients data={data} currentOrder={currentOrder} handleOpenModal={handlerOpenIngredientModal}/>
                <BurgerConstructor currentOrder={currentOrder} sum={currentSum()} handleOpenModal={handlerOpenOrderModal}/>
              </div>
            </main>
          }
        </>
      }
    </>
  );
}

export default App;
