'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Alert, Box, Button, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import ContentContainer from '@/components/layout/ContentContainer'
import FallbackImage from '@/components/image/FallbackImage'
import { API_BASE_URL } from '@/api/httpClient'
import { brandService } from '@/api/brand/brandService'

const brandKeys = {
  detail: (id) => ['brands', id],
}

const EMPTY_HERO_SRC =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="720" viewBox="0 0 1440 720"><rect width="1440" height="720" fill="%23f5f5f3"/><path d="M0 560 C240 470 410 620 650 520 C910 412 1070 490 1440 360 L1440 720 L0 720 Z" fill="%23e7e0d6"/><path d="M0 0 H1440 V260 C1160 330 840 240 560 320 C320 390 160 310 0 360 Z" fill="%23d9e3df"/></svg>'

const EMPTY_LOGO_SRC =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="360" height="180" viewBox="0 0 360 180"><rect width="360" height="180" rx="18" fill="%23ffffff"/><rect x="56" y="78" width="248" height="24" rx="12" fill="%23d1d5db"/></svg>'

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

export default function BrandDetailPage() {
  const params = useParams()
  const brandId = params?.id

  const brandQuery = useQuery({
    queryKey: brandKeys.detail(brandId),
    queryFn: () => brandService.getBrand(brandId),
    enabled: Boolean(brandId),
  })

  const brand = brandQuery.data
  const introduceParagraphs = useMemo(() => toParagraphs(brand?.introduce), [brand?.introduce])

  if (brandQuery.isLoading) {
    return (
      <Stack alignItems="center" sx={{ py: 10 }}>
        <CircularProgress />
      </Stack>
    )
  }

  if (brandQuery.error) {
    const errorMessage =
      brandQuery.error instanceof Error
        ? brandQuery.error.message
        : '브랜드 정보를 불러오지 못했습니다.'

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
    <Stack sx={{ width: '100%', bgcolor: '#fbfaf8' }}>
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
        <FallbackImage
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
              <FallbackImage
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
              <Typography
                sx={{
                  maxWidth: 620,
                  color: 'rgba(255, 255, 255, 0.86)',
                  fontSize: { xs: 15, md: 18 },
                  lineHeight: 1.75,
                }}
              >
                {introduceParagraphs[0] || 'THE KINGS가 엄선한 브랜드의 감도와 제품을 만나보세요.'}
              </Typography>
            </Stack>
          </Stack>
        </ContentContainer>
      </Box>

      <ContentContainer sx={{ py: { xs: 5, md: 8 } }}>
        <Stack spacing={{ xs: 5, md: 7 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 4, md: 8 }}
            alignItems={{ xs: 'stretch', md: 'flex-start' }}
          >
            <Stack spacing={2.5} sx={{ flex: 1, minWidth: 0 }}>
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
                Brand Story
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

            <Box
              sx={{
                width: { xs: '100%', md: 360 },
                flexShrink: 0,
                border: '1px solid',
                borderColor: 'rgba(17, 24, 39, 0.1)',
                bgcolor: '#fff',
                p: { xs: 2.5, md: 3 },
              }}
            >
              <Stack spacing={2.5}>
                <Stack spacing={0.75}>
                  <Typography
                    sx={{
                      color: '#94a3b8',
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 0,
                      textTransform: 'uppercase',
                    }}
                  >
                    Featured Brand
                  </Typography>
                  <Typography
                    sx={{
                      color: '#111827',
                      fontSize: 24,
                      fontWeight: 700,
                      lineHeight: 1.25,
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {brand.name}
                  </Typography>
                </Stack>

                <Divider />

                <Stack spacing={1.5}>
                  <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Typography sx={{ color: '#64748b', fontSize: 14 }}>큐레이션</Typography>
                    <Typography sx={{ color: '#111827', fontSize: 14, fontWeight: 700 }}>
                      THE KINGS Pick
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Typography sx={{ color: '#64748b', fontSize: 14 }}>브랜드 번호</Typography>
                    <Typography sx={{ color: '#111827', fontSize: 14, fontWeight: 700 }}>
                      #{brand.id}
                    </Typography>
                  </Stack>
                </Stack>

                <Button
                  component={Link}
                  href="/"
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: 0,
                    bgcolor: '#111827',
                    '&:hover': {
                      bgcolor: '#0f172a',
                    },
                  }}
                >
                  THE KINGS 둘러보기
                </Button>
              </Stack>
            </Box>
          </Stack>

          <Box
            component="section"
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              borderTop: '1px solid rgba(17, 24, 39, 0.12)',
              borderBottom: '1px solid rgba(17, 24, 39, 0.12)',
            }}
          >
            {[
              ['Authentic', '브랜드가 가진 고유한 감도와 방향성을 중심으로 소개합니다.'],
              ['Selected', '쇼핑 경험에 맞는 대표 이미지와 스토리를 함께 제공합니다.'],
              ['Curated', 'THE KINGS의 메인 큐레이션과 연결되는 브랜드 탐색 경험입니다.'],
            ].map(([title, description], index) => (
              <Box
                key={title}
                sx={{
                  minHeight: 180,
                  p: { xs: 3, md: 4 },
                  borderTop: {
                    xs: index === 0 ? 0 : '1px solid rgba(17, 24, 39, 0.1)',
                    md: 0,
                  },
                  borderLeft: {
                    xs: 0,
                    md: index === 0 ? 0 : '1px solid rgba(17, 24, 39, 0.1)',
                  },
                  bgcolor: index === 1 ? '#fff' : 'transparent',
                }}
              >
                <Stack spacing={1.5}>
                  <Typography
                    sx={{
                      color: '#111827',
                      fontSize: 20,
                      fontWeight: 700,
                      lineHeight: 1.25,
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography sx={{ color: '#64748b', fontSize: 14, lineHeight: 1.75 }}>
                    {description}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Box>
        </Stack>
      </ContentContainer>
    </Stack>
  )
}
