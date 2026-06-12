'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

const COUNTRY_DATA: Record<
  string,
  {
    name: string
    currency: string
    flag: string
    code: string
    importStats: string
    topProducts: string[]
    marketSize: string
    certifications: string[]
    shippingTime: string
    taxes: string
  }
> = {
  uae: {
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    currency: 'AED',
    code: 'AE',
    importStats: 'Leading spice importer in Middle East',
    topProducts: ['Turmeric', 'Black Pepper', 'Cardamom'],
    marketSize: '$500M+',
    certifications: ['ADAFSA Approved', 'Halal Certified'],
    shippingTime: '14-21 days via sea',
    taxes: '5% VAT',
  },
  usa: {
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    code: 'US',
    importStats: 'Largest spice market globally',
    topProducts: ['Cumin', 'Coriander', 'Turmeric'],
    marketSize: '$3B+',
    certifications: ['FDA Approved', 'Organic Certified'],
    shippingTime: '21-28 days via sea',
    taxes: 'Custom duties apply',
  },
  uk: {
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    code: 'GB',
    importStats: 'Premium spice market in Europe',
    topProducts: ['Black Pepper', 'Cardamom', 'Cinnamon'],
    marketSize: '$200M+',
    certifications: ['EU Approved', 'Organic Certified'],
    shippingTime: '18-25 days via sea',
    taxes: '0% VAT (post-Brexit)',
  },
  india: {
    name: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    code: 'IN',
    importStats: 'Domestic distribution hub',
    topProducts: ['All spices', 'Agricultural Products'],
    marketSize: '$2B+',
    certifications: ['FSSAI Approved'],
    shippingTime: '5-10 days via land',
    taxes: '5% GST',
  },
  singapore: {
    name: 'Singapore',
    flag: '🇸🇬',
    currency: 'SGD',
    code: 'SG',
    importStats: 'Asia-Pacific distribution center',
    topProducts: ['Turmeric', 'Pepper', 'Seeds'],
    marketSize: '$150M+',
    certifications: ['NEA Approved', 'Halal Certified'],
    shippingTime: '12-18 days via sea',
    taxes: '0% GST',
  },
  australia: {
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    code: 'AU',
    importStats: 'Growing Asian cuisine market',
    topProducts: ['All Spices', 'Organic Products'],
    marketSize: '$100M+',
    certifications: ['DAFF Approved', 'Organic Certified'],
    shippingTime: '28-35 days via sea',
    taxes: '10% GST',
  },
  canada: {
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    code: 'CA',
    importStats: 'North American premium market',
    topProducts: ['Cardamom', 'Black Pepper', 'Saffron'],
    marketSize: '$80M+',
    certifications: ['CFIA Approved', 'Organic Certified'],
    shippingTime: '21-28 days via sea',
    taxes: '5% GST',
  },
}

const PRICING_DATA: Record<
  string,
  { product: string; basePrice: number; currency: string; adjustment: string }[]
> = {
  uae: [
    { product: 'Turmeric Powder', basePrice: 5.5, currency: 'AED', adjustment: '+15%' },
    { product: 'Black Pepper', basePrice: 9, currency: 'AED', adjustment: '+12%' },
    { product: 'Cumin Seeds', basePrice: 6.5, currency: 'AED', adjustment: '+8%' },
    { product: 'Cardamom', basePrice: 16, currency: 'AED', adjustment: '+10%' },
  ],
  usa: [
    { product: 'Turmeric Powder', basePrice: 5, currency: 'USD', adjustment: 'Base' },
    { product: 'Black Pepper', basePrice: 8.5, currency: 'USD', adjustment: 'Base' },
    { product: 'Cumin Seeds', basePrice: 6, currency: 'USD', adjustment: 'Base' },
    { product: 'Cardamom', basePrice: 15, currency: 'USD', adjustment: 'Base' },
  ],
  uk: [
    { product: 'Turmeric Powder', basePrice: 4.2, currency: 'GBP', adjustment: '-15%' },
    { product: 'Black Pepper', basePrice: 7, currency: 'GBP', adjustment: '-18%' },
    { product: 'Cumin Seeds', basePrice: 5, currency: 'GBP', adjustment: '-20%' },
    { product: 'Cardamom', basePrice: 12.5, currency: 'GBP', adjustment: '-15%' },
  ],
  india: [
    { product: 'Turmeric Powder', basePrice: 250, currency: 'INR', adjustment: '-40%' },
    { product: 'Black Pepper', basePrice: 425, currency: 'INR', adjustment: '-45%' },
    { product: 'Cumin Seeds', basePrice: 300, currency: 'INR', adjustment: '-48%' },
    { product: 'Cardamom', basePrice: 750, currency: 'INR', adjustment: '-40%' },
  ],
  singapore: [
    { product: 'Turmeric Powder', basePrice: 7, currency: 'SGD', adjustment: '+22%' },
    { product: 'Black Pepper', basePrice: 11, currency: 'SGD', adjustment: '+25%' },
    { product: 'Cumin Seeds', basePrice: 8, currency: 'SGD', adjustment: '+28%' },
    { product: 'Cardamom', basePrice: 19, currency: 'SGD', adjustment: '+20%' },
  ],
  australia: [
    { product: 'Turmeric Powder', basePrice: 7.5, currency: 'AUD', adjustment: '+35%' },
    { product: 'Black Pepper', basePrice: 12.5, currency: 'AUD', adjustment: '+40%' },
    { product: 'Cumin Seeds', basePrice: 8.5, currency: 'AUD', adjustment: '+38%' },
    { product: 'Cardamom', basePrice: 22, currency: 'AUD', adjustment: '+35%' },
  ],
  canada: [
    { product: 'Turmeric Powder', basePrice: 6.5, currency: 'CAD', adjustment: '+28%' },
    { product: 'Black Pepper', basePrice: 11, currency: 'CAD', adjustment: '+25%' },
    { product: 'Cumin Seeds', basePrice: 7.5, currency: 'CAD', adjustment: '+22%' },
    { product: 'Cardamom', basePrice: 19, currency: 'CAD', adjustment: '+22%' },
  ],
}

export default function CountryPage({ params }: { params: { country: string } }) {
  const data = COUNTRY_DATA[params.country]
  const pricing = PRICING_DATA[params.country]

  if (!data || !pricing) {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-foreground">
            Spice Export to {data.name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{data.importStats}</p>
        </div>
      </section>

      {/* Market Info Grid */}
      <section className="border-b border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-foreground">Market Overview</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="text-sm text-muted-foreground">Market Size</div>
              <div className="mt-2 text-2xl font-bold text-primary">{data.marketSize}</div>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="text-sm text-muted-foreground">Shipping Time</div>
              <div className="mt-2 text-xl font-bold text-foreground">{data.shippingTime}</div>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="text-sm text-muted-foreground">Tax Rate</div>
              <div className="mt-2 text-2xl font-bold text-foreground">{data.taxes}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Products */}
      <section className="border-b border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-foreground">Top Products in {data.name}</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {data.topProducts.map((product) => (
              <span
                key={product}
                className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
              >
                {product}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Local Pricing */}
      <section className="border-b border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-foreground">
            Local Pricing ({data.currency})
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 font-semibold text-foreground">Product</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Price per KG</th>
                  <th className="px-4 py-3 font-semibold text-foreground">USD Adjustment</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((item, idx) => (
                  <tr key={idx} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-3 text-foreground">{item.product}</td>
                    <td className="px-4 py-3 font-semibold text-primary">
                      {item.currency} {item.basePrice}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{item.adjustment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-b border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-foreground">Required Certifications</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {data.certifications.map((cert) => (
              <div
                key={cert}
                className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground"
              >
                ✓ {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary px-4 py-12 sm:px-6 lg:px-8 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold">Start Importing from {data.name}</h2>
          <p className="mt-4 text-white/90">
            Get competitive pricing, customs support, and dedicated account management
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href={`/${params.country}/products`}>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Browse Products
              </Button>
            </Link>
            <Link href="mailto:sales@epiclegends.com">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
