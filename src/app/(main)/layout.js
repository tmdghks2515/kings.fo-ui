"use client";

import { Box } from "@mui/material";
import MainFooter from "@/app/(main)/_components/MainFooter";
import MainHeader from "@/app/(main)/_components/MainHeader";

export default function MainLayout({ children }) {
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
      <MainHeader />
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
