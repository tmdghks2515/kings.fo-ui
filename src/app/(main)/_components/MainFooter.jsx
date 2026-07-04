'use client'

import { Box, Grid, Stack, Typography } from '@mui/material'
import ContentContainer from '@/components/layout/ContentContainer'

const companyInfo = [
  { label: '회사명', value: '더킹즈컴퍼니' },
  { label: '대표이사', value: '이 강' },
  { label: '사업자등록번호', value: '701-88-03409' },
  {
    label: '개인정보관리책임자',
    value: '임승환 tmdghks0615@gmail.com',
  },
]

const footerTextSx = {
  color: '#6b7280',
  fontSize: { xs: '0.72rem', md: '0.8rem' },
  lineHeight: 1.55,
}

export default function MainFooter() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        borderTop: '1px solid #e5e7eb',
        mt: { xs: 6, md: 8 },
        pt: { xs: 4, md: 5 },
        pb: { xs: 6, md: 8 },
      }}
    >
      <ContentContainer>
        <Stack spacing={{ xs: 3.5, md: 5 }}>
          <Grid container spacing={{ xs: 3, md: 6 }}>
            <Grid size={{ xs: 12, md: 6.5 }}>
              <Stack spacing={2}>
                {companyInfo.map(({ label, value, emphasized }) => (
                  <Grid
                    container
                    key={label}
                    spacing={2}
                    sx={{
                      alignItems: 'start',
                    }}
                  >
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography
                        sx={{
                          ...footerTextSx,
                        }}
                      >
                        {label}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 8 }}>
                      <Typography
                        sx={{
                          ...footerTextSx,
                          textDecoration: emphasized ? 'underline' : 'none',
                          textUnderlineOffset: emphasized ? '3px' : undefined,
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
                    ...footerTextSx,
                  }}
                >
                  경기도 고양시 덕양구 으뜸로 130 (덕은동)
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Stack spacing={0.75}>
                  <Typography
                    sx={{
                      color: '#9ca3af',
                      fontSize: { xs: '0.68rem', md: '0.76rem' },
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
      </ContentContainer>
    </Box>
  )
}
