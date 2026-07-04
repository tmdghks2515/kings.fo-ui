import './globals.css'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import MuiThemeProvider from '../providers/MuiThemeProvider'
import QueryProvider from '@/providers/QueryProvider'

export const metadata = {
  title: '더킹즈컴퍼니',
  description: '더킹즈컴퍼니',
  icons: {
    icon: '/logo/thekingslogosmall.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <MuiThemeProvider>{children}</MuiThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
