'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, Stack } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Brand', href: '/brand', activePaths: ['/brand'] },
  { label: 'Category', href: '/category', activePaths: ['/category'] },
  { label: 'Contact Us', href: '/contact', activePaths: ['/contact'] },
]

export default function MainHeader() {
  const pathname = usePathname()
  const lastScrollYRef = useRef(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    lastScrollYRef.current = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollYRef.current

      if (currentScrollY < 24) {
        setIsVisible(true)
      } else if (scrollDelta > 8) {
        setIsVisible(false)
      } else if (scrollDelta < -8) {
        setIsVisible(true)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 260ms ease',
        gap: { xs: 2, sm: 3 },
        py: { xs: 1, sm: 1.5 },
        bgcolor: 'rgba(255, 255, 255)',
        borderBottom: '1px solid',
        borderColor: 'rgba(17, 24, 39, 0.08)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        spacing={{ xs: 2, sm: 3 }}
        sx={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <Box
          component={Link}
          href="/"
          aria-label="THE KINGS home"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            lineHeight: 0,
          }}
        >
          <Image
            src="/logo/thekingstextlogo.png"
            width={156}
            height={38}
            alt="THE KINGS"
            priority
            style={{ width: '156px', height: 'auto' }}
          />
        </Box>

        <Stack
          component="nav"
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 0.5, sm: 1 }}
          aria-label="Main navigation"
          sx={{
            flexWrap: 'wrap',
            rowGap: 0.5,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = item.activePaths.some((activePath) => {
              if (activePath === '/') {
                return pathname === '/'
              }

              return pathname === activePath || pathname?.startsWith(`${activePath}/`)
            })

            return (
              <Box
                key={item.label}
                component={Link}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                sx={{
                  position: 'relative',
                  px: { xs: 1.4, sm: 1.8 },
                  py: 1,
                  color: isActive ? '#111827' : '#1f2937',
                  fontSize: { xs: 13, sm: 14 },
                  fontWeight: 600,
                  lineHeight: 1,
                  transition: 'color 160ms ease',
                  whiteSpace: 'nowrap',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: '50%',
                    bottom: 2,
                    width: 'calc(100% - 28px)',
                    height: '2px',
                    borderRadius: 999,
                    bgcolor: '#111827',
                    opacity: isActive ? 1 : 0,
                    transform: `translateX(-50%) scaleX(${isActive ? 1 : 0.35})`,
                    transformOrigin: 'center',
                    transition: 'opacity 180ms ease, transform 180ms ease',
                  },
                  '&:hover': {
                    color: '#111827',
                  },
                  '&:hover::after': {
                    opacity: 1,
                    transform: 'translateX(-50%) scaleX(1)',
                  },
                }}
              >
                {item.label}
              </Box>
            )
          })}
        </Stack>
      </Stack>
    </Box>
  )
}
