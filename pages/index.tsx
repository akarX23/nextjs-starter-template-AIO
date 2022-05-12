import { Button } from '@mui/material'
import useFirebaseAuth from 'helpers/hooks/useFirebaseAuth'
import Wrapper from 'hoc/Wrapper'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'

const Kanye: React.FC = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)
  const { signInWithGoogle, signOutFromApp } = useFirebaseAuth()

  useEffect(() => {
    console.log(auth)
  }, [auth])

  return (
    <div>
      {!auth.isAuthenticated ? (
        <Button color="primary" onClick={signInWithGoogle}>
          Sign In
        </Button>
      ) : (
        <Button color="primary" onClick={signOutFromApp}>
          Sign out
        </Button>
      )}
    </div>
  )
}

export default Wrapper(Kanye)
