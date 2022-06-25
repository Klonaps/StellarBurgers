import {
  RECOVERY_REQUEST,
  RECOVERY_FAILED,
  RECOVERY_EMAIL_SEND_SUCCESS,
  RECOVERY_PASSWORD_SEND_SUCCESS,
  SET_ERROR_RECOVERY_MESSAGE,
  CHANGE_RECOVERY_STATUS
} from '../actions/recovery-actions'

const initialState = {
  isRequest: false,
  isFailed: false,
  emailSended: false,
  passwordRecovered: false,
  errorMessage: '',
}

export const recoveryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_RECOVERY_STATUS: {
      return {
        ...state,
        emailSended: false
      }
    }
    case RECOVERY_REQUEST: {
      return {
        ...state,
        isRequest: true,
        isFailed: false,
        errorMessage: ''
      }
    }
    case RECOVERY_FAILED: {
      return {
        ...state,
        isFailed: true,
        isRequest: false
      }
    }
    case RECOVERY_EMAIL_SEND_SUCCESS: {
      return {
        ...state,
        isFailed: false,
        isRequest: false,
        emailSended: true,
        passwordRecovered: false
      }
    }
    case RECOVERY_PASSWORD_SEND_SUCCESS: {
      return {
        ...state,
        isFailed: false,
        isRequest: false,
        passwordRecovered: true,
        emailSended: false
      }
    }
    case SET_ERROR_RECOVERY_MESSAGE: {
      return {
        ...state,
        errorMessage: action.payload
      }
    }
    default:
      return state
  }
}