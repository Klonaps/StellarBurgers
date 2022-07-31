import { createAction } from "@reduxjs/toolkit"
import { BASE_URL, ingredients, checkResponse } from '../../../../utils/API'
import { TIngredient } from '../../../../utils/types'
import { AppThunk } from '../../types'

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  DELETE_INGREDIENTS
} from './constants'

export const getIngredientsRequest = createAction(GET_INGREDIENTS_REQUEST)
export const getIngredientsSuccess = createAction<TIngredient[], typeof GET_INGREDIENTS_SUCCESS>(GET_INGREDIENTS_SUCCESS)
export const getIngredientsFailed = createAction(GET_INGREDIENTS_FAILED)
export const deleteIngredients = createAction(DELETE_INGREDIENTS)

export type TIngredientsActions = ReturnType<typeof getIngredientsRequest>
                                | ReturnType<typeof getIngredientsSuccess>
                                | ReturnType<typeof getIngredientsFailed>
                                | ReturnType<typeof deleteIngredients>

export const getIngredients = (): AppThunk => {
  return function(dispatch) {
    dispatch(getIngredientsRequest())
    fetch(BASE_URL + ingredients)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(getIngredientsSuccess(res.data))
        } else {
          dispatch(getIngredientsFailed())
          dispatch(deleteIngredients())
        }
      }).catch(err => {
        console.log(err)
        dispatch(getIngredientsFailed())
        dispatch(deleteIngredients())
      })
  }
} 