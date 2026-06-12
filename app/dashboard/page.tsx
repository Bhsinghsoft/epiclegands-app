'use client'

import { useSession, signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-2xl font-bold text-primary">
            Epic Legends
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {session?.user?.name}</span>
            <Button
              variant="outline"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome to your Epic Legends account. More features coming soon!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-semibold text-foreground">My Orders</h2>
            <p className="mt-2 text-muted-foreground">View and manage your orders</p>
            <Link href="/dashboard/orders">
              <Button variant="outline" className="mt-4 w-full">
                View Orders
              </Button>
            </Link>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-semibold text-foreground">Products</h2>
            <p className="mt-2 text-muted-foreground">Browse our product catalog</p>
            <Link href="/products">
              <Button variant="outline" className="mt-4 w-full">
                Browse Products
              </Button>
            </Link>
          </div>

          {(session?.user as any)?.role === 'admin' && (
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="font-semibold text-foreground">Admin Panel</h2>
              <p className="mt-2 text-muted-foreground">Manage users and content</p>
              <Link href="/dashboard/admin">
                <Button variant="outline" className="mt-4 w-full">
                  Go to Admin
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="mt-12 rounded-lg border border-border bg-card p-6">
          <h2 className="font-semibold text-foreground">Account Information</h2>
          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Name:</span> {session?.user?.name}
            </p>
            <p>
              <span className="text-muted-foreground">Email:</span> {session?.user?.email}
            </p>
            <p>
              <span className="text-muted-foreground">Role:</span>{' '}
              <span className="capitalize">{(session?.user as any)?.role}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
