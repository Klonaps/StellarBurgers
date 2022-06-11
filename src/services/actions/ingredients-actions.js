import { BASE_URL, ingredients } from '../../utils/API'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'
export const DELETE_INGREDIENTS = 'DELETE_INGREDIENTS'

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    })
    fetch(BASE_URL + ingredients)
      .then(res => {
        return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
      }).then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            data: res.data
          })
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          })
          dispatch({
            type: DELETE_INGREDIENTS
          })
        }
      }).catch(err => {
        console.log(err)
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
        dispatch({
          type: DELETE_INGREDIENTS
        })
      })
  }
} 