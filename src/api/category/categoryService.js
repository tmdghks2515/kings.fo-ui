import { httpClient } from '../httpClient'

export const categoryService = {
  getCategories() {
    return httpClient.get('/api/public/product-categories')
  },

  getCategory(id) {
    return httpClient.get(`/api/public/product-categories/${encodeURIComponent(id)}`)
  },
}
