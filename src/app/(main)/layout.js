"use client";

import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { brandService } from "@/api/brand/brandService";
import MainFooter from "@/app/(main)/_components/MainFooter";
import MainHeader from "@/app/(main)/_components/MainHeader";

export default function MainLayout({ children }) {
  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: brandService.getBrands,
  });
  const hasBrands = Array.isArray(brands) && brands.length > 0;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        mx: "auto",
      }}
    >
      <MainHeader showBrandMenu={hasBrands} />
      <Box
        component="main"
        sx={{
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flex: 1, width: "100%" }}>{children}</Box>
        <MainFooter />
      </Box>
    </Box>
  );
}
