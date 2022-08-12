import { websocketReducer, initialState } from './reducer'
import * as actions from './actions'

const order = {
  ingredients: ['0', '1', '2'],
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

describe('test websocket reducer', () => {
  it('should return the initial state', () => {
    expect(websocketReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle wsConnecting', () => {
    expect(websocketReducer(undefined, actions.wsConnecting)).toEqual({
      ...initialState,
      status: 'connecting'
    })
  })

  it('should handle wsOpen', () => {
    expect(websocketReducer(undefined, actions.wsOpen)).toEqual({
      ...initialState,
      status: 'online',
      connectionError: ''
    })
  })

  it('should handle wsClose', () => {
    expect(websocketReducer(undefined, actions.wsClose)).toEqual({
      ...initialState,
      status: 'offline',
      orders: []
    })
  })

  it('should handle wsError', () => {
    expect(websocketReducer(undefined, actions.wsError('Ошибка'))).toEqual({
      ...initialState,
      connectionError: 'Ошибка'
    })
  })

  it('should handle wsMessage', () => {
    expect(websocketReducer(undefined, actions.wsMessage({
      success: true,
      orders: [order],
      total: 1,
      totalToday: 1
    }))).toEqual({
      ...initialState,
      orders: [order],
      total: 1,
      totalToday: 1
    })
  })
})