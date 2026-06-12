'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const PRODUCTS = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
    id: 4,
    name: 'Cardamom',
    category: 'Spices',
    moq: '300 KG',
    hsCode: '0810.90.00',
    price: '$15-20/KG',
    image: 'bg-green-100',
    description: 'Green cardamom from Kerala hills',
    containerLoad: '15 MT',
    privateLabel: true,
  },
  {
    id: 5,
    name: 'Coriander Seeds',
    category: 'Seeds',
    moq: '2000 KG',
    hsCode: '0709.60.00',
    price: '$4-7/KG',
    image: 'bg-amber-100',
    description: 'High-quality coriander seeds',
    containerLoad: '24 MT',
    privateLabel: false,
  },
  {
    id: 6,
    name: 'Red Chili',
    category: 'Spices',
    moq: '1200 KG',
    hsCode: '0713.39.00',
    price: '$7-11/KG',
    image: 'bg-red-100',
    description: 'Organic red chili from Andhra Pradesh',
    containerLoad: '21 MT',
    privateLabel: true,
  },
  {
    id: 7,
    name: 'Ginger Powder',
    category: 'Spices',
    moq: '800 KG',
    hsCode: '0913.00.00',
    price: '$3-5/KG',
    image: 'bg-orange-200',
    description: 'Fresh ginger powder',
    containerLoad: '23 MT',
    privateLabel: true,
  },
  {
    id: 8,
    name: 'Fenugreek Seeds',
    category: 'Seeds',
    moq: '1000 KG',
    hsCode: '1208.90.00',
    price: '$5-8/KG',
    image: 'bg-yellow-200',
    description: 'Premium fenugreek seeds',
    containerLoad: '20 MT',
    privateLabel: false,
  },
]

const CATEGORIES = ['All', 'Spices', 'Seeds', 'Organic', 'Private Label']

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' ||
      product.category === selectedCategory ||
      (selectedCategory === 'Organic' && product.description.includes('Organic')) ||
      (selectedCategory === 'Private Label' && product.privateLabel)
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-2xl font-bold text-primary">
            Epic Legends
          </Link>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="border-b border-border bg-gradient-to-br from-primary/5 to-secondary/5 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Our Products</h1>
          <p className="mt-2 text-muted-foreground">
            Browse our extensive catalog of premium spices and agricultural exports
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="border-b border-border px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`cursor-pointer rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-foreground hover:bg-muted'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {PRODUCTS.length} products
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg">
                  <div className={`${product.image} mb-4 h-32 rounded-lg`} />
                  <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-semibold text-primary">{product.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">MOQ:</span>
                      <span className="font-semibold">{product.moq}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">HS Code:</span>
                      <span className="font-mono text-xs">{product.hsCode}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.privateLabel && (
                      <span className="inline-block rounded-full bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">
                        Private Label Available
                      </span>
                    )}
                    <span className="inline-block rounded-full border border-border px-2 py-1 text-xs font-semibold text-foreground">
                      {product.category}
                    </span>
                  </div>
                  <Button className="mt-auto pt-4" variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-primary px-4 py-12 sm:px-6 lg:px-8 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold">Need Custom Sourcing?</h2>
          <p className="mt-2 text-white/90">
            Contact our team for bulk orders, private label options, or custom specifications.
          </p>
          <div className="mt-6">
            <Link href="mailto:sales@epiclegends.com">
              <Button variant="secondary">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
