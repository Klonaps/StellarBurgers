import { createReducer } from "@reduxjs/toolkit"
import {
  addBurgerBuns,
  addBurgerIngredients,
  deleteBurgerIngredient,
  sortBurgerIngredients
} from './actions'
import { TIngredient } from '../../../../utils/types'

type TIngredientWithUuid = TIngredient & { uuid: string }
type TOrderIngredientsState = {
  ingredients: TIngredientWithUuid[]
  bun: TIngredientWithUuid[]
}
const initialState: TOrderIngredientsState = {
  ingredients: [],
  bun: []
}

export const orderIngredientsReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(addBurgerIngredients, (state, action) => {
    state.ingredients = [...state.ingredients, action.payload]
  })
  .addCase(addBurgerBuns, (state, action) => {
    state.bun = [action.payload]
  })
  .addCase(deleteBurgerIngredient, (state, action) => {
    state.ingredients = [...state.ingredients].filter(item => item.uuid !== action.payload)
  })
  .addCase(sortBurgerIngredients, (state, action) => {
    state.ingredients = [...action.payload]
  })
})