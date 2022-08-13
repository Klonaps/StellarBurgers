import { ingredientsReducer, initialState } from './reducer'
import * as actions from './actions'

const testIngredients = [{
  _id: '1',
  name: "Булка 1",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0
}]

const stateWithIngredients = {
  ...initialState,
  ingredients: testIngredients
}

describe('test ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle getIngredientsRequest', () => {
    expect(ingredientsReducer(undefined, actions.getIngredientsRequest )).toEqual({
      ...initialState,
      ingredientsRequest: true,
      ingredientsFailed: false
    })
  })

  it('should handle getIngredientsFailed', () => {
    expect(ingredientsReducer(undefined, actions.getIngredientsFailed )).toEqual({
      ...initialState,
      ingredientsRequest: false,
      ingredientsFailed: true
    })
  })

  it('should handle getIngredientsSuccess', () => {
    expect(ingredientsReducer(undefined, actions.getIngredientsSuccess(testIngredients))).toEqual(stateWithIngredients)
  })

  it('should handle deleteIngredients', () => {
    expect(ingredientsReducer(stateWithIngredients, actions.deleteIngredients)).toEqual(initialState)
  })
})