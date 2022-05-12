import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect } from 'react'

import { shouldUserReauthenticate } from 'helpers/utils'
import { showAlert } from 'redux/alert'
import {
  reauthenticateUser,
  setReauthenticateToFalse,
  setUserForApp,
} from 'redux/auth'
import { toggleModal } from 'redux/authModal'
import { useAppDispatch, useAppSelector } from 'redux/hooks'

const useGlobalAuth = () => {
  const dispatch = useAppDispatch()
  const { reauthenticate } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (reauthenticate) {
      let auth = getAuth()
      signOut(auth)
      dispatch(
        showAlert({
          text: 'Your session has expired. Please log in again',
          severity: 'info',
        })
      )
      dispatch(toggleModal(false))
      dispatch(setReauthenticateToFalse())
    }
  }, [reauthenticate])

  useEffect(() => {
    let auth = getAuth()

    let unsubsriber = onAuthStateChanged(auth, async (user) => {
      if (shouldUserReauthenticate(user)) {
        dispatch(reauthenticateUser())
        return
      }

      dispatch(setUserForApp(user))
    })

    return () => unsubsriber()
  }, [])
}

export default useGlobalAuth
