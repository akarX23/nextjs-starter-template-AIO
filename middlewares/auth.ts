import * as User from 'models/User'
import { statusCode } from 'helpers/constants'
import admin from 'helpers/firebaseAdmin'
import { getDbUserObjectFromFirebaseAuth } from 'helpers/utils'

import type { NextApiResponse } from 'next'
import { CustomeApiRequest } from 'helpers/types'

// Login for development
let uidDev =
  process.env.NODE_ENV === 'development' ? process.env.SAMPLE_UID_DEV : ''

const auth =
  (handler: Function, authReqd = true) =>
  async (req: CustomeApiRequest, res: NextApiResponse) => {
    // GET CURRENT USER'S AUTHENTICATION STATE
    // ATTACH USER IN THE REQUEST OBJECT
    try {
      let authToken = req.headers.authtoken

      let firebaseUser = await admin.auth().verifyIdToken(authToken)

      console.log('Firebase user', firebaseUser)

      let userFromDb = await User.findByToken(authToken)
      let uid = firebaseUser?.uid || userFromDb?.uid || uidDev

      if (!userFromDb && authReqd) {
        throw new Error('User not found')
      }

      req.user = userFromDb
      req.uid = uid
      req.userId = userFromDb?._id
      req.tempUser =
        !userFromDb && firebaseUser
          ? getDbUserObjectFromFirebaseAuth(firebaseUser, authToken)
          : null

      return handler(req, res)
    } catch (error) {
      console.log('Auth Middleware ', error)
      return res.status(statusCode.Unauthorized).json(error)
    }
  }

export default auth
