import { orderReducer, initialState } from './reducer'
import * as actions from './actions'

const order = {
  ingredients: [
    {
    _id: '4',
    name: 'Ингредиент 2',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    __v: 0
    },
    {
      _id: '3',
      name: 'Ингредиент 1',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0
    },
    {
      _id: '1',
      name: 'Булка 1',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    }
  ],
  _id: '123',
  owner:
    {
      name: 'test',
      email: 'test@ya.ru',
      createdAt: '2022-06-19T20:28:33.183Z',
      updatedAt: '2022-07-27T13:06:05.045Z'
    },
  status: 'done',
  name: 'Марсианский бургер',
  createdAt: '2022-08-10T12:51:46.589Z',
  updatedAt: '2022-08-10T12:51:47.064Z',
  number: '111',
  price: '4835'
}

const stateWithOrder = {
  ...initialState,
  currentOrder: order
}

describe('test order reducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle postOrderRequest', () => {
    expect(orderReducer(undefined, actions.postOrderRequest)).toEqual({
      ...initialState,
      orderFailed: false,
      orderRequest: true
    })
  })

  it('should handle postOrderFailed', () => {
    expect(orderReducer(undefined, actions.postOrderFailed)).toEqual({
      ...initialState,
      orderFailed: true,
      orderRequest: false
    })
  })

  it('should handle postOrderSuccess', () => {
    expect(orderReducer(undefined, actions.postOrderSuccess(order))).toEqual(stateWithOrder)
  })

  it('should handle deleteOrderInfo', () => {
    expect(orderReducer(stateWithOrder, actions.deleteOrderInfo)).toEqual(initialState)
  })
})