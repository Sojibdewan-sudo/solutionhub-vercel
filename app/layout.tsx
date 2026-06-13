import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/layout/ThemeProvider'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solutionhub.aivoro.site'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Solution Hub — IT Support & Software Directory', template: '%s | Solution Hub' },
  description: 'Free step-by-step guides to fix Windows, Linux, and Mac problems. Find the best free software tools.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Solution Hub',
    images: [{ url: '/api/og?title=Solution+Hub', width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
