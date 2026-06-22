'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Card, Typography } from "@mui/material";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

export default function MainDisplayMainBanner({ items = [] }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Swiper
        className="bannerSwiper"
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={16}
        pagination={{
            clickable: true,
            type: 'fraction',
      }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {items.map(({ title, subTitle, link, imageSrc }, index) => (
          <SwiperSlide key={index}>
            <Link href={link} style={{ display: "block" }}>
              <Card
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 2,
                }}
              >
                <Box sx={{ position: "relative", aspectRatio: "16 / 7" }}>
                  <Image
                    src={imageSrc}
                    alt={title}
                    width={1280}
                    height={560}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(90deg, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.4) 42%, rgba(15,23,42,0.08) 100%)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      left: { xs: 20, sm: 32, md: 48 },
                      right: { xs: 20, sm: 32, md: "40%" },
                      bottom: { xs: 20, sm: 28, md: 40 },
                      display: "grid",
                      gap: 1,
                      color: "#fff",
                    }}
                  >
                    {subTitle && (
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 500,
                          opacity: 0.92,
                        }}
                      >
                        {subTitle}
                      </Typography>
                    )}
                    {title && (
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 700,
                          lineHeight: 1.15,
                          fontSize: {
                            xs: "1.75rem",
                            sm: "2.25rem",
                            md: "3rem",
                          },
                        }}
                      >
                        {title}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

