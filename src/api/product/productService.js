import { httpClient } from '../httpClient'

export const productService = {
  getProducts(params) {
    return httpClient.get('/api/public/products', { params })
  },

  getProduct(code) {
    return httpClient.get(`/api/public/products/${encodeURIComponent(code)}`)
  },
}
