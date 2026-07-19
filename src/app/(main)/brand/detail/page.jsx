'use client'

import { Suspense, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material'
import ContentContainer from '@/components/layout/ContentContainer'
import AppImage from '@/components/image/AppImage'
import { API_BASE_URL } from '@/api/httpClient'
import { brandService } from '@/api/brand/brandService'
import { productService } from '@/api/product/productService'
import { productDetailHref } from '@/utils/routes'

const brandKeys = {
  detail: (id) => ['brands', id],
}

const productKeys = {
  listByBrand: (brandId) => ['products', { brandId }],
}

const EMPTY_HERO_SRC =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="720" viewBox="0 0 1440 720"><rect width="1440" height="720" fill="%23f5f5f3"/><path d="M0 560 C240 470 410 620 650 520 C910 412 1070 490 1440 360 L1440 720 L0 720 Z" fill="%23e7e0d6"/><path d="M0 0 H1440 V260 C1160 330 840 240 560 320 C320 390 160 310 0 360 Z" fill="%23d9e3df"/></svg>'

const EMPTY_LOGO_SRC =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="360" height="180" viewBox="0 0 360 180"><rect width="360" height="180" rx="18" fill="%23ffffff"/><rect x="56" y="78" width="248" height="24" rx="12" fill="%23d1d5db"/></svg>'

const EMPTY_PRODUCT_SRC =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="720" height="720" viewBox="0 0 720 720"><rect width="720" height="720" fill="%23f7f7f5"/><rect x="188" y="174" width="344" height="408" rx="18" fill="%23e5e7eb"/><path d="M246 288 L318 222 L404 322 L460 270 L532 356 V582 H188 V360 Z" fill="%23d1d5db"/><circle cx="462" cy="226" r="34" fill="%23cbd5e1"/></svg>'

const toImageSrc = (fileResource, fallbackSrc) => {
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

const toParagraphs = (text) =>
  String(text || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

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

const toProductImageSrc = (product) => {
  const images = sortByOrder(product?.images)
  const mainImage = images.find((image) => image.main) ?? images[0]

  return toImageSrc(mainImage, EMPTY_PRODUCT_SRC)
}

const toOptionNames = (product) =>
  (Array.isArray(product?.options) ? product.options : [])
    .map((option) => option?.name)
    .filter(Boolean)

const formatPrice = (price) => {
  if (price === undefined || price === null || price === '') {
    return ''
  }

  return `${Number(price).toLocaleString('ko-KR')}원`
}

function ProductCard({ product }) {
  const optionNames = toOptionNames(product)

  return (
    <Stack spacing={1.35} sx={{ minWidth: 0 }}>
      <Box
        component={Link}
        href={productDetailHref(product.code)}
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
        <Typography
          component={Link}
          href={productDetailHref(product.code)}
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

function BrandDetailContent() {
  const searchParams = useSearchParams()
  const brandId = searchParams.get('id')

  const brandQuery = useQuery({
    queryKey: brandKeys.detail(brandId),
    queryFn: () => brandService.getBrand(brandId),
    enabled: Boolean(brandId),
  })

  const productsQuery = useQuery({
    queryKey: productKeys.listByBrand(brandId),
    queryFn: () => productService.getProducts({ brandId }),
    enabled: Boolean(brandId),
  })

  const brand = brandQuery.data
  const introduceParagraphs = useMemo(() => toParagraphs(brand?.introduce), [brand?.introduce])
  const products = useMemo(
    () => (Array.isArray(productsQuery.data) ? productsQuery.data : []),
    [productsQuery.data]
  )

  if (brandQuery.isLoading) {
    return (
      <Stack alignItems="center" sx={{ py: 10 }}>
        <CircularProgress />
      </Stack>
    )
  }

  if (brandQuery.error || productsQuery.error) {
    const error = brandQuery.error || productsQuery.error
    const errorMessage =
      error instanceof Error ? error.message : '브랜드 정보를 불러오지 못했습니다.'

    return (
      <ContentContainer sx={{ py: { xs: 4, md: 7 } }}>
        <Alert severity="error">{errorMessage}</Alert>
      </ContentContainer>
    )
  }

  if (!brand) {
    return (
      <ContentContainer sx={{ py: { xs: 4, md: 7 } }}>
        <Alert severity="info">브랜드 정보를 찾을 수 없습니다.</Alert>
      </ContentContainer>
    )
  }

  const heroImageSrc = toImageSrc(brand.mainImage, EMPTY_HERO_SRC)
  const logoImageSrc = toImageSrc(brand.logo, EMPTY_LOGO_SRC)

  return (
    <Stack sx={{ width: '100%', bgcolor: '#fff' }}>
      <Box
        component="section"
        sx={{
          position: 'relative',
          minHeight: { xs: 430, md: 620 },
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
          bgcolor: '#111827',
        }}
      >
        <AppImage
          src={heroImageSrc}
          fallbackSrc={EMPTY_HERO_SRC}
          alt={`${brand.name} 대표 이미지`}
          fill
          priority
          sizes="100vw"
          unoptimized
          style={{
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(15, 23, 42, 0.06) 0%, rgba(15, 23, 42, 0.22) 48%, rgba(15, 23, 42, 0.76) 100%)',
          }}
        />

        <ContentContainer
          sx={{
            position: 'relative',
            zIndex: 1,
            pb: { xs: 5, md: 7 },
          }}
        >
          <Stack
            spacing={{ xs: 2.5, md: 3 }}
            sx={{
              maxWidth: 720,
              color: '#fff',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: 132, md: 176 },
                height: { xs: 66, md: 88 },
                border: '1px solid rgba(255, 255, 255, 0.42)',
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                overflow: 'hidden',
              }}
            >
              <AppImage
                src={logoImageSrc}
                fallbackSrc={EMPTY_LOGO_SRC}
                alt={`${brand.name} 로고`}
                fill
                sizes="176px"
                unoptimized
                style={{ objectFit: 'contain', padding: 18 }}
              />
            </Box>

            <Stack spacing={1.5}>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: 38, sm: 52, md: 76 },
                  fontWeight: 700,
                  lineHeight: 0.98,
                  letterSpacing: 0,
                  overflowWrap: 'anywhere',
                }}
              >
                {brand.name}
              </Typography>
            </Stack>
          </Stack>
        </ContentContainer>
      </Box>

      <ContentContainer sx={{ py: { xs: 5, md: 8 } }}>
        <Stack spacing={{ xs: 5, md: 7 }}>
          <Stack spacing={2.5} sx={{ maxWidth: 840, minWidth: 0 }}>
            <Typography
              component="h2"
              sx={{
                color: '#111827',
                fontSize: { xs: 25, md: 34 },
                fontWeight: 700,
                lineHeight: 1.25,
                letterSpacing: 0,
              }}
            >
              브랜드 스토리
            </Typography>

            <Stack spacing={1.8}>
              {(introduceParagraphs.length
                ? introduceParagraphs
                : ['아직 등록된 브랜드 소개가 없습니다.']
              ).map((paragraph) => (
                <Typography
                  key={paragraph}
                  sx={{
                    color: '#475569',
                    fontSize: { xs: 15, md: 16 },
                    lineHeight: 1.9,
                  }}
                >
                  {paragraph}
                </Typography>
              ))}
            </Stack>
          </Stack>

          <Stack component="section" spacing={3}>
            <Stack spacing={1}>
              <Typography
                component="h2"
                sx={{
                  color: '#111827',
                  fontSize: { xs: 24, md: 32 },
                  fontWeight: 700,
                  lineHeight: 1.25,
                  letterSpacing: 0,
                }}
              >
                상품
              </Typography>
              <Typography sx={{ color: '#64748b', fontSize: { xs: 14, md: 16 } }}>
                {productsQuery.isLoading
                  ? '상품을 불러오는 중입니다.'
                  : `${products.length.toLocaleString('ko-KR')}개의 상품`}
              </Typography>
            </Stack>

            {productsQuery.isLoading ? (
              <Stack alignItems="center" sx={{ py: 8 }}>
                <CircularProgress />
              </Stack>
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
                    다른 브랜드의 상품을 둘러보세요.
                  </Typography>
                </Stack>
              </Box>
            )}
          </Stack>
        </Stack>
      </ContentContainer>
    </Stack>
  )
}

export default function BrandDetailPage() {
  return (
    <Suspense fallback={null}>
      <BrandDetailContent />
    </Suspense>
  )
}
