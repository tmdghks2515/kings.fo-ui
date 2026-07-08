'use client'

import { Box, IconButton } from '@mui/material'

export default function SliderArrowButton({
  direction = 'next',
  'aria-label': ariaLabel,
  sx,
  ...props
}) {
  const isPrev = direction === 'prev'
  const sxProps = Array.isArray(sx) ? sx : sx ? [sx] : []

  return (
    <IconButton
      aria-label={ariaLabel || (isPrev ? '이전' : '다음')}
      sx={[
        {
          width: { xs: 32, sm: 36 },
          height: { xs: 32, sm: 36 },
          border: '1px solid #e5e7eb',
          backgroundColor: '#fff',
          boxShadow: '0 4px 14px rgb(15 23 42 / 12%)',
          transition: 'opacity 0.2s ease',
          '&:hover': {
            backgroundColor: '#f9fafb',
          },
          '&.Mui-disabled': {
            opacity: 0,
          },
        },
        ...sxProps,
      ]}
      {...props}
    >
      <Box
        component="span"
        sx={{
          width: 9,
          height: 9,
          ...(isPrev
            ? {
                borderBottom: '2px solid #374151',
                borderLeft: '2px solid #374151',
                transform: 'translateX(2px) rotate(45deg)',
              }
            : {
                borderTop: '2px solid #374151',
                borderRight: '2px solid #374151',
                transform: 'translateX(-2px) rotate(45deg)',
              }),
        }}
      />
    </IconButton>
  )
}
