'use client'

import { Suspense, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Alert, Box, Button, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import ContentContainer from '@/components/layout/ContentContainer'
import AppImage from '@/components/image/AppImage'
import { API_BASE_URL } from '@/api/httpClient'
import { productService } from '@/api/product/productService'
import { brandDetailHref } from '@/utils/routes'

const productKeys = {
  detail: (code) => ['products', code],
}

const EMPTY_PRODUCT_SRC =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="720" height="720" viewBox="0 0 720 720"><rect width="720" height="720" fill="%23f7f7f5"/><rect x="188" y="174" width="344" height="408" rx="18" fill="%23e5e7eb"/><path d="M246 288 L318 222 L404 322 L460 270 L532 356 V582 H188 V360 Z" fill="%23d1d5db"/><circle cx="462" cy="226" r="34" fill="%23cbd5e1"/></svg>'

const OPTION_TYPE_LABELS = {
  CAPACITY: '용량',
  COLOR: '색상',
  SIZE: '사이즈',
  ETC: '옵션',
}

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

    return String(first.storageKey ?? '').localeCompare(String(second.storageKey ?? ''))
  })

const toGalleryImages = (product) => {
  const images = sortByOrder(product?.images)

  if (images.length === 0) {
    return [
      {
        imageSrc: EMPTY_PRODUCT_SRC,
        alt: product?.name || '상품 이미지',
        main: true,
      },
    ]
  }

  return images
    .map((image) => ({
      imageSrc: toImageSrc(image),
      alt: image.originalName || product?.name || '상품 이미지',
      main: image.main,
      sortOrder: image.sortOrder,
      storageKey: image.storageKey,
    }))
    .sort((first, second) => {
      if (first.main !== second.main) {
        return first.main ? -1 : 1
      }

      return (first.sortOrder ?? 0) - (second.sortOrder ?? 0)
    })
}

const groupOptions = (options) =>
  (Array.isArray(options) ? options : []).reduce((groups, option) => {
    const type = option.type || 'ETC'
    const existingGroup = groups.find((group) => group.type === type)

    if (existingGroup) {
      existingGroup.options.push(option)
      return groups
    }

    groups.push({
      type,
      label: OPTION_TYPE_LABELS[type] || OPTION_TYPE_LABELS.ETC,
      options: [option],
    })
    return groups
  }, [])

function ProductDetailContent() {
  const searchParams = useSearchParams()
  const productCode = searchParams.get('code')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const productQuery = useQuery({
    queryKey: productKeys.detail(productCode),
    queryFn: () => productService.getProduct(productCode),
    enabled: Boolean(productCode),
  })

  const product = productQuery.data
  const galleryImages = useMemo(() => toGalleryImages(product), [product])
  const detailImages = useMemo(() => sortByOrder(product?.detailImages), [product?.detailImages])
  const optionGroups = useMemo(() => groupOptions(product?.options), [product?.options])
  const selectedImage = galleryImages[selectedImageIndex] ?? galleryImages[0]

  if (productQuery.isLoading) {
    return (
      <Stack alignItems="center" sx={{ py: 10 }}>
        <CircularProgress />
      </Stack>
    )
  }

  if (productQuery.error) {
    const errorMessage =
      productQuery.error instanceof Error
        ? productQuery.error.message
        : '상품 정보를 불러오지 못했습니다.'

    return (
      <ContentContainer sx={{ py: { xs: 4, md: 7 } }}>
        <Alert severity="error">{errorMessage}</Alert>
      </ContentContainer>
    )
  }

  if (!product) {
    return (
      <ContentContainer sx={{ py: { xs: 4, md: 7 } }}>
        <Alert severity="info">상품 정보를 찾을 수 없습니다.</Alert>
      </ContentContainer>
    )
  }

  return (
    <Stack sx={{ width: '100%', bgcolor: '#fff' }}>
      <ContentContainer sx={{ py: { xs: 4, md: 7 } }}>
        <Stack spacing={{ xs: 5, md: 8 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 3.5, md: 7 }}
            alignItems={{ xs: 'stretch', md: 'flex-start' }}
          >
            <Stack
              spacing={1.5}
              sx={{
                width: { xs: '100%', md: 560 },
                flex: { xs: '1 1 auto', md: '0 1 560px' },
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  bgcolor: '#f3f4f6',
                  overflow: 'hidden',
                }}
              >
                <AppImage
                  src={selectedImage?.imageSrc}
                  fallbackSrc={EMPTY_PRODUCT_SRC}
                  alt={selectedImage?.alt || product.name}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 620px"
                  unoptimized
                  style={{ objectFit: 'cover' }}
                />
              </Box>

              {galleryImages.length > 1 ? (
                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  {galleryImages.map((image, index) => (
                    <Box
                      key={`${image.storageKey || image.imageSrc}-${index}`}
                      component="button"
                      type="button"
                      aria-label={`${product.name} 이미지 ${index + 1}`}
                      onClick={() => setSelectedImageIndex(index)}
                      sx={{
                        position: 'relative',
                        width: { xs: 64, md: 74 },
                        aspectRatio: '1 / 1',
                        border: '1px solid',
                        borderColor:
                          selectedImageIndex === index ? '#111827' : 'rgba(17, 24, 39, 0.14)',
                        bgcolor: '#fff',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        p: 0,
                      }}
                    >
                      <AppImage
                        src={image.imageSrc}
                        fallbackSrc={EMPTY_PRODUCT_SRC}
                        alt=""
                        fill
                        sizes="74px"
                        unoptimized
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
                  ))}
                </Stack>
              ) : null}
            </Stack>

            <Box
              component="section"
              sx={{
                width: { xs: '100%', md: 420 },
                flexShrink: 0,
              }}
            >
              <Stack
                spacing={3}
                sx={{
                  position: { md: 'sticky' },
                  top: { md: 96 },
                }}
              >
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                    {product.brandName ? (
                      <Typography
                        component={Link}
                        href={product.brandId ? brandDetailHref(product.brandId) : '#'}
                        sx={{
                          color: '#475569',
                          fontSize: 13,
                          fontWeight: 700,
                          lineHeight: 1.2,
                          textDecoration: 'none',
                        }}
                      >
                        {product.brandName}
                      </Typography>
                    ) : null}
                    {product.categoryName ? (
                      <Typography
                        sx={{
                          color: '#94a3b8',
                          fontSize: 13,
                          fontWeight: 600,
                          lineHeight: 1.2,
                        }}
                      >
                        {product.categoryName}
                      </Typography>
                    ) : null}
                  </Stack>

                  <Typography
                    component="h1"
                    sx={{
                      color: '#111827',
                      fontSize: { xs: 28, md: 36 },
                      fontWeight: 700,
                      lineHeight: 1.18,
                      letterSpacing: 0,
                      wordBreak: 'keep-all',
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Typography
                    sx={{
                      color: '#111827',
                      fontSize: { xs: 25, md: 30 },
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    {formatPrice(product.price)}
                  </Typography>
                </Stack>

                <Divider />

                <Stack spacing={2.5}>
                  <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Typography sx={{ color: '#64748b', fontSize: 14 }}>상품 코드</Typography>
                    <Typography
                      sx={{
                        color: '#111827',
                        fontSize: 14,
                        fontWeight: 700,
                        overflowWrap: 'anywhere',
                        textAlign: 'right',
                      }}
                    >
                      {product.code}
                    </Typography>
                  </Stack>
                </Stack>

                {optionGroups.length > 0 ? (
                  <Stack spacing={2.25}>
                    {optionGroups.map((group) => (
                      <Stack key={group.type} spacing={1.25}>
                        <Typography
                          sx={{
                            color: '#111827',
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {group.label}
                        </Typography>
                        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                          {group.options.map((option, index) => (
                            <Box
                              key={`${group.type}-${option.name}-${index}`}
                              sx={{
                                maxWidth: '100%',
                                border: '1px solid rgba(17, 24, 39, 0.14)',
                                bgcolor: '#fff',
                                color: '#111827',
                                fontSize: 14,
                                fontWeight: 600,
                                lineHeight: 1.35,
                                px: 1.5,
                                py: 1,
                                overflowWrap: 'anywhere',
                              }}
                            >
                              {option.name}
                              {option.price ? ` · ${formatPrice(option.price)}` : ''}
                            </Box>
                          ))}
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                ) : null}
              </Stack>
            </Box>
          </Stack>

          <Box
            component="section"
            sx={{
              borderTop: '1px solid rgba(17, 24, 39, 0.12)',
              pt: { xs: 4, md: 6 },
            }}
          >
            <Stack spacing={3}>
              <Stack spacing={0.75}>
                <Typography
                  component="h3"
                  sx={{
                    color: '#111827',
                    fontSize: { xs: 14, md: 20 },
                    fontWeight: 700,
                    lineHeight: 1.25,
                    letterSpacing: 0,
                  }}
                >
                  제품 상세
                </Typography>
              </Stack>

              {detailImages.length > 0 ? (
                <Stack spacing={2.5} alignItems="center">
                  {detailImages.map((image, index) => (
                    <Box
                      key={`${image.storageKey}-${index}`}
                      sx={{
                        width: '100%',
                        maxWidth: 860,
                        bgcolor: '#f3f4f6',
                        overflow: 'hidden',
                      }}
                    >
                      <AppImage
                        src={toImageSrc(image)}
                        fallbackSrc={EMPTY_PRODUCT_SRC}
                        alt={image.originalName || `${product.name} 상세 이미지 ${index + 1}`}
                        width={860}
                        height={1290}
                        sizes="(max-width: 860px) 100vw, 860px"
                        unoptimized
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Box
                  sx={{
                    border: '1px solid rgba(17, 24, 39, 0.1)',
                    bgcolor: '#fff',
                    px: { xs: 2.5, md: 4 },
                    py: { xs: 4, md: 5 },
                  }}
                >
                  <Typography sx={{ color: '#64748b', fontSize: 15, textAlign: 'center' }}>
                    등록된 상세 이미지가 없습니다.
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
        </Stack>
      </ContentContainer>
    </Stack>
  )
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={null}>
      <ProductDetailContent />
    </Suspense>
  )
}
