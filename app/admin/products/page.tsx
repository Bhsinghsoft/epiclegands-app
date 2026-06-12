'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

const PRODUCTS_LIST = [
  { id: 1, name: 'Turmeric Powder', category: 'Spices', moq: '1000 KG', price: '$5-8/KG', stock: '15000' },
  { id: 2, name: 'Black Pepper', category: 'Spices', moq: '500 KG', price: '$8-12/KG', stock: '8000' },
  { id: 3, name: 'Cumin Seeds', category: 'Seeds', moq: '1500 KG', price: '$6-10/KG', stock: '12000' },
  { id: 4, name: 'Cardamom', category: 'Spices', moq: '300 KG', price: '$15-20/KG', stock: '3000' },
  { id: 5, name: 'Coriander Seeds', category: 'Seeds', moq: '2000 KG', price: '$4-7/KG', stock: '18000' },
]

export default function AdminProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Products</h1>
            <p className="mt-2 text-muted-foreground">View, edit, and create products</p>
          </div>
          <Link href="/admin/products?action=add">
            <Button>Add New Product</Button>
          </Link>
        </div>
      </div>

      {/* Products Table */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left">
            <thead className="border-b border-border bg-card">
              <tr>
                <th className="px-6 py-4 font-semibold text-foreground">Product Name</th>
                <th className="px-6 py-4 font-semibold text-foreground">Category</th>
                <th className="px-6 py-4 font-semibold text-foreground">MOQ</th>
                <th className="px-6 py-4 font-semibold text-foreground">Price Range</th>
                <th className="px-6 py-4 font-semibold text-foreground">Stock</th>
                <th className="px-6 py-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS_LIST.map((product) => (
                <tr key={product.id} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                  <td className="px-6 py-4 font-semibold text-foreground">{product.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{product.category}</td>
                  <td className="px-6 py-4 text-muted-foreground">{product.moq}</td>
                  <td className="px-6 py-4 text-primary">{product.price}</td>
                  <td className="px-6 py-4 text-muted-foreground">{product.stock} KG</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/products/${product.id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                      <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
