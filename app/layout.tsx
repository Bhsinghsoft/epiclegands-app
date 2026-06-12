import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { OrganizationJsonLd } from '@/components/json-ld'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Epic Legends | Global Spice & Agricultural Export',
  description: 'Premium spices and agricultural products export from India to the world',
  keywords:
    'spice export, agricultural products, India export, turmeric, black pepper, cumin, cardamom',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Epic Legends | Global Spice & Agricultural Export',
    description:
      'Premium spices and agricultural products export from India to 50+ countries',
    type: 'website',
    url: 'https://epiclegends.com',
    siteName: 'Epic Legends',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} bg-background`}>
      <head>
        <OrganizationJsonLd />
      </head>
      <body className="font-sans antialiased text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
