'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="text-2xl font-bold text-primary">Epic Legends</div>
          <div className="flex gap-4">
            <Link href="/auth/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            Premium Spices & Agricultural Products Global Export
          </h1>
          <p className="mt-6 text-balance text-xl text-muted-foreground">
            Connecting Indian exporters with global importers. Trusted by businesses in 50+ countries.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Products
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Become an Exporter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Countries Served', value: '50+' },
              { label: 'Products', value: '200+' },
              { label: 'Active Exporters', value: '150+' },
              { label: 'Annual Export Value', value: '$50M+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-primary">{stat.value}</div>
                <div className="mt-2 text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Products</h2>
          <p className="mt-2 text-muted-foreground">
            Our most popular export items across multiple categories
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Turmeric Powder', moq: '1000 KG', price: '$5-8/KG' },
              { name: 'Black Pepper', moq: '500 KG', price: '$8-12/KG' },
              { name: 'Cumin Seeds', moq: '1500 KG', price: '$6-10/KG' },
              { name: 'Cardamom', moq: '300 KG', price: '$15-20/KG' },
              { name: 'Coriander Seeds', moq: '2000 KG', price: '$4-7/KG' },
              { name: 'Red Chili', moq: '1200 KG', price: '$7-11/KG' },
            ].map((product) => (
              <div
                key={product.name}
                className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <h3 className="font-semibold text-foreground">{product.name}</h3>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p>MOQ: {product.moq}</p>
                  <p className="font-semibold text-primary">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-t border-border bg-card/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
            Certified & Trusted
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {[
              'ISO 9001:2015',
              'FDA Approved',
              'FSSAI Certified',
              'Organic Certified',
              'Fair Trade',
            ].map((cert) => (
              <div key={cert} className="flex items-center justify-center rounded-lg border border-border bg-background p-6">
                <div className="text-center text-sm font-semibold text-foreground">{cert}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary px-4 py-20 sm:px-6 lg:px-8 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-white/90">
            Join thousands of importers sourcing premium spices and agricultural products from India.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Register as Importer
              </Button>
            </Link>
            <Link href="mailto:contact@epiclegends.com">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <div className="text-lg font-bold text-primary">Epic Legends</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Premium spices and agricultural products from India
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Quick Links</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/products" className="hover:text-primary">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Contact</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Email: contact@epiclegends.com
                <br />
                Phone: +91 XXXX-XXX-XXXX
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Epic Legends. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
