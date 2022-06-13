import { BASE_URL, orders, checkResponse } from '../../utils/API'

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST'
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS'
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED'
export const DELETE_ORDER_INFO = 'DELETE_ORDER_INFO'

export function postOrder(body) {
  return function(dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    })
    fetch(BASE_URL + orders, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: POST_ORDER_SUCCESS,
            name: res.name,
            order: res.order
          })
        } else {
          dispatch({
            type: POST_ORDER_FAILED
          })
          dispatch({
            type: DELETE_ORDER_INFO
          })
        }
      }).catch(err => {
        console.log(err)
        dispatch({
          type: POST_ORDER_FAILED
        })
        dispatch({
          type: DELETE_ORDER_INFO
        })
      })
  }
} 