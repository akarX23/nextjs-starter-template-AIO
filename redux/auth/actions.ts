import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getAuth, signOut, User } from 'firebase/auth'
import { initializeAuthWithDb } from 'helpers/APIs/user'
import { userInDb } from 'helpers/types'

export const setUserForApp = createAsyncThunk(
  'SET_USER',
  async (firebaseUser: User) => {
    if (!firebaseUser) return null

    try {
      let userFromDb: userInDb = await initializeAuthWithDb()
      return userFromDb
    } catch (error) {
      console.log('Error in setting user ', error)
      signOut(getAuth())
      return null
    }
  }
)

export const reauthenticateUser = createAction('REAUTHENTICATE_USER')
export const setReauthenticateToFalse = createAction(
  'SET_REAUTHENTICATE_TO_FALSE'
)
