import {statusCode } from './constants'

export const isStatusCodeErr = (
  err: Error,
  codeToCheck = statusCode.InternalError
): boolean => {
  console.log(err)
  return (
    err.message.split(' ').pop().toString().trim() === codeToCheck.toString()
  )
}
