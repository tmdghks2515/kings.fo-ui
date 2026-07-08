'use client'

import Link from 'next/link'
import { Box, Stack, Typography } from '@mui/material'
import AppImage from '../image/AppImage'

export default function BrandShortcuts({ brands = [] }) {
  return (
    <Box
      sx={{
        backgroundColor: '#111111',
        color: '#ffffff',
        mx: { xs: -2, sm: -3, md: 0 },
        px: { xs: 2, sm: 3, md: 7 },
        py: { xs: 5, md: 8 },
      }}
    >
      <Stack spacing={{ xs: 3, md: 4 }} sx={{ alignItems: 'center' }}>
        <Typography
          component="h3"
          sx={{
            color: '#ffffff',
            fontSize: { xs: '1.45rem', md: '2rem' },
            fontWeight: 800,
            lineHeight: 1.2,
            textAlign: 'center',
            wordBreak: 'keep-all',
          }}
        >
          브랜드 바로가기
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 1.25, md: 2 },
            gridTemplateColumns: {
              xs: 'repeat(2, minmax(0, 1fr))',
              sm: 'repeat(3, minmax(0, 1fr))',
              md: 'repeat(4, minmax(0, 1fr))',
              lg: 'repeat(6, minmax(0, 1fr))',
            },
            width: '100%',
            maxWidth: 1200,
          }}
        >
          {brands.map((brand) => (
            <BrandTile key={brand.id} brand={brand} />
          ))}
        </Box>
      </Stack>
    </Box>
  )
}

function BrandTile({ brand }) {
  return (
    <Box
      component={Link}
      href={brand.link || '/'}
      sx={{
        alignItems: 'center',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: 2,
        color: '#ffffff',
        display: 'flex',
        height: { xs: 72, md: 88 },
        justifyContent: 'center',
        minWidth: 0,
        px: 2,
        textDecoration: 'none',
      }}
    >
      {brand.logoSrc ? (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 128,
            height: 36,
          }}
        >
          <AppImage
            unoptimized
            src={brand.logoSrc}
            alt={brand.name || ''}
            fill
            sizes="128px"
            style={{
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Box>
      ) : (
        <Typography
          sx={{
            color: '#ffffff',
            fontSize: { xs: '1rem', md: '1.15rem' },
            fontWeight: 800,
            lineHeight: 1.2,
            overflow: 'hidden',
            textAlign: 'center',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%',
          }}
        >
          {brand.name}
        </Typography>
      )}
    </Box>
  )
}
