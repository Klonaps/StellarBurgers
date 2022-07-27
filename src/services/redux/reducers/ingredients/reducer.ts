import { createReducer } from "@reduxjs/toolkit"
import { TIngredient } from "../../../../utils/types"
import {
  getIngredientsSuccess,
  getIngredientsRequest,
  getIngredientsFailed,
  deleteIngredients
} from './actions'

type TIngredientsState = {
  ingredients: TIngredient[],
  ingredientsRequest: boolean,
  ingredientsFailed: boolean
}
const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false
}

export const ingredientsReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(getIngredientsRequest, (state) => {
    state.ingredientsRequest = true
    state.ingredientsFailed = false
  })
  .addCase(getIngredientsSuccess, (state, action) => {
    state.ingredientsRequest = false
    state.ingredientsFailed = false
    state.ingredients = action.payload
  })
  .addCase(getIngredientsFailed, (state) => {
    state.ingredientsRequest = false
    state.ingredientsFailed = true
  })
  .addCase(deleteIngredients, (state) => {
    state.ingredients = []
  })
})