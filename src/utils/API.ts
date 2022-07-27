import { DefaultResponse, TDeleteRefreshToken, TFetchUserInfo, TGetNewToken, TFetchOrder, TFetchBody } from './types'

export const BASE_URL: string = 'https://norma.nomoreparties.space/api/'
export const ingredients: string = 'ingredients'
export const orders: string = 'orders'
export const passwordReset: string = 'password-reset'
export const passwordResetReset: string = 'password-reset/reset'
export const LOGIN: string = 'auth/login'
export const REGISTER: string = 'auth/register'
export const LOGOUT: string = 'auth/logout'
export const USER: string = 'auth/user'
export const TOKEN: string = 'auth/token'

export const checkResponse = <T>(res: DefaultResponse<T>) => {
  return res.ok ? res.json() : res.json().then((err: any )=> Promise.reject(err))
}

export const deleteRefrshToken = (token: string): Promise<DefaultResponse<TDeleteRefreshToken>> => {
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

export const fetchUserInfo = (accessToken: string): Promise<DefaultResponse<TFetchUserInfo>> => {
  return fetch(BASE_URL + USER, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + accessToken
    }
  })
}

export const getNewToken = (token: string): Promise<DefaultResponse<TGetNewToken>> => {
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

export const fetchOrder = (accessToken: string, body: TFetchBody): Promise<DefaultResponse<TFetchOrder>> => {
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