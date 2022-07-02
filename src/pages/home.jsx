import React from 'react'
import { useSelector } from 'react-redux'

import Error from '../components/error/error'
import Loader from '../components/loader/loader'
import HomePage from '../components/home-page/home-page'

const Home = () => {
  document.title = 'Stellar Burgers'
  const { ingredientsRequest, ingredientsFailed } = useSelector(store => store.ingredients)

  return (
    <>
      {ingredientsFailed ?
        <Error />
        :
        <>
          {ingredientsRequest ?
            <Loader fullscreen />
          :
            <HomePage/> 
          }
        </>
      }
    </>
  )
}

export default Home