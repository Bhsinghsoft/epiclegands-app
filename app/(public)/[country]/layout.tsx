import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const COUNTRIES = {
  'uae': { name: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED', code: 'AE' },
  'usa': { name: 'United States', flag: '🇺🇸', currency: 'USD', code: 'US' },
  'uk': { name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', code: 'GB' },
  'india': { name: 'India', flag: '🇮🇳', currency: 'INR', code: 'IN' },
  'singapore': { name: 'Singapore', flag: '🇸🇬', currency: 'SGD', code: 'SG' },
  'australia': { name: 'Australia', flag: '🇦🇺', currency: 'AUD', code: 'AU' },
  'canada': { name: 'Canada', flag: '🇨🇦', currency: 'CAD', code: 'CA' },
}

export function generateMetadata({ params }: { params: { country: string } }): Metadata {
  const country = COUNTRIES[params.country as keyof typeof COUNTRIES]
  const title = country
    ? `Epic Legends | Premium Spices Export to ${country.name}`
    : 'Epic Legends | Global Spice Export'
  const description = country
    ? `Premium spices and agricultural products tailored for ${country.name} importers`
    : 'Premium spices and agricultural products for global importers'

  return {
    title,
    description,
  }
}

export function generateStaticParams() {
  return Object.keys(COUNTRIES).map((country) => ({
    country,
  }))
}

export default function CountryLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { country: string }
}) {
  const country = COUNTRIES[params.country as keyof typeof COUNTRIES]

  if (!country) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Country not found</h1>
          <Link href="/" className="mt-4 inline-block">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Country Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{country.flag}</span>
            <div>
              <div className="text-sm text-muted-foreground">Market</div>
              <div className="font-semibold text-foreground">{country.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Currency</div>
              <div className="font-semibold text-foreground">{country.currency}</div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">Back to Global</Button>
            </Link>
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}
