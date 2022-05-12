import axios from 'axios'
import { getAuth } from 'firebase/auth'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

export async function getAuthApi() {
  let authtoken = await getAuth().currentUser.getIdToken()

  const authapi = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
      authtoken,
    },
  })

  return authapi
}

export default api
