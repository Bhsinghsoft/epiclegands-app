'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

const DASHBOARD_STATS = [
  { label: 'Total Orders', value: '1,240', change: '+12%' },
  { label: 'Total Revenue', value: '$125,400', change: '+8%' },
  { label: 'Active Products', value: '45', change: '+3' },
  { label: 'Total Customers', value: '320', change: '+25' },
]

const RECENT_ORDERS = [
  {
    id: 'ORD-001',
    customer: 'Global Imports LLC',
    product: 'Turmeric Powder',
    quantity: '5000 KG',
    status: 'Shipped',
    amount: '$25,000',
  },
  {
    id: 'ORD-002',
    customer: 'Middle East Trading',
    product: 'Black Pepper',
    quantity: '2000 KG',
    status: 'Processing',
    amount: '$17,000',
  },
  {
    id: 'ORD-003',
    customer: 'USA Spices Inc',
    product: 'Cumin Seeds',
    quantity: '3000 KG',
    status: 'Pending',
    amount: '$18,000',
  },
  {
    id: 'ORD-004',
    customer: 'UK Foods Ltd',
    product: 'Cardamom',
    quantity: '800 KG',
    status: 'Shipped',
    amount: '$12,000',
  },
]

const STATUS_COLORS: Record<string, string> = {
  Shipped: 'bg-green-100 text-green-800',
  Processing: 'bg-blue-100 text-blue-800',
  Pending: 'bg-yellow-100 text-yellow-800',
}

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Manage products, orders, and customer accounts</p>
          </div>
          <Link href="/auth/signin">
            <Button variant="outline">Logout</Button>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex gap-8">
          <button className="border-b-2 border-primary px-1 py-4 font-semibold text-primary">
            Dashboard
          </button>
          <Link href="/admin/products" className="px-1 py-4 font-semibold text-muted-foreground hover:text-foreground">
            Products
          </Link>
          <Link href="/admin/orders" className="px-1 py-4 font-semibold text-muted-foreground hover:text-foreground">
            Orders
          </Link>
          <Link href="/admin/pricing" className="px-1 py-4 font-semibold text-muted-foreground hover:text-foreground">
            Pricing
          </Link>
          <Link href="/admin/reports" className="px-1 py-4 font-semibold text-muted-foreground hover:text-foreground">
            Reports
          </Link>
        </div>
      </div>

      {/* Stats */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-foreground">Key Metrics</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DASHBOARD_STATS.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-card p-6">
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="mt-2 flex items-baseline justify-between">
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm font-semibold text-green-600">{stat.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Orders */}
      <section className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Recent Orders</h2>
            <Link href="/admin/orders">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>

          <div className="mt-8 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left">
              <thead className="border-b border-border bg-card">
                <tr>
                  <th className="px-6 py-4 font-semibold text-foreground">Order ID</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Customer</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Product</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Quantity</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Amount</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                    <td className="px-6 py-4 font-mono text-sm text-primary">{order.id}</td>
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
                    <td className="px-6 py-4 font-semibold text-foreground">{order.amount}</td>
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
            <Link href="/admin/products?action=add">
              <Button variant="outline" className="h-24 w-full flex-col gap-2">
                <div className="text-2xl">+</div>
                <div>Add Product</div>
              </Button>
            </Link>
            <Link href="/admin/orders">
              <Button variant="outline" className="h-24 w-full flex-col gap-2">
                <div className="text-2xl">📦</div>
                <div>Manage Orders</div>
              </Button>
            </Link>
            <Link href="/admin/pricing">
              <Button variant="outline" className="h-24 w-full flex-col gap-2">
                <div className="text-2xl">💰</div>
                <div>Update Pricing</div>
              </Button>
            </Link>
            <Link href="/admin/reports">
              <Button variant="outline" className="h-24 w-full flex-col gap-2">
                <div className="text-2xl">📊</div>
                <div>View Reports</div>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
