import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'

import { showAlert } from 'redux/alert'
import { toggleModal } from 'redux/authModal'
import { useAppDispatch } from 'redux/hooks'

const useFirebaseAuth = () => {
  const dispatch = useAppDispatch()

  const signInWithGoogle = () => {
    var googleProvider = new GoogleAuthProvider()
    signInWithPopup(getAuth(), googleProvider).catch((error) => {
      console.log(error)
      dispatch(showAlert({}, true))
    })
  }

  const signOutFromApp = () => {
    let auth = getAuth()

    if (auth.currentUser)
      signOut(auth)
        .then(() => {
          dispatch(showAlert({ text: 'Logged out successfully!' }))
          dispatch(toggleModal(false, false))
        })
        .catch((error) => {
          console.log('error', error)
          dispatch(showAlert({}, true))
        })
  }

  return {
    getAuth,
    signOutFromApp,
    signInWithGoogle,
  }
}

export default useFirebaseAuth
