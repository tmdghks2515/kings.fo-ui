import { httpClient } from '../httpClient'

export const brandService = {
  getBrands() {
    return httpClient.get('/api/public/brands')
  },

  getBrand(id) {
    return httpClient.get(`/api/public/brands/${id}`)
  },
}
