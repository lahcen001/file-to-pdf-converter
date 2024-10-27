import 'bootstrap/dist/css/bootstrap.css'
import { ThemeProvider } from '@/context/ThemeContext'
import Script from 'next/script'

export const metadata = {
  title: 'PDF Converter',
  description: 'Convert your images, documents, and text to PDF with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>
          {children}
          <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            strategy="afterInteractive"
          />
        </body>
      </ThemeProvider>
    </html>
  )
}
