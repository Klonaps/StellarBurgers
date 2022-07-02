import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredients-reducer'
import { orderIngredientReducer } from './order-ingredient-reducer'
import { orderReducer } from './order-reducer'
import { userReducer } from './user-reducer';
import { recoveryReducer } from './recovery-reducer'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orderIngredient: orderIngredientReducer,
  order: orderReducer,
  user: userReducer,
  recovery: recoveryReducer
})