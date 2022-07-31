import { createAction } from "@reduxjs/toolkit"
import { TIngredient, TOrderIngredient } from '../../../../utils/types'
import {
  ADD_BURGER_INGREDIENTS,
  ADD_BURGER_BUNS,
  DELETE_BURGER_INGREDIENTS,
  SORT_BURGER_INGREDIENTS
} from './constants'

type TPayload = {
  uuid: string
} & TIngredient

export const addBurgerIngredients = createAction<TPayload, typeof ADD_BURGER_INGREDIENTS>(ADD_BURGER_INGREDIENTS)
export const addBurgerBuns = createAction<TPayload, typeof ADD_BURGER_BUNS>(ADD_BURGER_BUNS)
export const deleteBurgerIngredient = createAction<string, typeof DELETE_BURGER_INGREDIENTS>(DELETE_BURGER_INGREDIENTS)
export const sortBurgerIngredients = createAction<TOrderIngredient[], typeof SORT_BURGER_INGREDIENTS>(SORT_BURGER_INGREDIENTS)

export type TOrderIngredientsActions = ReturnType<typeof addBurgerIngredients>
                          | ReturnType<typeof addBurgerBuns>
                          | ReturnType<typeof deleteBurgerIngredient>
                          | ReturnType<typeof sortBurgerIngredients>