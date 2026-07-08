'use client'

import Link from 'next/link'
import { Box, Stack, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import AppImage from '../image/AppImage'

export default function TitledProducts({ title = 'Popular Products', products = [] }) {
  return (
    <Stack
      spacing={2.5}
      sx={{
        width: '100%',
        minWidth: 0,
      }}
    >
      <Typography
        component="h3"
        sx={{
          color: '#111827',
          fontSize: { xs: '1rem', md: '1.3rem' },
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>

      <Swiper
        style={{
          width: '100%',
          maxWidth: '100%',
        }}
        slidesPerView="auto"
        spaceBetween={16}
        breakpoints={{
          600: {
            spaceBetween: 18,
          },
          900: {
            spaceBetween: 20,
          },
          1200: {
            spaceBetween: 24,
          },
        }}
      >
        {products.map(
          (
            { brandName, brandLink, name, price, finalPrice, imageSrc, link, optionNames = [] },
            index
          ) => (
            <SwiperSlide key={`${name}-${index}`} style={{ width: 'auto' }}>
              <Stack
                spacing={1.25}
                sx={{
                  width: { xs: 176, sm: 196, md: 208, lg: 220 },
                }}
              >
                <Link
                  href={link}
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  <Stack spacing={1.25}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '1 / 1',
                        borderRadius: 2,
                        backgroundColor: '#f8fafc',
                        overflow: 'hidden',
                      }}
                    >
                      <AppImage
                        unoptimized
                        src={imageSrc}
                        alt={name || ''}
                        fill
                        sizes="(max-width: 600px) 176px, (max-width: 900px) 196px, 220px"
                        style={{
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Stack>
                </Link>

                <Stack spacing={0.75}>
                  {brandName ? (
                    <Typography
                      component={Link}
                      href={brandLink || '#'}
                      sx={{
                        alignSelf: 'flex-start',
                        color: '#6b7280',
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        fontWeight: 700,
                        lineHeight: 1.2,
                        textDecoration: 'none',
                      }}
                    >
                      {brandName}
                    </Typography>
                  ) : null}

                  <Typography
                    component={Link}
                    href={link}
                    sx={{
                      color: '#111827',
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      fontWeight: 700,
                      lineHeight: 1.35,
                      display: '-webkit-box',
                      overflow: 'hidden',
                      minHeight: '2em',
                      textDecoration: 'none',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      wordBreak: 'keep-all',
                    }}
                  >
                    {name}
                  </Typography>

                  {optionNames.length > 0 ? (
                    <Stack
                      direction="row"
                      spacing={0.5}
                      useFlexGap
                      sx={{
                        flexWrap: 'wrap',
                        minHeight: 24,
                      }}
                    >
                      {optionNames.slice(0, 3).map((optionName) => (
                        <Box
                          key={optionName}
                          component="span"
                          sx={{
                            maxWidth: '100%',
                            border: '1px solid #e5e7eb',
                            borderRadius: 1,
                            color: '#4b5563',
                            fontSize: '0.7rem',
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
                            border: '1px solid #e5e7eb',
                            borderRadius: 1,
                            color: '#6b7280',
                            fontSize: '0.7rem',
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
                </Stack>

                <Stack direction="row" spacing={0.75} alignItems="baseline">
                  <Typography
                    sx={{
                      color: '#111827',
                      fontSize: { xs: '0.85rem', md: '0.9rem' },
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    {finalPrice ?? price}
                  </Typography>
                </Stack>
              </Stack>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </Stack>
  )
}
