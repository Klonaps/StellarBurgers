import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredients-reducer'
import { orderIngredientReducer } from './order-ingredient-reducer'
import { orderReducer } from './order-reducer'
import { ingredientDetailsReducer } from './ingredient-details-reducer'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orderIngredient: orderIngredientReducer,
  order: orderReducer,
  ingredientDetails: ingredientDetailsReducer,
})