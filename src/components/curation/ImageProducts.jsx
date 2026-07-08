'use client'

import Link from 'next/link'
import { Box, Stack, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import AppImage from '../image/AppImage'

export default function ImageProducts({
  imageSrc,
  imageLink = '/',
  title = '',
  subTitle = '',
  products = [],
}) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 3, md: 5 }}
      sx={{
        alignItems: { xs: 'stretch', md: 'center' },
        width: '100%',
        minWidth: 0,
      }}
    >
      <Box
        component={Link}
        href={imageLink || '/'}
        sx={{
          position: 'relative',
          width: { xs: '100%', md: '52%' },
          aspectRatio: { xs: '16 / 10', md: '5 / 3' },
          borderRadius: 1,
          backgroundColor: '#f8fafc',
          display: 'block',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <AppImage
          unoptimized
          src={imageSrc}
          alt={title || ''}
          fill
          sizes="(max-width: 900px) 100vw, 52vw"
          style={{
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Box>

      <Stack spacing={2.25} sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            component="h3"
            sx={{
              color: '#111827',
              fontSize: { xs: '1.1rem', md: '1.35rem' },
              fontWeight: 800,
              lineHeight: 1.25,
              wordBreak: 'keep-all',
            }}
          >
            {title}
          </Typography>
          {subTitle ? (
            <Typography
              sx={{
                color: '#111827',
                fontSize: { xs: '0.85rem', md: '0.95rem' },
                lineHeight: 1.5,
                mt: 0.75,
                wordBreak: 'keep-all',
              }}
            >
              {subTitle}
            </Typography>
          ) : null}
        </Box>

        <Swiper
          style={{
            width: '100%',
            maxWidth: '100%',
          }}
          slidesPerView="auto"
          spaceBetween={12}
          breakpoints={{
            600: {
              spaceBetween: 14,
            },
            900: {
              spaceBetween: 16,
            },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={`${product.name}-${index}`} style={{ width: 'auto' }}>
              <ProductTile product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
    </Stack>
  )
}

function ProductTile({ product }) {
  const { name, price, finalPrice, imageSrc, link } = product

  return (
    <Stack
      spacing={0.9}
      sx={{
        width: { xs: 132, sm: 144, md: 152 },
        minWidth: 0,
      }}
    >
      <Box
        component={Link}
        href={link || '/'}
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: 1,
          backgroundColor: '#f8fafc',
          display: 'block',
          overflow: 'hidden',
        }}
      >
        <AppImage
          unoptimized
          src={imageSrc}
          alt={name || ''}
          fill
          sizes="(max-width: 600px) 50vw, 160px"
          style={{
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Box>

      <Typography
        component={Link}
        href={link || '/'}
        sx={{
          color: '#4b5563',
          display: '-webkit-box',
          fontSize: { xs: '0.75rem', md: '0.82rem' },
          lineHeight: 1.35,
          minHeight: '2.7em',
          overflow: 'hidden',
          textDecoration: 'none',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          wordBreak: 'keep-all',
        }}
      >
        {name}
      </Typography>

      <Typography
        sx={{
          color: '#111827',
          fontSize: { xs: '0.82rem', md: '0.9rem' },
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        {finalPrice || price}
      </Typography>
    </Stack>
  )
}
