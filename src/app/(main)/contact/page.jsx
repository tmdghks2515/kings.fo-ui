'use client'

import { Box, Stack, Typography } from '@mui/material'
import ContentContainer from '@/components/layout/ContentContainer'

const CONTACT_ITEMS = [
  {
    label: '주소',
    value: '경기도 고양시 덕양구 으뜸로 130 (덕은동)',
    marker: 'A',
  },
  {
    label: 'TEL',
    value: '010-8472-5885',
    secondaryValue: '010-3802-5885',
    marker: 'T',
  },
  {
    label: '이메일',
    value: 'thekingscompany17@naver.com',
    secondaryValue: 'thekingscompany23@naver.com',
    marker: 'E',
  },
]

const MAP_QUERY = encodeURIComponent('경기도 고양시 덕양구 으뜸로 130')

function ContactInfoItem({ item }) {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 2, md: 2.5 }}
      alignItems="flex-start"
      sx={{ minWidth: 0 }}
    >
      <Box
        aria-hidden="true"
        sx={{
          alignItems: 'center',
          bgcolor: '#111827',
          borderRadius: '50%',
          color: '#fff',
          display: 'flex',
          flex: '0 0 auto',
          fontSize: { xs: 14, md: 16 },
          fontWeight: 800,
          height: { xs: 24, md: 36 },
          justifyContent: 'center',
          letterSpacing: 0,
          width: { xs: 24, md: 36 },
        }}
      >
        {item.marker}
      </Box>

      <Stack spacing={0.6} sx={{ minWidth: 0, pt: { xs: 0.15, md: 0.35 } }}>
        <Typography
          sx={{
            color: '#94a3b8',
            fontSize: { xs: 12, md: 13 },
            fontWeight: 800,
            letterSpacing: 0,
          }}
        >
          {item.label}
        </Typography>
        <Typography
          sx={{
            color: '#111827',
            fontSize: { xs: 14, sm: 18, md: 20 },
            fontWeight: 700,
            lineHeight: 1.45,
            overflowWrap: 'anywhere',
          }}
        >
          {item.value}
        </Typography>
        {item.secondaryValue ? (
          <Typography
            sx={{
              color: '#475569',
              fontSize: { xs: 15, md: 18 },
              fontWeight: 600,
              lineHeight: 1.45,
              overflowWrap: 'anywhere',
            }}
          >
            {item.secondaryValue}
          </Typography>
        ) : null}
      </Stack>
    </Stack>
  )
}

export default function ContactPage() {
  return (
    <Stack sx={{ width: '100%', bgcolor: '#fff' }}>
      <Box
        component="section"
        sx={{
          borderBottom: '1px solid rgba(17, 24, 39, 0.1)',
          bgcolor: '#fff',
        }}
      >
        <ContentContainer sx={{ py: { xs: 4, md: 6 } }}>
          <Stack spacing={1.25}>
            <Typography
              sx={{
                color: '#94a3b8',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0,
                textTransform: 'uppercase',
              }}
            >
              Contact Us
            </Typography>
            <Typography
              component="h1"
              sx={{
                color: '#111827',
                fontSize: { xs: 26, md: 40 },
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: 0,
              }}
            >
              오시는 길
            </Typography>
          </Stack>
        </ContentContainer>
      </Box>

      <ContentContainer sx={{ py: { xs: 4, md: 7 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 3, md: 4, lg: 5 },
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.55fr) minmax(320px, 0.9fr)' },
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              border: '1px solid rgba(17, 24, 39, 0.1)',
              bgcolor: '#f8fafc',
              minHeight: { xs: 360, sm: 440, md: 560 },
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Box
              component="iframe"
              title="THE KINGS COMPANY 지도"
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sx={{
                border: 0,
                display: 'block',
                height: '100%',
                inset: 0,
                minHeight: 'inherit',
                position: 'absolute',
                width: '100%',
              }}
            />
          </Box>

          <Stack
            spacing={{ xs: 3.5, md: 5 }}
            justifyContent="center"
            sx={{
              borderTop: { xs: '1px solid rgba(17, 24, 39, 0.1)', md: 0 },
              minWidth: 0,
              py: { xs: 1, md: 4 },
            }}
          >
            {CONTACT_ITEMS.map((item) => (
              <ContactInfoItem key={item.label} item={item} />
            ))}
          </Stack>
        </Box>
      </ContentContainer>
    </Stack>
  )
}
