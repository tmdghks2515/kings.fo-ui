const encodeRouteParam = (value) => encodeURIComponent(String(value ?? ''))

const decodeRouteParam = (value) => {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export const productDetailHref = (code) =>
  `/product/detail?code=${encodeRouteParam(code)}`

export const brandDetailHref = (brandId) =>
  `/brand/detail?id=${encodeRouteParam(brandId)}`

export const categoryHref = (categoryId) =>
  categoryId ? `/category?id=${encodeRouteParam(categoryId)}` : '/category'

export const toStaticPublicHref = (href) => {
  if (typeof href !== 'string') {
    return '/'
  }

  const productMatch = href.match(/^\/product\/([^/?#]+)$/)
  if (productMatch) {
    return productDetailHref(decodeRouteParam(productMatch[1]))
  }

  const brandMatch = href.match(/^\/brand\/([^/?#]+)$/)
  if (brandMatch) {
    return brandDetailHref(decodeRouteParam(brandMatch[1]))
  }

  const categoryMatch = href.match(/^\/category\/([^/?#]+)$/)
  if (categoryMatch) {
    return categoryHref(decodeRouteParam(categoryMatch[1]))
  }

  return href
}
