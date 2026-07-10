import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { SmoothScroll } from '@/components/providers/smooth-scroll'
import { PageLoadWrapper } from '@/components/providers/page-load-wrapper'
import { CustomCursor } from '@/components/interaction/custom-cursor'
import { ScrollToTop } from '@/components/interaction/scroll-to-top'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Gilang Pratama Putra Siswanto — Physics · Instrumentation · Systems',
    template: '%s · Gilang P. P. Siswanto',
  },
  description:
    'Portfolio of Gilang Pratama Putra Siswanto — physics graduate and multidisciplinary technologist working across scientific instrumentation, embedded systems, IoT, computational physics, robotics, and applied AI.',
  keywords: [
    'physics',
    'instrumentation',
    'embedded systems',
    'IoT',
    'computational physics',
    'robotics',
    'research',
    'Gilang Pratama Putra Siswanto',
  ],
  authors: [{ name: 'Gilang Pratama Putra Siswanto' }],
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    title: 'Gilang Pratama Putra Siswanto — Physics · Instrumentation · Systems',
    description:
      'A studio of research, code, and hands-on engineering across instrumentation, embedded systems, IoT, and applied AI.',
    siteName: 'Gilang P. P. Siswanto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gilang Pratama Putra Siswanto — Physics · Instrumentation · Systems',
    description:
      'Research, instrumentation engineering, embedded systems, IoT, and applied AI.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0b0b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[2px] focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-signal-foreground"
        >
          Skip to content
        </a>
        <CustomCursor />
        <ScrollToTop />
        <PageLoadWrapper>
          <SmoothScroll>{children}</SmoothScroll>
        </PageLoadWrapper>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
