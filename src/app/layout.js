import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import MuiThemeProvider from "../theme/MuiThemeProvider";

export const metadata = {
  title: "fo-ui",
  description: "Front office UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <MuiThemeProvider>{children}</MuiThemeProvider>
      </body>
    </html>
  );
}
