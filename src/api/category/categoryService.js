import { httpClient } from '../httpClient'

export const categoryService = {
  getCategories() {
    return httpClient.get('/api/product-categories')
  },

  getCategory(id) {
    return httpClient.get(`/api/product-categories/${encodeURIComponent(id)}`)
  },
}
