import { internalError, statusCode } from 'helpers/constants'
import { ApiController, userInDb } from 'helpers/types'
import * as User from 'models/User'

export const setUserForApp = async (
  userDetails: userInDb,
  uid: string
): Promise<ApiController> => {
  try {
    if (!userDetails || !uid) return { status: statusCode.Unauthorized }

    let userFromDb = await User.upsertOne({ uid }, userDetails)
    return { status: statusCode.Success, data: userFromDb }
  } catch (error) {
    console.log('Authentication error', error)
    return internalError
  }
}
