export const BASE_URL = 'https://norma.nomoreparties.space/api/'
export const ingredients = 'ingredients'
export const orders = 'orders'
export const passwordReset = 'password-reset'
export const passwordResetReset = 'password-reset/reset'
export const LOGIN = 'auth/login'
export const REGISTER = 'auth/register'
export const LOGOUT = 'auth/logout'
export const USER = 'auth/user'
export const TOKEN = 'auth/token'

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

export const deleteRefrshToken = (token) => {
  return fetch(BASE_URL + LOGOUT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: token
    })
  })
}

export const fetchUserInfo = (accessToken) => {
  return fetch(BASE_URL + USER, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + accessToken
    }
  })
}

export const getNewToken = (token) => {
  return fetch(BASE_URL + TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: token
    })
  })
}

export const fetchOrder = (accessToken, body) => {
  return fetch(BASE_URL + orders, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + accessToken
      },
      body: JSON.stringify(body)
    })
}