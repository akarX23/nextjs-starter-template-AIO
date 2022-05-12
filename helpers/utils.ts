import { User } from 'firebase/auth'
import { statusCode } from './constants'
import { firebaseAdminUser } from './types'

export const shouldUserReauthenticate = (user: User) => {
  if (!user) return false

  let hoursForSignIn = 24

  const lastSignInTime = new Date(user.metadata.lastSignInTime)
  const lastSignInTimeTimeStamp = Math.round(lastSignInTime.getTime() / 1000)
  const maxSignInTimeStamp =
    Math.round(new Date().getTime() / 1000) - hoursForSignIn * 3600

  if (lastSignInTimeTimeStamp < maxSignInTimeStamp) {
    return true
  }
  return false
}

export const getDbUserObjectFromFirebaseAuth = (
  firebaseAdminUser: firebaseAdminUser,
  authToken: string
) => {
  let userToSave = {
    email: firebaseAdminUser.email,
    uid: firebaseAdminUser.uid,
    name: firebaseAdminUser.name,
    photoURL: firebaseAdminUser.picture,
    emailVerified: firebaseAdminUser.emailVerified,
    phone: firebaseAdminUser.phone_number,
    providerId: firebaseAdminUser.firebase.sign_in_provider,
    authToken: authToken,
  }

  return userToSave
}

export const isStatusCodeErr = (
  err: Error,
  codeToCheck = statusCode.InternalError
) => {
  console.log(err)
  return (
    err.message.split(' ').pop().toString().trim() === codeToCheck.toString()
  )
}
