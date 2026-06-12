import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products | Epic Legends - Premium Spices & Agricultural Exports',
  description:
    'Browse our extensive catalog of premium spices and agricultural products. Find turmeric, black pepper, cumin, cardamom, and more from India. Export quality with FDA, EU, and Organic certifications.',
  keywords:
    'spices export, agricultural products, cumin seeds, turmeric powder, black pepper, cardamom, Indian spices, bulk spices, wholesale spices',
  openGraph: {
    title: 'Products | Epic Legends',
    description: 'Premium spices and agricultural products for global export',
    type: 'website',
    url: 'https://epiclegends.com/products',
    images: [
      {
        url: 'https://epiclegends.com/og-products.jpg',
        width: 1200,
        height: 630,
        alt: 'Epic Legends Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products | Epic Legends',
    description: 'Premium spices and agricultural products for global export',
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}