import { createReducer } from "@reduxjs/toolkit"
import {
  recoveryRequest,
  recoveryFailed,
  recoveryEmailSendSuccess,
  recoveryPasswordSendSuccess,
  setErrorRecoveryMessage,
  changeRecoveryStatus
} from './actions'

type TReacoveryState = {
  isRequest: boolean,
  isFailed: boolean,
  emailSended: boolean,
  passwordRecovered: boolean,
  errorMessage: string,
}
export const initialState: TReacoveryState = {
  isRequest: false,
  isFailed: false,
  emailSended: false,
  passwordRecovered: false,
  errorMessage: '',
}

export const recoveryReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(recoveryRequest, (state) => {
      state.isRequest = true
      state.isFailed = false
      state.errorMessage = ''
  })
  .addCase(recoveryFailed, (state) => {
      state.isRequest = false
      state.isFailed = true
  })
  .addCase(recoveryEmailSendSuccess, (state) => {
      state.isRequest = false
      state.isFailed = false
      state.emailSended = true
      state.passwordRecovered = false
  })
  .addCase(recoveryPasswordSendSuccess, (state) => {
      state.isRequest = false
      state.isFailed = false
      state.emailSended = false
      state.passwordRecovered = true
  })
  .addCase(setErrorRecoveryMessage, (state, action) => {
      state.errorMessage = action.payload
  })
  .addCase(changeRecoveryStatus, (state) => {
      state.emailSended = false
  })
})