import { createReducer } from "@reduxjs/toolkit"
import { TUser } from '../../../../utils/types'
import {
  loginRequest, loginFailed, loginSuccess,
  logoutRequest, logoutFailed, logoutSuccess,
  registerRequest, registerFailed, registerSuccess,
  updateUserInfoRequest, updateUserInfoFailed, updateUserInfoSuccess,
  checkedUser, getUserSuccess, setIncorrectDataMessage
} from './actions'

type TUserState = {
  user: TUser | null
  userChecked: boolean
  loginRequest: boolean
  loginFailed: boolean
  registerRequest: boolean
  isRegisterFailed: boolean
  registerMessage: string
  message: string
  updateInfoRequest: boolean
  updateInfoFailed: boolean
  updateInfoSuccess: boolean
  logoutRequest: boolean
  logoutFailed: boolean
  isLogout: boolean
}

export const initialState: TUserState = {
  user: null,
  userChecked: false,
  loginRequest: false,
  loginFailed: false,
  registerRequest: false,
  isRegisterFailed: false,
  registerMessage: '',
  message: '',
  updateInfoRequest: false,
  updateInfoFailed: false,
  updateInfoSuccess: false,
  logoutRequest: false,
  logoutFailed: false,
  isLogout: false
}

export const userReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(checkedUser, (state) => {
    state.userChecked = true
  })
  .addCase(getUserSuccess, (state, action) => {
    state.user = action.payload
  })
  .addCase(loginRequest, (state) => {
    state.loginRequest = true
    state.loginFailed = false
    state.message = ''
  })
  .addCase(loginFailed, (state) => {
    state.loginRequest = false
    state.loginFailed = true
  })
  .addCase(loginSuccess, (state, action) => {
    state.loginRequest = false
    state.loginFailed = false
    state.user = {...action.payload}
    state.isLogout = false
    state.message = ''
  })
  .addCase(registerRequest, (state) => {
    state.registerRequest = true
    state.isRegisterFailed = false
    state.registerMessage = ''
  })
  .addCase(registerFailed, (state, action) => {
    state.registerRequest = false
    state.isRegisterFailed = true
    state.registerMessage = action.payload
  })
  .addCase(registerSuccess, (state, action) => {
    state.registerRequest = false
    state.isRegisterFailed = false
    state.user = {...action.payload}
    state.isLogout = false
    state.registerMessage = ''
  })
  .addCase(logoutRequest, (state) => {
    state.logoutRequest = true
    state.logoutFailed = false
  })
  .addCase(logoutFailed, (state) => {
    state.logoutRequest = false
    state.logoutFailed = true
  })
  .addCase(logoutSuccess, (state) => {
    state.logoutRequest = false
    state.logoutFailed = false
    state.user = null
    state.isLogout = true
  })
  .addCase(updateUserInfoRequest, (state) => {
    state.updateInfoRequest = true
    state.updateInfoSuccess = false
    state.logoutFailed = false
    state.message = ''
  })
  .addCase(updateUserInfoFailed, (state) => {
    state.updateInfoRequest = false
    state.updateInfoSuccess = false
    state.logoutFailed = true
    state.message = 'Произошла ошибка'
  })
  .addCase(updateUserInfoSuccess, (state, action) => {
    state.updateInfoRequest = false
    state.updateInfoSuccess = true
    state.logoutFailed = false
    state.message = 'Данные успешно обновлены'
    state.user = {...action.payload}
  })
  .addCase(setIncorrectDataMessage, (state, action) => {
    state.message = action.payload
  })
})