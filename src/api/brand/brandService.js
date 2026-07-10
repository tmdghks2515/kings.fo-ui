import { httpClient } from '../httpClient'

export const brandService = {
  getBrands() {
    return httpClient.get('/api/brands')
  },

  getBrand(id) {
    return httpClient.get(`/api/brands/${id}`)
  },
}
