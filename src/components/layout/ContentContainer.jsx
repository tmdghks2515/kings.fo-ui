import { Box } from '@mui/material'

export const CONTENT_CONTAINER_SX = {
  width: { xs: 'calc(100% - 32px)', md: 'calc(100% - 48px)' },
  maxWidth: '1280px',
  mx: 'auto',
  minWidth: 0,
  boxSizing: 'border-box',
}

export default function ContentContainer({ children, sx }) {
  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          ...CONTENT_CONTAINER_SX,
          ...sx,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
