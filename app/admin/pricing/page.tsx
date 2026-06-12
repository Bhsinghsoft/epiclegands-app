'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

const PRICING_BY_COUNTRY = [
  {
    country: 'United States',
    currency: 'USD',
    turmeric: '$5-8/KG',
    pepper: '$8-12/KG',
    cumin: '$6-10/KG',
    cardamom: '$15-20/KG',
  },
  {
    country: 'United Arab Emirates',
    currency: 'AED',
    turmeric: 'AED 18-30/KG',
    pepper: 'AED 29-44/KG',
    cumin: 'AED 22-37/KG',
    cardamom: 'AED 55-73/KG',
  },
  {
    country: 'United Kingdom',
    currency: 'GBP',
    turmeric: '£4.2-6.5/KG',
    pepper: '£7-10/KG',
    cumin: '£5-8/KG',
    cardamom: '£12.5-17/KG',
  },
  {
    country: 'Singapore',
    currency: 'SGD',
    turmeric: 'SGD 6-9/KG',
    pepper: 'SGD 10-13/KG',
    cumin: 'SGD 7-11/KG',
    cardamom: 'SGD 18-22/KG',
  },
]

export default function AdminPricingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Pricing</h1>
            <p className="mt-2 text-muted-foreground">Update product prices by country</p>
          </div>
          <Button>Sync with Database</Button>
        </div>
      </div>

      {/* Pricing Tables by Country */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {PRICING_BY_COUNTRY.map((country) => (
            <div key={country.country}>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{country.country}</h3>
                  <p className="text-sm text-muted-foreground">Currency: {country.currency}</p>
                </div>
                <Button variant="outline" size="sm">Edit Prices</Button>
              </div>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border bg-card">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-foreground">Product</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Price Range</th>
                      <th className="px-6 py-4 font-semibold text-foreground">MOQ</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="px-6 py-4 text-foreground">Turmeric Powder</td>
                      <td className="px-6 py-4 text-primary">{country.turmeric}</td>
                      <td className="px-6 py-4 text-muted-foreground">1000 KG</td>
                      <td className="px-6 py-4">
                        <Button variant="outline" size="sm">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="px-6 py-4 text-foreground">Black Pepper</td>
                      <td className="px-6 py-4 text-primary">{country.pepper}</td>
                      <td className="px-6 py-4 text-muted-foreground">500 KG</td>
                      <td className="px-6 py-4">
                        <Button variant="outline" size="sm">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="px-6 py-4 text-foreground">Cumin Seeds</td>
                      <td className="px-6 py-4 text-primary">{country.cumin}</td>
                      <td className="px-6 py-4 text-muted-foreground">1500 KG</td>
                      <td className="px-6 py-4">
                        <Button variant="outline" size="sm">Edit</Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="px-6 py-4 text-foreground">Cardamom</td>
                      <td className="px-6 py-4 text-primary">{country.cardamom}</td>
                      <td className="px-6 py-4 text-muted-foreground">300 KG</td>
                      <td className="px-6 py-4">
                        <Button variant="outline" size="sm">Edit</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bulk Operations */}
      <section className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-foreground">Bulk Operations</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground">Apply % Increase</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Increase all prices by a percentage across all countries
              </p>
              <Button variant="outline" className="mt-4 w-full">Apply</Button>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground">Import Prices</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Import pricing data from CSV or database
              </p>
              <Button variant="outline" className="mt-4 w-full">Upload</Button>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground">Export Report</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Generate pricing report for all countries
              </p>
              <Button variant="outline" className="mt-4 w-full">Export</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
