export const BASE_URL = 'https://norma.nomoreparties.space/api/'
export const ingredients = 'ingredients'
export const orders = 'orders'

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}