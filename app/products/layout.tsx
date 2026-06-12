import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products | Epic Legends - Premium Spices & Agricultural Exports',
  description:
    'Browse our extensive catalog of premium spices and agricultural products. Find turmeric, black pepper, cumin, cardamom, and more from India.',
  keywords:
    'spices export, agricultural products, cumin, turmeric, black pepper, cardamom, Indian spices',
  openGraph: {
    title: 'Products | Epic Legends',
    description: 'Premium spices and agricultural products for global export',
    type: 'website',
    url: 'https://epiclegends.com/products',
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
