import { createReducer } from '@reduxjs/toolkit'
import { reduxUserState } from 'helpers/types'
import {
  setUserForApp,
  reauthenticateUser,
  setReauthenticateToFalse,
} from './actions'

const initialState: reduxUserState = {
  details: null,
  isLoading: true,
  isAuthenticated: false,
  isEmailAuthenticated: false,
  reauthenticate: false,
}

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUserForApp.fulfilled, (state, action) => {
      state.details = action.payload
      state.isLoading = false
      state.isAuthenticated = !!action.payload
      state.isEmailAuthenticated =
        !!action.payload && action.payload.emailVerified
    })
    .addCase(reauthenticateUser, (state) => {
      state.reauthenticate = true
    })
    .addCase(setReauthenticateToFalse, (state) => {
      state.reauthenticate = false
    })
})
