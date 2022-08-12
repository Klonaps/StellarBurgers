import { recoveryReducer, initialState } from './reducer'
import * as actions from './actions'

describe('test recovery reducer', () => {
  it('should return the initial state', () => {
    expect(recoveryReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle recoveryRequest', () => {
    expect(recoveryReducer(undefined, actions.recoveryRequest)).toEqual({
      ...initialState,
      errorMessage: '',
      isRequest: true,
      isFailed: false
    })
  })

  it('should handle recoveryFailed', () => {
    expect(recoveryReducer(undefined, actions.recoveryFailed)).toEqual({
      ...initialState,
      isRequest: false,
      isFailed: true
    })
  })

  it('should handle recoveryEmailSendSuccess', () => {
    expect(recoveryReducer(undefined, actions.recoveryEmailSendSuccess)).toEqual({
      ...initialState,
      isRequest: false,
      isFailed: false,
      emailSended: true,
      passwordRecovered: false
    })
  })

  it('should handle recoveryPasswordSendSuccess', () => {
    expect(recoveryReducer(undefined, actions.recoveryPasswordSendSuccess)).toEqual({
      ...initialState,
      isRequest: false,
      isFailed: false,
      emailSended: false,
      passwordRecovered: true
    })
  })

  it('should handle setErrorRecoveryMessage', () => {
    expect(recoveryReducer(undefined, actions.setErrorRecoveryMessage('Ошибка'))).toEqual({
      ...initialState,
      errorMessage: 'Ошибка'
    })
  })

  it('should handle changeRecoveryStatus', () => {
    expect(recoveryReducer(undefined, actions.changeRecoveryStatus)).toEqual({
      ...initialState,
      emailSended: false
    })
  })
})