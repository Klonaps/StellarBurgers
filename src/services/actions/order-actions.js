import { checkResponse, getNewToken, fetchOrder } from '../../utils/API'

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST'
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS'
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED'
export const DELETE_ORDER_INFO = 'DELETE_ORDER_INFO'

export function postOrder(body) {
  return function(dispatch) {
    let accessToken = localStorage.getItem('accessToken')
    dispatch({type: POST_ORDER_REQUEST})
    fetchOrder(accessToken, body)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: POST_ORDER_SUCCESS,
            name: res.name,
            order: res.order
          })
        } else {
          dispatch({type: POST_ORDER_FAILED})
          dispatch({type: DELETE_ORDER_INFO})
        }
      }).catch(err => {
        if (err.message === 'jwt expired') {
          const refreshToken = localStorage.getItem('refreshToken')
            getNewToken(refreshToken)
              .then(checkResponse)
              .then(res => {
                if (res && res.success) {
                  accessToken = res.accessToken.split('Bearer ')[1]
                  localStorage.setItem('refreshToken', res.refreshToken)
                  localStorage.setItem('accessToken', accessToken)
                  fetchOrder(accessToken, body)
                    .then(checkResponse)
                    .then(res => {
                      if (res && res.success) {
                        dispatch({
                          type: POST_ORDER_SUCCESS,
                          name: res.name,
                          order: res.order
                        })
                      } else {
                        dispatch({type: POST_ORDER_FAILED})
                        dispatch({type: DELETE_ORDER_INFO})
                      }
                    }).catch(err => {
                      dispatch({type: POST_ORDER_FAILED})
                      dispatch({type: DELETE_ORDER_INFO})
                    })
                } else {
                  dispatch({type: POST_ORDER_FAILED})
                  dispatch({type: DELETE_ORDER_INFO})
                }
              }).catch(err => {
                dispatch({type: POST_ORDER_FAILED})
                dispatch({type: DELETE_ORDER_INFO})
              })
        } else {
          dispatch({type: POST_ORDER_FAILED})
          dispatch({type: DELETE_ORDER_INFO})
        }
      })
  }
} 