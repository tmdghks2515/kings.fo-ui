'use client'

import { Box, Grid, Stack, Typography } from '@mui/material'
import ContentContainer from '@/components/layout/ContentContainer'
import Image from 'next/image'

const companyInfo = [
  '대표이사 : 이 강 | 사업자등록번호 : 701-88-03409',
  '이메일: thekingscompany17@naver.com | thekingscompany23@naver.com',
  '주소 : 경기도 고양시 덕양구 으뜸로 130 (덕은동)',
  '개인정보관리책임자 : 임승환 tmdghks0615@gmail.com',
]

const footerTextSx = {
  color: '#6b7280',
  fontSize: { xs: '0.72rem', md: '0.8rem' },
  lineHeight: 1.35,
}

export default function MainFooter() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        bgcolor: '#f3f4f6',
        borderTop: '1px solid #e5e7eb',
        mt: { xs: 2, md: 4 },
        pt: { xs: 2, md: 3 },
        pb: { xs: 1, md: 1 },
      }}
    >
      <ContentContainer>
        <Stack>
          <Grid container alignItems="center">
            <Grid size={{ xs: 4, sm: 3, md: 2 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  lineHeight: 0,
                }}
              >
                <Image
                  src="/logo/thekingsfulllogo.png"
                  width={150}
                  height={150}
                  alt="THE KINGS COMPANY"
                  style={{
                    height: 'auto',
                  }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 8, sm: 9, md: 10 }} sx={{}}>
              <Stack spacing={0.65}>
                <Typography
                  sx={{
                    color: '#111827',
                    fontSize: { xs: '0.78rem', md: '0.88rem' },
                    fontWeight: 700,
                    lineHeight: 1.35,
                  }}
                >
                  더킹즈컴퍼니
                </Typography>

                {companyInfo.map((text) => (
                  <Typography key={text} sx={footerTextSx}>
                    {text}
                  </Typography>
                ))}

                <Typography
                  sx={{
                    color: '#9ca3af',
                    fontSize: { xs: '0.68rem', md: '0.76rem' },
                    lineHeight: 1.35,
                    pt: 0.35,
                  }}
                >
                  COPYRIGHTS(C) 2026 THE KINGS COMPANY ALL RIGHTS RESERVED.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </ContentContainer>
    </Box>
  )
}
