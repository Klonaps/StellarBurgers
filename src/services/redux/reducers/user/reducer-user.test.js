import { userReducer, initialState } from './reducer'
import * as actions from './actions'

const user = {
  email: 'test@ya.ru',
  name: 'test'
}

describe('test user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle checkedUser', () => {
    expect(userReducer(undefined, actions.checkedUser)).toEqual({
      ...initialState,
      userChecked: true
    })
  })

  it('should handle getUserSuccess', () => {
    expect(userReducer(undefined, actions.getUserSuccess(user))).toEqual({
      ...initialState,
      user: user
    })
  })

  it('should handle loginRequest', () => {
    expect(userReducer(undefined, actions.loginRequest)).toEqual({
      ...initialState,
      loginRequest: true,
      loginFailed: false,
      message: ''
    })
  })

  it('should handle loginFailed', () => {
    expect(userReducer(undefined, actions.loginFailed)).toEqual({
      ...initialState,
      loginRequest: false,
      loginFailed: true,
    })
  })

  it('should handle loginSuccess', () => {
    expect(userReducer(undefined, actions.loginSuccess(user))).toEqual({
      ...initialState,
      loginRequest: false,
      loginFailed: false,
      user: user,
      isLogout: false,
      message: ''
    })
  })

  it('should handle registerRequest', () => {
    expect(userReducer(undefined, actions.registerRequest)).toEqual({
      ...initialState,
      registerRequest: true,
      isRegisterFailed: false,
      registerMessage: ''
    })
  })

  it('should handle registerFailed', () => {
    expect(userReducer(undefined, actions.registerFailed('Ошибка'))).toEqual({
      ...initialState,
      registerRequest: false,
      isRegisterFailed: true,
      registerMessage: 'Ошибка'
    })
  })

  it('should handle registerSuccess', () => {
    expect(userReducer(undefined, actions.registerSuccess(user))).toEqual({
      ...initialState,
      registerRequest: false,
      isRegisterFailed: false,
      user: user,
      isLogout: false,
      registerMessage: ''
    })
  })

  it('should handle logoutRequest', () => {
    expect(userReducer(undefined, actions.logoutRequest)).toEqual({
      ...initialState,
      logoutRequest: true,
      logoutFailed: false
    })
  })

  it('should handle logoutFailed', () => {
    expect(userReducer(undefined, actions.logoutFailed)).toEqual({
      ...initialState,
      logoutRequest: false,
      logoutFailed: true
    })
  })

  it('should handle logoutSuccess', () => {
    expect(userReducer(undefined, actions.logoutSuccess)).toEqual({
      ...initialState,
      logoutRequest: false,
      logoutFailed: false,
      user: null,
      isLogout: true
    })
  })

  it('should handle updateUserInfoRequest', () => {
    expect(userReducer(undefined, actions.updateUserInfoRequest)).toEqual({
      ...initialState,
      updateInfoRequest: true,
      updateInfoSuccess: false,
      logoutFailed: false,
      message: ''
    })
  })

  it('should handle updateUserInfoFailed', () => {
    expect(userReducer(undefined, actions.updateUserInfoFailed)).toEqual({
      ...initialState,
      updateInfoRequest: false,
      updateInfoSuccess: false,
      logoutFailed: true,
      message:'Произошла ошибка'
    })
  })

  it('should handle updateUserInfoSuccess', () => {
    expect(userReducer(undefined, actions.updateUserInfoSuccess(user))).toEqual({
      ...initialState,
      updateInfoRequest: false,
      updateInfoSuccess: true,
      logoutFailed: false,
      message: 'Данные успешно обновлены',
      user: user
    })
  })

  it('should handle setIncorrectDataMessage', () => {
    expect(userReducer(undefined, actions.setIncorrectDataMessage('Ошибка'))).toEqual({
      ...initialState,
      message: 'Ошибка'
    })
  })
})