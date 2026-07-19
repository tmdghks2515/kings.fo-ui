'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material'
import ContentContainer from '@/components/layout/ContentContainer'
import AppImage from '@/components/image/AppImage'
import { API_BASE_URL } from '@/api/httpClient'
import { brandService } from '@/api/brand/brandService'
import { brandDetailHref } from '@/utils/routes'

const brandKeys = {
  list: ['brands'],
}

const EMPTY_LOGO_SRC =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="360" height="180" viewBox="0 0 360 180"><rect width="360" height="180" fill="%23f8fafc"/><rect x="54" y="78" width="252" height="24" rx="12" fill="%23d1d5db"/></svg>'

const toImageSrc = (fileResource, fallbackSrc = EMPTY_LOGO_SRC) => {
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

const sortBrands = (brands) =>
  [...(Array.isArray(brands) ? brands : [])].sort((first, second) => {
    const orderComparison = (first.sortOrder ?? 0) - (second.sortOrder ?? 0)

    if (orderComparison !== 0) {
      return orderComparison
    }

    return String(first.name ?? '').localeCompare(String(second.name ?? ''))
  })

function BrandCard({ brand }) {
  return (
    <Box
      component={Link}
      href={brandDetailHref(brand.id)}
      sx={{
        border: '1px solid rgba(17, 24, 39, 0.1)',
        color: 'inherit',
        display: 'block',
        minWidth: 0,
        p: { xs: 2, md: 2.5 },
        textDecoration: 'none',
        transition: 'border-color 160ms ease, transform 160ms ease',
        '&:hover': {
          borderColor: 'rgba(17, 24, 39, 0.32)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Stack spacing={2} sx={{ minWidth: 0 }}>
        <Box
          sx={{
            alignItems: 'center',
            aspectRatio: '2 / 1',
            bgcolor: '#f8fafc',
            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <AppImage
            src={toImageSrc(brand.logo)}
            fallbackSrc={EMPTY_LOGO_SRC}
            alt={`${brand.name} 로고`}
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
            unoptimized
            style={{ objectFit: 'contain', padding: 24 }}
          />
        </Box>

        <Typography
          component="h2"
          sx={{
            color: '#111827',
            fontSize: { xs: 17, md: 19 },
            fontWeight: 800,
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {brand.name}
        </Typography>
      </Stack>
    </Box>
  )
}

export default function BrandPage() {
  const brandsQuery = useQuery({
    queryKey: brandKeys.list,
    queryFn: brandService.getBrands,
  })

  const brands = useMemo(() => sortBrands(brandsQuery.data), [brandsQuery.data])

  if (brandsQuery.isLoading) {
    return (
      <Stack alignItems="center" sx={{ py: 10 }}>
        <CircularProgress />
      </Stack>
    )
  }

  if (brandsQuery.error) {
    const errorMessage =
      brandsQuery.error instanceof Error
        ? brandsQuery.error.message
        : '브랜드 목록을 불러오지 못했습니다.'

    return (
      <ContentContainer sx={{ py: { xs: 4, md: 7 } }}>
        <Alert severity="error">{errorMessage}</Alert>
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
              Brand
            </Typography>
            <Typography
              component="h1"
              sx={{
                color: '#111827',
                fontSize: { xs: 26, md: 40 },
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: 0,
              }}
            >
              브랜드
            </Typography>
            <Typography sx={{ color: '#64748b', fontSize: { xs: 14, md: 16 } }}>
              {`${brands.length.toLocaleString('ko-KR')}개의 브랜드`}
            </Typography>
          </Stack>
        </ContentContainer>
      </Box>

      <ContentContainer sx={{ py: { xs: 4, md: 7 } }}>
        {brands.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, minmax(0, 1fr))',
                sm: 'repeat(3, minmax(0, 1fr))',
                lg: 'repeat(4, minmax(0, 1fr))',
              },
              gap: { xs: 1.5, sm: 2, md: 3 },
            }}
          >
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
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
                등록된 브랜드가 없습니다.
              </Typography>
              <Typography sx={{ color: '#64748b', fontSize: 14, textAlign: 'center' }}>
                새로운 브랜드가 등록되면 이곳에 표시됩니다.
              </Typography>
            </Stack>
          </Box>
        )}
      </ContentContainer>
    </Stack>
  )
}
