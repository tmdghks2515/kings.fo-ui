'use client'

import Link from 'next/link'
import { Box } from '@mui/material'
import AppImage from '../image/AppImage'

export default function NormalBanner({ items = [] }) {
  const visibleItems = items.filter((item) => item.imageSrc)

  if (visibleItems.length === 0) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: `repeat(${Math.min(visibleItems.length, 2)}, minmax(0, 1fr))`,
        },
        gap: { xs: 1.5, md: 1.5 },
        width: '100%',
      }}
    >
      {visibleItems.map(({ imageSrc, link, name }, index) => (
        <Box
          key={`${imageSrc}-${index}`}
          component={Link}
          href={link || '/'}
          sx={{
            position: 'relative',
            display: 'block',
            width: '100%',
            aspectRatio: { xs: '5 / 1', sm: '6.5 / 1', md: '7 / 1' },
            borderRadius: 1,
            bgcolor: '#f1f5f9',
            overflow: 'hidden',
          }}
        >
          <AppImage
            unoptimized
            src={imageSrc}
            alt={name || ''}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Box>
      ))}
    </Box>
  )
}
