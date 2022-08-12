import { orderIngredientsReducer, initialState } from './reducer'
import * as actions from './actions'

const bun = {
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
  __v: 0,
  uuid: '1'
}

const oneIngredients = {
  _id: '1',
  name: "Ингредиент 1",
  type: "main",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
  uuid: '2'
}
const twoIngredients = {
  _id: '2',
  name: "Ингредиент 2",
  type: "main",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
  uuid: '3'
}

const stateWithOneIngredients = {
  ...initialState,
  ingredients: [oneIngredients]
}
const stateWithTwoIngredients = {
  ...initialState,
  ingredients: [oneIngredients, twoIngredients]
}
const sortState = {
  ...initialState,
  ingredients: [twoIngredients, oneIngredients]
}
const stateWithBun= {
  ...initialState,
  bun: [bun]
}

describe('test order-ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(orderIngredientsReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle addBurgerIngredients', () => {
    expect(orderIngredientsReducer(undefined, actions.addBurgerIngredients(oneIngredients))).toEqual(stateWithOneIngredients)
  })

  it('should handle addBurgerBuns', () => {
    expect(orderIngredientsReducer(undefined, actions.addBurgerBuns(bun))).toEqual(stateWithBun)
  })

  it('should handle deleteBurgerIngredient', () => {
    expect(orderIngredientsReducer(stateWithOneIngredients, actions.deleteBurgerIngredient('2'))).toEqual(initialState)
  })

  it('should handle sortBurgerIngredients', () => {
    expect(orderIngredientsReducer(stateWithTwoIngredients, actions.sortBurgerIngredients([twoIngredients, oneIngredients]))).toEqual(sortState)
  })
})