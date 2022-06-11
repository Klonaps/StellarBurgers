import {
  ADD_BURGER_INGREDIENTS,
  ADD_BURGER_BUNS,
  DELETE_BURGER_INGREDIENTS,
  SORT_BURGER_INGREDIENTS
} from '../actions/order-ingredient-actions'

const initialState = {
  ingredients: [],
  bun: []
}

export const orderIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BURGER_INGREDIENTS: {
      return {
        ...state,
        ingredients: [action.payload, ...state.ingredients],
      }
    }
    case ADD_BURGER_BUNS: {
      return {
        ...state,
        bun: [{...action.payload}],
      }
    }
    case DELETE_BURGER_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(item => item.uuid !== action.payload),
      }
    }
    case SORT_BURGER_INGREDIENTS: {
      const ingredientIndex = [...state.ingredients].filter(item => item.uuid !== action.payload.uuid).findIndex(item => item.uuid === action.oldElemet)
      const newIngredientPosition = [...state.ingredients].filter(item => item.uuid !== action.payload.uuid)
      newIngredientPosition.splice(ingredientIndex, 0, action.payload)
      return {
        ...state,
        ingredients: [...newIngredientPosition],
      }
    }
    default:
      return state
  }
}