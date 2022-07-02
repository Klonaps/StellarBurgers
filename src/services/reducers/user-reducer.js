import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  SET_INCORRECT_DATA_MESSAGE,
  CHECKED_USER,
  GET_USER_SUCCESS,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_FAILED
} from '../actions/user-actions'

const initialState = {
  user: null,
  userChecked: false,
  loginRequest: false,
  loginFailed: false,
  registerRequest: false,
  registerFailed: false,
  registerMessage: '',
  message: '',
  updateInfoRequest: false,
  updateInfoFailed: false,
  updateInfoSuccess: false,
  logoutRequest: false,
  logoutFailed: false,
  isLogout: false
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: {...action.payload}
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: {...action.payload},
        loginRequest: false,
        loginFailed: false,
        isLogout: false,
        message: ''
      }
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
        message: ''
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: {...action.payload},
        registerRequest: false,
        registerFailed: false,
        registerMessage: '',
        isLogout: false
      }
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
        registerMessage: ''
      }
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
        registerMessage: action.payload
      }
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutFailed: false,
        logoutRequest: true
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutFailed: false,
        logoutRequest: false,
        user: null,
        isLogout: true,
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
      }
    }
    case SET_INCORRECT_DATA_MESSAGE: {
      return {
        ...state,
        message: action.payload
      }
    }
    case CHECKED_USER: {
      return {
        ...state,
        userChecked: true
      }
    }
    case UPDATE_USER_INFO_SUCCESS: {
      return {
        ...state,
        updateInfoSuccess: true,
        updateInfoRequest: false,
        updateInfoFailed: false,
        user: {...action.payload},
        message: 'Данные успешно обновлены'
      }
    }
    case UPDATE_USER_INFO_REQUEST: {
      return {
        ...state,
        updateInfoSuccess: false,
        updateInfoRequest: true,
        updateInfoFailed: false,
        message: ''
      }
    }
    case UPDATE_USER_INFO_FAILED: {
      return {
        ...state,
        updateInfoSuccess: false,
        updateInfoRequest: false,
        updateInfoFailed: true,
        message: 'Произошла ошибка'
      }
    }
    default:
      return state
  }
}