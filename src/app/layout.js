import "./globals.css";

export const metadata = {
  title: "fo-ui",
  description: "Front office UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
