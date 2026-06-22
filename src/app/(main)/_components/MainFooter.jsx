"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";

const companyInfo = [
  { label: "회사명", value: "더킹즈컴퍼니" },
  { label: "대표이사", value: "이 강" },
  { label: "사업자등록번호", value: "701-88-03409" },
  {
    label: "개인정보관리책임자",
    value: "임승환 tmdghks0615@gmail.com",
  },
];

export default function MainFooter() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        borderTop: "1px solid #e5e7eb",
        mt: { xs: 6, md: 8 },
        pt: { xs: 4, md: 5 },
        pb: { xs: 6, md: 8 },
      }}
    >
      <Stack spacing={{ xs: 3.5, md: 5 }}>
        <Typography
          sx={{
            color: "#1f2937",
            fontSize: { xs: "1.25rem", md: "1.55rem" },
            fontWeight: 700,
            letterSpacing: 0,
            lineHeight: 1,
          }}
        >
          THE KINGS COMPANY
        </Typography>

        <Grid container spacing={{ xs: 3, md: 6 }}>
          <Grid size={{ xs: 12, md: 6.5 }}>
            <Stack spacing={2}>
              {companyInfo.map(({ label, value, emphasized }) => (
                <Grid
                  container
                  key={label}
                  spacing={2}
                  sx={{
                    alignItems: "start",
                  }}
                >
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography
                      sx={{
                        color: "#374151",
                        fontSize: { xs: "0.8rem", md: "0.9rem" },
                        lineHeight: 1.5,
                      }}
                    >
                      {label}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <Typography
                      sx={{
                        color: "#374151",
                        fontSize: { xs: "0.8rem", md: "0.9rem" },
                        lineHeight: 1.5,
                        textDecoration: emphasized ? "underline" : "none",
                        textUnderlineOffset: emphasized ? "3px" : undefined,
                      }}
                    >
                      {value}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5.5 }}>
            <Stack spacing={1}>
              <Typography
                sx={{
                  color: "#374151",
                  fontSize: { xs: "0.8rem", md: "0.9rem" },
                  lineHeight: 1.6,
                }}
              >
                  경기도 고양시 덕양구 으뜸로 130 (덕은동)
              </Typography>

              <Box sx={{ flexGrow: 1 }} />

              <Stack spacing={0.75}>
                <Typography
                  sx={{
                    color: "#4b5563",
                    fontSize: { xs: "0.74rem", md: "0.84rem" },
                    lineHeight: 1.5,
                  }}
                >
                  COPYRIGHTS(C) 2026 THE KINGS COMPANY ALL RIGHTS RESERVED.
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
