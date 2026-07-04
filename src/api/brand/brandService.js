import { httpClient } from '../httpClient'

export const brandService = {
  getBrand(id) {
    return httpClient.get(`/api/brands/${id}`)
  },
}
