import dbConnect from 'helpers/dbConnect'
import auth from 'middlewares/auth'
import { statusCode } from 'helpers/constants'
import { setUserForApp } from 'controllers/user'
import { CustomeApiRequest } from 'helpers/types'
import { NextApiResponse } from 'next'

dbConnect()

async function handler(req: CustomeApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      if (!req.user) return res.status(statusCode.NotFound).json({})
      return res.status(statusCode.Success).json(req.user)
    case 'POST':
      return setUserForApp(req.user || req.tempUser, req.uid).then(
        (response) => {
          res.status(response.status).json(response.data)
        }
      )
    default:
      return res.status(statusCode.InvalidData).send('Method type not found.')
  }
}

export default auth(handler, false)
