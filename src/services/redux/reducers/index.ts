import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredients/reducer'
import { orderIngredientsReducer } from './order-ingredients/reducer'
import { orderReducer } from './order/reducer'
import { userReducer } from './user/reducer';
import { recoveryReducer } from './recovery/reducer'
import { websocketReducer } from './websocket/reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orderIngredients: orderIngredientsReducer,
  order: orderReducer,
  user: userReducer,
  recovery: recoveryReducer,
  websocet: websocketReducer
})