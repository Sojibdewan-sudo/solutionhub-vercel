import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Analytics } from '@vercel/analytics/react'

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

        {/* Google Translate Widget */}
        <div id="google_translate_element" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'bn,en,hi,ar,zh-CN,fr,de,es,pt,ru,ja,ko,tr,ur,id,ms,th,vi,fa,pl,nl,it,sv,he,sw,tl,el,hu,cs,ro,da,fi,no,uk,ca,hr,lt,lv,sl,sr,sk',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />

        {/* Adsterra Ad */}
        <script
          async={true}
          data-cfasync="false"
          src="https://pl30199094.effectivecpmnetwork.com/37239f77d9eebf7980edae69d2426b32/invoke.js"
        />
        <div id="container-37239f77d9eebf7980edae69d2426b32" />

        <Analytics />
      </body>
    </html>
  )
}