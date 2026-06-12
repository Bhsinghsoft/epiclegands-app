'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

const CUSTOMER_ORDERS = [
  {
    id: 'ORD-C001',
    product: 'Turmeric Powder',
    quantity: '2000 KG',
    orderDate: '2024-01-10',
    status: 'Delivered',
    amount: '$10,000',
  },
  {
    id: 'ORD-C002',
    product: 'Black Pepper',
    quantity: '1000 KG',
    orderDate: '2024-01-05',
    status: 'Delivered',
    amount: '$8,500',
  },
  {
    id: 'ORD-C003',
    product: 'Cumin Seeds',
    quantity: '1500 KG',
    orderDate: '2023-12-28',
    status: 'Delivered',
    amount: '$9,000',
  },
]

const CUSTOMER_STATS = [
  { label: 'Total Orders', value: '12' },
  { label: 'Total Spent', value: '$125,000' },
  { label: 'Avg Order Value', value: '$10,417' },
  { label: 'Member Since', value: 'Jan 2023' },
]

const STATUS_COLORS: Record<string, string> = {
  Delivered: 'bg-green-100 text-green-800',
  Shipped: 'bg-blue-100 text-blue-800',
  Processing: 'bg-yellow-100 text-yellow-800',
}

export default function CustomerDashboard() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Account</h1>
            <p className="mt-2 text-muted-foreground">View orders and manage account</p>
          </div>
          <Button variant="outline">Logout</Button>
        </div>
      </div>

      {/* Stats */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-foreground">Account Summary</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CUSTOMER_STATS.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-card p-6">
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="mt-2 text-2xl font-bold text-foreground">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orders */}
      <section className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Order History</h2>
            <Link href="/products">
              <Button>Place New Order</Button>
            </Link>
          </div>

          <div className="mt-8 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left">
              <thead className="border-b border-border bg-card">
                <tr>
                  <th className="px-6 py-4 font-semibold text-foreground">Order ID</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Product</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Quantity</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Order Date</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Amount</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {CUSTOMER_ORDERS.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                    <td className="px-6 py-4 font-mono text-sm text-primary">{order.id}</td>
                    <td className="px-6 py-4 text-foreground">{order.product}</td>
                    <td className="px-6 py-4 text-muted-foreground">{order.quantity}</td>
                    <td className="px-6 py-4 text-muted-foreground">{order.orderDate}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-foreground">{order.amount}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <Link href={`/customer/orders/${order.id}`}>
                        <Button variant="outline" size="sm">Details</Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/api/invoice/${order.id}`}
                      >
                        Invoice
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/products">
              <Button variant="outline" className="h-24 w-full flex-col gap-2">
                <div className="text-2xl">🛒</div>
                <div>Browse Products</div>
              </Button>
            </Link>
            <Button variant="outline" className="h-24 w-full flex-col gap-2">
              <div className="text-2xl">📥</div>
              <div>Download Invoices</div>
            </Button>
            <Button variant="outline" className="h-24 w-full flex-col gap-2">
              <div className="text-2xl">💬</div>
              <div>Contact Support</div>
            </Button>
            <Button variant="outline" className="h-24 w-full flex-col gap-2">
              <div className="text-2xl">⚙️</div>
              <div>Account Settings</div>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
