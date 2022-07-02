import { BASE_URL, checkResponse, LOGIN, REGISTER, USER, fetchUserInfo, getNewToken, deleteRefrshToken} from "../../utils/API"

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_FAILED'
export const LOGIN_FAILED = 'LOGIN_SUCCESS'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'
export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_FAILED'
export const REGISTER_FAILED = 'REGISTER_SUCCESS'
export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILED = 'GET_USER_FAILED'
export const CHECKED_USER = 'CHECKED_USER'
export const SET_INCORRECT_DATA_MESSAGE = 'SET_INCORRECT_DATA_MESSAGE'
export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST'
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS'
export const UPDATE_USER_INFO_FAILED = 'UPDATE_USER_INFO_FAILED'

export function login(body) {
  return function(dispatch) {
    dispatch({type: LOGIN_REQUEST,})
    fetch(BASE_URL + LOGIN, {
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
            type: LOGIN_SUCCESS,
            payload: res.user
          })
          const accessToken = res.accessToken.split('Bearer ')[1]
          localStorage.setItem('refreshToken', res.refreshToken)
          localStorage.setItem('accessToken', accessToken)
        } else {
          dispatch({type: LOGIN_FAILED})
        }
      }).catch(err => {
        dispatch({type: LOGIN_FAILED})
        if (err.message === 'email or password are incorrect') {
          dispatch({
            type: SET_INCORRECT_DATA_MESSAGE,
            payload: 'Данные введены неверно'
          })
        } else {
          dispatch({
            type: SET_INCORRECT_DATA_MESSAGE,
            payload: 'Произошла ошибка, попробуйте еще раз'
          })
        }
      })
  }
}

export function logout() {
  return function(dispatch) {
    dispatch({type: LOGOUT_REQUEST})
    const refreshToken = localStorage.getItem('refreshToken')
    deleteRefrshToken(refreshToken)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({type: LOGOUT_SUCCESS})
          localStorage.clear()
        } else {
          dispatch({type: LOGOUT_FAILED})
        }
      }).catch(err => {
        dispatch({type: LOGOUT_FAILED})
      })
  }
}

export function register(body) {
  return function(dispatch) {
    dispatch({type: REGISTER_REQUEST})
    fetch(BASE_URL + REGISTER, {
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
            type: REGISTER_SUCCESS,
            payload: res.user
          })
          const accessToken = res.accessToken.split('Bearer ')[1]
          localStorage.setItem('refreshToken', res.refreshToken)
          localStorage.setItem('accessToken', accessToken)
        } else {
          dispatch({
            type: REGISTER_FAILED,
            payload: 'Произошла ошибка, попробуйте еще раз'
          })
        }
      }).catch(err => {
        if (err.message === 'User already exists') {
          dispatch({
            type: REGISTER_FAILED,
            payload: 'Пользователь с таким email уже существует'
          })
        } if (err.message === 'Email, password and name are required fields') {
          dispatch({
            type: REGISTER_FAILED,
            payload: 'Необходимо заполнить все поля'
          })
        } else {
          dispatch({
            type: REGISTER_FAILED,
            payload: 'Произошла ошибка, попробуйте еще раз'
          })
        }
      })
  }
}

export function getUser() {
  return function(dispatch) {
    let accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    if (!accessToken && !refreshToken) {
      dispatch({type: CHECKED_USER,})
    } else {
      fetchUserInfo(accessToken)
        .then(checkResponse)
        .then(res => {
          if (res && res.success) {
            dispatch({
              type: GET_USER_SUCCESS,
              payload: res.user
            })
            dispatch({type: CHECKED_USER,})
          } else {
            dispatch({type: GET_USER_FAILED})
          }
        }).catch(err => {
          if (err.message === 'jwt expired') {
            getNewToken(refreshToken)
              .then(checkResponse)
              .then(res => {
                if (res && res.success) {
                  accessToken = res.accessToken.split('Bearer ')[1]
                  localStorage.setItem('refreshToken', res.refreshToken)
                  localStorage.setItem('accessToken', accessToken)
                  fetchUserInfo(accessToken)
                    .then(checkResponse)
                    .then(res => {
                      if (res && res.success) {
                        dispatch({
                          type: GET_USER_SUCCESS,
                          payload: res.user
                        })
                        dispatch({type: CHECKED_USER,})
                      } else {
                        dispatch({type: GET_USER_FAILED})
                      }
                    }).catch(err => {
                      dispatch({type: GET_USER_FAILED})
                    })
                } else {
                  dispatch({type: GET_USER_FAILED})
                }
              }).catch(err => {
                if (err.message === 'Token is invalid') {
                  dispatch({type: CHECKED_USER})
                  localStorage.clear()
                } else {
                  dispatch({type: GET_USER_FAILED})
                }
              })
          } else if (err.message === 'jwt malformed' || err.message === 'invalid token') {
            dispatch({type: CHECKED_USER,})
            localStorage.clear()
          } else {
            dispatch({type: CHECKED_USER,})
            dispatch({type: GET_USER_FAILED})
          }
        })
    }
  }
}

export function updateUserInfo(body) {
  return function(dispatch) {
    dispatch({type: UPDATE_USER_INFO_REQUEST})
    const accessToken = localStorage.getItem('accessToken')
    fetch(BASE_URL + USER, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + accessToken
      },
      body: JSON.stringify(body)
    })
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_INFO_SUCCESS,
            payload: res.user
          })
        } else {
          dispatch({type: UPDATE_USER_INFO_FAILED})
        }
      }).catch(err => {
        dispatch({type: UPDATE_USER_INFO_FAILED})
      })
  }
}