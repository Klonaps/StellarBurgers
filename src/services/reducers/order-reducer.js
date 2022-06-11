import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  DELETE_ORDER_INFO
} from '../actions/order-actions'

const initialState = {
  currentOrder: [],
  orderRequest: false,
  orderFailed: false
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        currentOrder: {name: action.name, ...action.order},
        orderRequest: false,
        orderFailed: false,
      }
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }
    case DELETE_ORDER_INFO: {
      return {
        ...state,
        currentOrder: null
      }
    }
    default:
      return state
  }
}