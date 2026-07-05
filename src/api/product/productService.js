import { httpClient } from '../httpClient'

export const productService = {
  getProducts(params) {
    return httpClient.get('/api/products', { params })
  },

  getProduct(code) {
    return httpClient.get(`/api/products/${encodeURIComponent(code)}`)
  },
}
