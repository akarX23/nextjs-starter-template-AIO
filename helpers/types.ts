import type { NextApiRequest } from 'next'

export interface firebaseAdminUser {
  email: string
  uid: string
  name: string
  picture: string
  emailVerified: boolean
  phone_number: number
  firebase: {
    sign_in_provider: string
  }
}

export interface reduxAlertState {
  text?: string
  severity?: string
  vertical?: string
  horizontal?: string
  open?: boolean
}

export interface reduxAuthModalState {
  isVisible?: boolean
  signUpMode?: boolean
}

export interface reduxUserState {
  isLoading: boolean
  isAuthenticated: boolean
  isEmailAuthenticated: boolean
  reauthenticate: boolean
  details: any
}

export interface userInDb {
  uid?: string
  name?: string
  username?: string
  email?: string
  emailVerified?: boolean
  phone?: number
  linkedIn?: string
  ghName?: string
  photoURL?: string
  batch?: number
  resume?: string
  providerId?: string
  authToken?: string
}

export interface CustomeApiRequest extends NextApiRequest {
  user: userInDb
  uid: string
  userId: string
  tempUser: userInDb | null
  headers: {
    authtoken: string
  }
}

export interface ApiController {
  status: number
  data?: object | number | null
}
