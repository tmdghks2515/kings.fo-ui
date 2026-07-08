'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Box, Stack, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import AppImage from '../image/AppImage'
import SliderArrowButton from '../button/SliderArrowButton'

export default function Categories({ categories = [] }) {
  const [swiper, setSwiper] = useState(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const updateNavigationState = (swiperInstance) => {
    setIsBeginning(swiperInstance.isBeginning)
    setIsEnd(swiperInstance.isEnd)
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minWidth: 0,
        px: { xs: 4.5, sm: 5 },
        pt: 1,
      }}
    >
      <SliderArrowButton
        direction="prev"
        aria-label="이전 카테고리"
        disabled={isBeginning}
        onClick={() => swiper?.slidePrev()}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          zIndex: 2,
          transform: 'translateY(-50%)',
        }}
      />

      <Swiper
        onSwiper={(swiperInstance) => {
          setSwiper(swiperInstance)
          updateNavigationState(swiperInstance)
        }}
        onSlideChange={updateNavigationState}
        onReachBeginning={updateNavigationState}
        onReachEnd={updateNavigationState}
        onFromEdge={updateNavigationState}
        onBreakpoint={updateNavigationState}
        onUpdate={updateNavigationState}
        onAfterInit={(swiperInstance) => {
          updateNavigationState(swiperInstance)
        }}
        style={{
          width: '100%',
          maxWidth: '100%',
        }}
        slidesPerView="auto"
        spaceBetween={12}
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
                spacing={0.5}
                alignItems="center"
                sx={{
                  width: { xs: 60, sm: 80, md: 100, lg: 100 },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 60, sm: 80, md: 100, lg: 100 },
                    height: { xs: 60, sm: 80, md: 100, lg: 100 },
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <AppImage
                    unoptimized
                    src={imageSrc}
                    alt={label || ''}
                    width={130}
                    height={130}
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
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
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

      <SliderArrowButton
        direction="next"
        aria-label="다음 카테고리"
        disabled={isEnd}
        onClick={() => swiper?.slideNext()}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 0,
          zIndex: 2,
          transform: 'translateY(-50%)',
        }}
      />
    </Box>
  )
}
