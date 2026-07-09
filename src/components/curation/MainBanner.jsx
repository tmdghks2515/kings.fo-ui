'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Box, Card } from '@mui/material'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import Link from 'next/link'
import AppImage from '../image/AppImage'

export default function MainBanner({ items = [] }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
      }}
    >
      <Swiper
        className="bannerSwiper"
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
          type: 'fraction',
        }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {items.map(({ link, imageSrc }, index) => {
          return (
            <SwiperSlide key={index}>
              <Link href={link} style={{ display: 'block' }}>
                <Card
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 0,
                  }}
                >
                  <Box sx={{ position: 'relative', aspectRatio: '16 / 7' }}>
                    <AppImage
                      unoptimized
                      src={imageSrc}
                      alt=""
                      width={1280}
                      height={560}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </Box>
                </Card>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box>
  )
}
