import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getIngredients } from '../services/actions/ingredients-actions'

import Error from '../components/error/error'
import Loader from '../components/loader/loader'
import OrderScreen from '../components/order-screen/order-screen'


const MainPage = () => {
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
          {ingredientsRequest ?
            <Loader fullscreen />
          :
            <OrderScreen/> 
          }
        </>
      }
    </>
  )
}

export default MainPage