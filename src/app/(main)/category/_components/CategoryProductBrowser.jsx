'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import ContentContainer from '@/components/layout/ContentContainer'
import AppImage from '@/components/image/AppImage'
import { API_BASE_URL } from '@/api/httpClient'
import { categoryService } from '@/api/category/categoryService'
import { productService } from '@/api/product/productService'

const categoryKeys = {
  list: ['product-categories'],
}

const productKeys = {
  listByCategory: (categoryId) => ['products', { categoryId }],
}

const EMPTY_PRODUCT_SRC =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="720" height="720" viewBox="0 0 720 720"><rect width="720" height="720" fill="%23f7f7f5"/><rect x="188" y="174" width="344" height="408" rx="18" fill="%23e5e7eb"/><path d="M246 288 L318 222 L404 322 L460 270 L532 356 V582 H188 V360 Z" fill="%23d1d5db"/><circle cx="462" cy="226" r="34" fill="%23cbd5e1"/></svg>'

const toImageSrc = (fileResource, fallbackSrc = EMPTY_PRODUCT_SRC) => {
  const storageKey = typeof fileResource === 'string' ? fileResource : fileResource?.storageKey

  if (!storageKey) {
    return fallbackSrc
  }
  if (/^(https?:)?\/\//.test(storageKey) || storageKey.startsWith('data:')) {
    return storageKey
  }

  const normalizedStorageKey = String(storageKey).replace(/^\/+/, '')
  return `${API_BASE_URL}/files/${normalizedStorageKey}`
}

const formatPrice = (price) => {
  if (price === undefined || price === null || price === '') {
    return ''
  }

  return `${Number(price).toLocaleString('ko-KR')}원`
}

const sortByOrder = (items) =>
  [...(Array.isArray(items) ? items : [])].sort((first, second) => {
    const orderComparison = (first.sortOrder ?? 0) - (second.sortOrder ?? 0)

    if (orderComparison !== 0) {
      return orderComparison
    }

    return String(first.name ?? first.storageKey ?? '').localeCompare(
      String(second.name ?? second.storageKey ?? '')
    )
  })

const findCategoryPath = (categories, selectedCategoryId) => {
  if (!selectedCategoryId) {
    return []
  }

  const normalizedSelectedCategoryId = String(selectedCategoryId)

  for (const category of categories) {
    if (String(category.id) === normalizedSelectedCategoryId) {
      return [category]
    }

    const childPath = findCategoryPath(category.children || [], selectedCategoryId)

    if (childPath.length > 0) {
      return [category, ...childPath]
    }
  }

  return []
}

const toCategoryLevels = (categories, selectedPath) => {
  const levels = [sortByOrder(categories)]

  selectedPath.forEach((category) => {
    const children = sortByOrder(category.children)

    if (children.length > 0) {
      levels.push(children)
    }
  })

  return levels.filter((level) => level.length > 0)
}

const toProductImageSrc = (product) => {
  const images = sortByOrder(product?.images)
  const mainImage = images.find((image) => image.main) ?? images[0]

  return toImageSrc(mainImage)
}

const toOptionNames = (product) =>
  (Array.isArray(product?.options) ? product.options : [])
    .map((option) => option?.name)
    .filter(Boolean)

const ALL_CATEGORY_VALUE = 'all'

function CategoryDepthSelector({ levels, selectedPath }) {
  const router = useRouter()

  const handleCategoryChange = (event, levelIndex) => {
    const categoryId = event.target.value

    if (categoryId === ALL_CATEGORY_VALUE) {
      const parentCategory = selectedPath[levelIndex - 1]

      router.push(parentCategory?.id ? `/category/${parentCategory.id}` : '/category')
      return
    }

    if (categoryId) {
      router.push(`/category/${categoryId}`)
    }
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: `repeat(${Math.min(levels.length, 3)}, minmax(180px, 240px))`,
        },
        justifyContent: 'start',
        gap: { xs: 1.5, md: 2 },
      }}
    >
      {levels.map((categories, levelIndex) => (
        <FormControl
          key={`level-${levelIndex}`}
          size="small"
          sx={{
            width: { xs: '100%', md: 240 },
            minWidth: 0,
          }}
        >
          <InputLabel id={`category-level-${levelIndex + 1}-label`}>
            카테고리 {levelIndex + 1}
          </InputLabel>
          <Select
            labelId={`category-level-${levelIndex + 1}-label`}
            value={
              selectedPath[levelIndex]?.id
                ? String(selectedPath[levelIndex].id)
                : ALL_CATEGORY_VALUE
            }
            label={`카테고리 ${levelIndex + 1}`}
            onChange={(event) => handleCategoryChange(event, levelIndex)}
            sx={{
              bgcolor: '#fff',
              fontSize: 14,
              fontWeight: 700,
              '& .MuiSelect-select': {
                minHeight: '1.45em',
              },
            }}
          >
            <MenuItem
              value={ALL_CATEGORY_VALUE}
              sx={{
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              전체
            </MenuItem>
            {categories.map((category) => {
              return (
                <MenuItem
                  key={category.id}
                  value={String(category.id)}
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {category.name}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      ))}
    </Box>
  )
}

function ProductCard({ product }) {
  const optionNames = toOptionNames(product)

  return (
    <Stack spacing={1.35} sx={{ minWidth: 0 }}>
      <Box
        component={Link}
        href={`/product/${encodeURIComponent(product.code)}`}
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          display: 'block',
          bgcolor: '#f3f4f6',
          overflow: 'hidden',
        }}
      >
        <AppImage
          src={toProductImageSrc(product)}
          fallbackSrc={EMPTY_PRODUCT_SRC}
          alt={product.name || '상품 이미지'}
          fill
          sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
          unoptimized
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Stack spacing={0.75} sx={{ minWidth: 0 }}>
        {product.brandName ? (
          <Typography
            component={Link}
            href={product.brandId ? `/brand/${product.brandId}` : '#'}
            sx={{
              alignSelf: 'flex-start',
              color: '#64748b',
              fontSize: 13,
              fontWeight: 700,
              lineHeight: 1.2,
              textDecoration: 'none',
            }}
          >
            {product.brandName}
          </Typography>
        ) : null}

        <Typography
          component={Link}
          href={`/product/${encodeURIComponent(product.code)}`}
          sx={{
            color: '#111827',
            display: '-webkit-box',
            fontSize: { xs: 15, md: 17 },
            fontWeight: 700,
            lineHeight: 1.4,
            minHeight: '2.8em',
            overflow: 'hidden',
            textDecoration: 'none',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            wordBreak: 'keep-all',
          }}
        >
          {product.name}
        </Typography>

        {optionNames.length > 0 ? (
          <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: 'wrap', minHeight: 24 }}>
            {optionNames.slice(0, 3).map((optionName) => (
              <Box
                key={optionName}
                component="span"
                sx={{
                  maxWidth: '100%',
                  border: '1px solid rgba(17, 24, 39, 0.1)',
                  color: '#475569',
                  fontSize: 12,
                  fontWeight: 600,
                  lineHeight: 1.2,
                  overflow: 'hidden',
                  px: 0.75,
                  py: 0.35,
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {optionName}
              </Box>
            ))}
            {optionNames.length > 3 ? (
              <Box
                component="span"
                sx={{
                  border: '1px solid rgba(17, 24, 39, 0.1)',
                  color: '#64748b',
                  fontSize: 12,
                  fontWeight: 600,
                  lineHeight: 1.2,
                  px: 0.75,
                  py: 0.35,
                }}
              >
                +{optionNames.length - 3}
              </Box>
            ) : null}
          </Stack>
        ) : null}

        <Typography
          sx={{
            color: '#111827',
            fontSize: { xs: 17, md: 19 },
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          {formatPrice(product.price)}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default function CategoryProductBrowser({ selectedCategoryId }) {
  const hasSelectedCategory = Boolean(selectedCategoryId)

  const categoriesQuery = useQuery({
    queryKey: categoryKeys.list,
    queryFn: categoryService.getCategories,
  })

  const productsQuery = useQuery({
    queryKey: productKeys.listByCategory(selectedCategoryId),
    queryFn: () => productService.getProducts({ categoryId: selectedCategoryId }),
    enabled: hasSelectedCategory,
  })

  const categories = useMemo(
    () => sortByOrder(Array.isArray(categoriesQuery.data) ? categoriesQuery.data : []),
    [categoriesQuery.data]
  )
  const selectedPath = useMemo(
    () => findCategoryPath(categories, selectedCategoryId),
    [categories, selectedCategoryId]
  )
  const selectedCategory = selectedPath[selectedPath.length - 1]
  const categoryLevels = useMemo(
    () => toCategoryLevels(categories, selectedPath),
    [categories, selectedPath]
  )
  const products = useMemo(
    () => (Array.isArray(productsQuery.data) ? productsQuery.data : []),
    [productsQuery.data]
  )

  if (categoriesQuery.isLoading || (hasSelectedCategory && productsQuery.isLoading)) {
    return (
      <Stack alignItems="center" sx={{ py: 10 }}>
        <CircularProgress />
      </Stack>
    )
  }

  if (categoriesQuery.error || productsQuery.error) {
    const error = categoriesQuery.error || productsQuery.error
    const errorMessage =
      error instanceof Error ? error.message : '카테고리 상품 목록을 불러오지 못했습니다.'

    return (
      <ContentContainer sx={{ py: { xs: 4, md: 7 } }}>
        <Alert severity="error">{errorMessage}</Alert>
      </ContentContainer>
    )
  }

  if (hasSelectedCategory && !selectedCategory) {
    return (
      <ContentContainer sx={{ py: { xs: 4, md: 7 } }}>
        <Alert severity="info">카테고리 정보를 찾을 수 없습니다.</Alert>
      </ContentContainer>
    )
  }

  return (
    <Stack sx={{ width: '100%', bgcolor: '#fff' }}>
      <Box
        component="section"
        sx={{
          borderBottom: '1px solid rgba(17, 24, 39, 0.1)',
          bgcolor: '#fff',
        }}
      >
        <ContentContainer sx={{ py: { xs: 4, md: 6 } }}>
          <Stack spacing={3}>
            {categoryLevels.length > 0 ? (
              <CategoryDepthSelector levels={categoryLevels} selectedPath={selectedPath} />
            ) : (
              <Alert severity="info">등록된 카테고리가 없습니다.</Alert>
            )}

            <Stack spacing={1.25}>
              <Typography
                sx={{
                  color: '#94a3b8',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 0,
                  textTransform: 'uppercase',
                }}
              >
                Category
              </Typography>
              <Typography
                component="h1"
                sx={{
                  color: '#111827',
                  fontSize: { xs: 26, md: 40 },
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: 0,
                  overflowWrap: 'anywhere',
                }}
              >
                {selectedCategory?.name || '카테고리'}
              </Typography>
              <Typography sx={{ color: '#64748b', fontSize: { xs: 14, md: 16 } }}>
                {hasSelectedCategory
                  ? `${products.length.toLocaleString('ko-KR')}개의 상품`
                  : '카테고리를 선택하면 상품 목록이 표시됩니다.'}
              </Typography>
            </Stack>
          </Stack>
        </ContentContainer>
      </Box>

      <ContentContainer sx={{ py: { xs: 4, md: 7 } }}>
        {!hasSelectedCategory ? (
          <Box
            sx={{
              border: '1px solid rgba(17, 24, 39, 0.1)',
              bgcolor: '#fff',
              px: { xs: 2.5, md: 4 },
              py: { xs: 6, md: 8 },
            }}
          >
            <Stack spacing={1.25} alignItems="center">
              <Typography
                sx={{
                  color: '#111827',
                  fontSize: { xs: 19, md: 22 },
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                카테고리를 선택해 주세요.
              </Typography>
              <Typography sx={{ color: '#64748b', fontSize: 14, textAlign: 'center' }}>
                상단에서 카테고리를 선택하면 해당 상품을 볼 수 있습니다.
              </Typography>
            </Stack>
          </Box>
        ) : products.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, minmax(0, 1fr))',
                sm: 'repeat(3, minmax(0, 1fr))',
                lg: 'repeat(4, minmax(0, 1fr))',
              },
              columnGap: { xs: 1.5, sm: 2, md: 3 },
              rowGap: { xs: 4, md: 5 },
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.code} product={product} />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              border: '1px solid rgba(17, 24, 39, 0.1)',
              bgcolor: '#fff',
              px: { xs: 2.5, md: 4 },
              py: { xs: 6, md: 8 },
            }}
          >
            <Stack spacing={1.25} alignItems="center">
              <Typography
                sx={{
                  color: '#111827',
                  fontSize: { xs: 19, md: 22 },
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                등록된 상품이 없습니다.
              </Typography>
              <Typography sx={{ color: '#64748b', fontSize: 14, textAlign: 'center' }}>
                다른 카테고리의 상품을 둘러보세요.
              </Typography>
            </Stack>
          </Box>
        )}
      </ContentContainer>
    </Stack>
  )
}
