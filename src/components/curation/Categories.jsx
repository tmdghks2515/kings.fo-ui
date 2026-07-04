'use client'

import Link from 'next/link'
import { Box, Stack, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import FallbackImage from '../image/FallbackImage'

export default function Categories({ categories = [] }) {
  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
        pt: 1,
      }}
    >
      <Swiper
        style={{
          width: '100%',
          maxWidth: '100%',
        }}
        slidesPerView="auto"
        spaceBetween={16}
        breakpoints={{
          600: {
            spaceBetween: 20,
          },
          900: {
            spaceBetween: 28,
          },
          1200: {
            spaceBetween: 32,
          },
        }}
      >
        {categories.map(({ label, imageSrc, link }, index) => (
          <SwiperSlide
            key={`${label}-${index}`}
            style={{
              width: 'auto',
            }}
          >
            <Link
              href={link}
              style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}
            >
              <Stack
                spacing={{ xs: 1.5, sm: 2 }}
                alignItems="center"
                sx={{
                  width: { xs: 92, sm: 132, md: 156, lg: 164 },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 92, sm: 132, md: 156, lg: 164 },
                    height: { xs: 92, sm: 132, md: 156, lg: 164 },
                    borderRadius: '50%',
                    backgroundColor: '#f7f7f7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <FallbackImage
                    unoptimized
                    src={imageSrc}
                    alt={label || ''}
                    width={180}
                    height={180}
                    style={{
                      width: '74%',
                      height: '74%',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    color: '#1f2937',
                    fontSize: { xs: '0.95rem', sm: '1.15rem' },
                    fontWeight: 400,
                    lineHeight: 1.2,
                    textAlign: 'center',
                    wordBreak: 'keep-all',
                  }}
                >
                  {label}
                </Typography>
              </Stack>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
