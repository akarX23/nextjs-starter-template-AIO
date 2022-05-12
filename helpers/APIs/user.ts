import api, { getAuthApi } from './index'

export const getDbUser = async () =>
  (await getAuthApi()).get('/auth').then((response) => response.data)

export const initializeAuthWithDb = async () =>
  (await getAuthApi()).post('/auth').then((response) => response.data)
