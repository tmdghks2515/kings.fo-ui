"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MainDIsplayProductSwiper({
  title = "Popular Products",
  products = [],
}) {
  return (
    <Stack spacing={2.5} sx={{ width: "100%" }}>
      <Typography
        component="h2"
        sx={{
          color: "#111827",
          fontSize: { xs: "1.5rem", md: "2rem" },
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>

      <Swiper
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
          ({ brand, name, price, discountRate, finalPrice, imageSrc, link }, index) => (
            <SwiperSlide
              key={`${brand}-${name}-${index}`}
              style={{ width: "auto" }}
            >
              <Link
                href={link}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <Stack
                  spacing={1.5}
                  sx={{
                    width: { xs: 176, sm: 196, md: 208, lg: 220 },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1 / 1",
                      borderRadius: 3,
                      backgroundColor: "#f8fafc",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={imageSrc}
                      alt={name}
                      fill
                      sizes="(max-width: 600px) 176px, (max-width: 900px) 196px, 220px"
                      style={{
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Box>

                  <Stack spacing={0.5}>
                    <Typography
                      sx={{
                        color: "#111827",
                        fontSize: { xs: "1.4rem", md: "1.5rem" },
                        fontWeight: 700,
                        lineHeight: 1.2,
                      }}
                    >
                      {brand}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#4b5563",
                        fontSize: { xs: "1.2rem", md: "1.25rem" },
                        lineHeight: 1.45,
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        minHeight: "3.6em",
                      }}
                    >
                      {name}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={0.75} alignItems="baseline">
                    {discountRate ? (
                      <Typography
                        sx={{
                          color: "#ff5a5f",
                          fontSize: { xs: "1.15rem", md: "1.2rem" },
                          fontWeight: 700,
                          lineHeight: 1,
                        }}
                      >
                        {discountRate}
                      </Typography>
                    ) : null}
                    <Typography
                      sx={{
                        color: "#111827",
                        fontSize: { xs: "1.55rem", md: "1.7rem" },
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {finalPrice ?? price}
                    </Typography>
                  </Stack>
                </Stack>
              </Link>
            </SwiperSlide>
          ),
        )}
      </Swiper>
    </Stack>
  );
}
