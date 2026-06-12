'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const PRODUCTS_MAP: Record<
  string,
  {
    id: number
    name: string
    category: string
    moq: string
    hsCode: string
    price: string
    image: string
    description: string
    containerLoad: string
    privateLabel: boolean
    fullDescription: string
    specifications: Array<{ label: string; value: string }>
    origin: string
    certifications: string[]
    shippingOptions: Array<{ type: string; duration: string; cost: string }>
  }
> = {
  '1': {
    id: 1,
    name: 'Turmeric Powder',
    category: 'Spices',
    moq: '1000 KG',
    hsCode: '0713.10.00',
    price: '$5-8/KG',
    image: 'bg-orange-100',
    description: 'Pure organic turmeric powder from Telangana',
    containerLoad: '20 MT',
    privateLabel: true,
    fullDescription:
      'Our premium turmeric powder is sourced from the finest turmeric-growing regions of Telangana. We use traditional farming methods combined with modern processing to ensure maximum curcumin content and purity. Every batch is tested for quality, purity, and potency.',
    specifications: [
      { label: 'Curcumin Content', value: '≥7%' },
      { label: 'Moisture', value: '≤10%' },
      { label: 'Ash Content', value: '≤8%' },
      { label: 'Microbial Count', value: '<10,000 CFU/g' },
      { label: 'Color', value: 'Deep Golden Yellow' },
    ],
    origin: 'Telangana, India',
    certifications: ['ISO 9001:2015', 'FSSAI Certified', 'Organic Certified'],
    shippingOptions: [
      { type: 'Air Freight', duration: '3-5 days', cost: '$2-3/KG' },
      { type: 'Sea Freight', duration: '21-28 days', cost: '$0.5-1/KG' },
      { type: 'Land Freight', duration: '7-10 days', cost: '$1-1.5/KG' },
    ],
  },
  '2': {
    id: 2,
    name: 'Black Pepper',
    category: 'Spices',
    moq: '500 KG',
    hsCode: '0704.90.00',
    price: '$8-12/KG',
    image: 'bg-gray-100',
    description: 'Grade A black pepper from Kerala',
    containerLoad: '18 MT',
    privateLabel: true,
    fullDescription:
      'Premium Grade A black pepper sourced directly from Kerala, India. Hand-harvested and sun-dried for maximum flavor and aroma. Perfect for both industrial use and premium culinary applications.',
    specifications: [
      { label: 'Piperine Content', value: '≥5%' },
      { label: 'Moisture', value: '≤12%' },
      { label: 'Foreign Matter', value: '<1%' },
      { label: 'Volatile Oil', value: '1.5-3%' },
      { label: 'Grade', value: 'ASTA-A' },
    ],
    origin: 'Kerala, India',
    certifications: ['ISO 9001:2015', 'FSSAI Certified', 'FDA Approved'],
    shippingOptions: [
      { type: 'Air Freight', duration: '3-5 days', cost: '$2.5-3.5/KG' },
      { type: 'Sea Freight', duration: '21-28 days', cost: '$0.8-1.2/KG' },
      { type: 'Land Freight', duration: '7-10 days', cost: '$1.2-1.8/KG' },
    ],
  },
  '3': {
    id: 3,
    name: 'Cumin Seeds',
    category: 'Seeds',
    moq: '1500 KG',
    hsCode: '0709.60.00',
    price: '$6-10/KG',
    image: 'bg-yellow-100',
    description: 'Premium cumin seeds from Gujarat',
    containerLoad: '22 MT',
    privateLabel: false,
    fullDescription:
      'High-quality cumin seeds from Gujarat with excellent aroma and flavor. Suitable for both bulk industrial use and retail packaging. Our seeds are carefully selected and processed.',
    specifications: [
      { label: 'Moisture Content', value: '≤10%' },
      { label: 'Foreign Matter', value: '<2%' },
      { label: 'Essential Oil', value: '2.5-4%' },
      { label: 'Bulk Density', value: '750-850 g/L' },
      { label: 'Test Weight', value: '55-65 g/100 seeds' },
    ],
    origin: 'Gujarat, India',
    certifications: ['ISO 9001:2015', 'FSSAI Certified'],
    shippingOptions: [
      { type: 'Sea Freight', duration: '21-28 days', cost: '$0.6-1/KG' },
      { type: 'Land Freight', duration: '7-10 days', cost: '$1-1.5/KG' },
    ],
  },
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS_MAP[params.id]

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <nav className="border-b border-border bg-background px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link href="/products" className="text-primary hover:underline">
              ← Back to Products
            </Link>
          </div>
        </nav>
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
            <Link href="/products">
              <Button className="mt-4">Back to Products</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/products" className="text-sm text-primary hover:underline">
            ← Back to Products
          </Link>
        </div>
      </nav>

      {/* Product Header */}
      <section className="border-b border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className={`${product.image} flex items-center justify-center rounded-lg p-8 text-6xl`} />
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{product.category}</Badge>
                {product.privateLabel && <Badge variant="secondary">Private Label</Badge>}
              </div>
              <h1 className="mt-4 text-4xl font-bold text-foreground">{product.name}</h1>
              <p className="mt-2 text-muted-foreground">{product.description}</p>

              {/* Key Info */}
              <div className="mt-8 space-y-4 rounded-lg bg-card p-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Price per KG</div>
                    <div className="mt-1 text-xl font-semibold text-primary">{product.price}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Minimum Order</div>
                    <div className="mt-1 text-xl font-semibold">{product.moq}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Container Load</div>
                    <div className="mt-1 text-xl font-semibold">{product.containerLoad}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">HS Code</div>
                    <div className="mt-1 font-mono text-sm font-semibold">{product.hsCode}</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="mailto:sales@epiclegends.com">
                  <Button size="lg" className="w-full">
                    Request Quote
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="outline" size="lg" className="w-full">
                    Register for Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Description */}
      <section className="border-b border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground">Product Details</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{product.fullDescription}</p>
        </div>
      </section>

      {/* Specifications */}
      <section className="border-b border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground">Specifications</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left">
              <tbody>
                {product.specifications.map((spec, idx) => (
                  <tr key={idx} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-3 font-semibold text-foreground">{spec.label}</td>
                    <td className="px-4 py-3 text-muted-foreground">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Origin & Certifications */}
      <section className="border-b border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-foreground">Origin</h3>
              <p className="mt-2 text-muted-foreground">{product.origin}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Certifications</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.certifications.map((cert) => (
                  <Badge key={cert} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground">Shipping Options</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {product.shippingOptions.map((option, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card p-4">
                <h4 className="font-semibold text-foreground">{option.type}</h4>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>Duration: {option.duration}</p>
                  <p className="font-semibold text-primary">Cost: {option.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary px-4 py-12 sm:px-6 lg:px-8 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold">Ready to Place an Order?</h2>
          <p className="mt-2 text-white/90">
            Get in touch with our sales team for quotes, samples, and bulk orders.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="mailto:sales@epiclegends.com">
              <Button variant="secondary">Email Sales Team</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline">Create Account</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
