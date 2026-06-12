'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

const ALL_ORDERS = [
  {
    id: 'ORD-001',
    customer: 'Global Imports LLC',
    product: 'Turmeric Powder',
    quantity: '5000 KG',
    status: 'Shipped',
    date: '2024-01-15',
    amount: '$25,000',
  },
  {
    id: 'ORD-002',
    customer: 'Middle East Trading',
    product: 'Black Pepper',
    quantity: '2000 KG',
    status: 'Processing',
    date: '2024-01-14',
    amount: '$17,000',
  },
  {
    id: 'ORD-003',
    customer: 'USA Spices Inc',
    product: 'Cumin Seeds',
    quantity: '3000 KG',
    status: 'Pending',
    date: '2024-01-13',
    amount: '$18,000',
  },
  {
    id: 'ORD-004',
    customer: 'UK Foods Ltd',
    product: 'Cardamom',
    quantity: '800 KG',
    status: 'Shipped',
    date: '2024-01-12',
    amount: '$12,000',
  },
  {
    id: 'ORD-005',
    customer: 'Singapore Trade Co',
    product: 'Coriander Seeds',
    quantity: '2500 KG',
    status: 'Delivered',
    date: '2024-01-11',
    amount: '$10,000',
  },
]

const STATUS_COLORS: Record<string, string> = {
  Shipped: 'bg-green-100 text-green-800',
  Processing: 'bg-blue-100 text-blue-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Delivered: 'bg-teal-100 text-teal-800',
}

export default function AdminOrdersPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground">Manage Orders</h1>
          <p className="mt-2 text-muted-foreground">View and update order statuses</p>
        </div>
      </div>

      {/* Orders Table */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-card">
              <tr>
                <th className="px-6 py-4 font-semibold text-foreground">Order ID</th>
                <th className="px-6 py-4 font-semibold text-foreground">Customer</th>
                <th className="px-6 py-4 font-semibold text-foreground">Product</th>
                <th className="px-6 py-4 font-semibold text-foreground">Quantity</th>
                <th className="px-6 py-4 font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 font-semibold text-foreground">Date</th>
                <th className="px-6 py-4 font-semibold text-foreground">Amount</th>
                <th className="px-6 py-4 font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {ALL_ORDERS.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                  <td className="px-6 py-4 font-mono text-xs text-primary">{order.id}</td>
                  <td className="px-6 py-4 text-foreground">{order.customer}</td>
                  <td className="px-6 py-4 text-foreground">{order.product}</td>
                  <td className="px-6 py-4 text-muted-foreground">{order.quantity}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4 font-semibold text-foreground">{order.amount}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/orders/${order.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
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
