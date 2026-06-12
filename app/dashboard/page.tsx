'use client';

import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, Package, User, Settings, LogOut, 
  FileText, Heart, Globe, Award, ClipboardList 
} from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  const userRole = (session?.user as any)?.role || 'user';
  const isAdmin = userRole === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white">
      
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">My Dashboard</h1>
              <p className="text-emerald-100 mt-1">
                Welcome back, {session?.user?.name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/20 text-sm">
                {userRole === 'admin' ? '👑 Admin' : '👤 Importer'}
              </span>
              <Button
                variant="outline"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="border-white/30 text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Orders', value: '12', icon: ShoppingBag, change: '+3 this month' },
            { label: 'Active Quotes', value: '3', icon: FileText, change: 'Pending response' },
            { label: 'Saved Products', value: '8', icon: Heart, change: 'Wishlist' },
            { label: 'Countries Export', value: '5', icon: Globe, change: 'USA, UAE, UK, Germany, Australia' },
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <stat.icon className="w-8 h-8 text-emerald-500" />
                <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
              </div>
              <p className="mt-2 font-semibold text-slate-700">{stat.label}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* My Orders */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="font-semibold text-slate-800 text-lg">My Orders</h2>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              Track your orders, view invoices, and manage shipments
            </p>
            <Link href="/dashboard/orders">
              <Button variant="outline" className="w-full rounded-xl">
                View Orders
              </Button>
            </Link>
          </div>

          {/* Product Catalog */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Package className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="font-semibold text-slate-800 text-lg">Product Catalog</h2>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              Browse our complete range of export-quality spices
            </p>
            <Link href="/products">
              <Button variant="outline" className="w-full rounded-xl">
                Browse Products
              </Button>
            </Link>
          </div>

          {/* Request Quote */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="font-semibold text-slate-800 text-lg">Request Quote</h2>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              Get custom pricing for bulk orders and specific requirements
            </p>
            <Link href="/products">
              <Button variant="outline" className="w-full rounded-xl">
                Request Quote
              </Button>
            </Link>
          </div>

          {/* Certifications (PDF Requirement) */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Award className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="font-semibold text-slate-800 text-lg">Certifications</h2>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              View and download our export certifications (IEC, APEDA, FSSAI, ISO, HACCP, HALAL)
            </p>
            <Link href="/certifications">
              <Button variant="outline" className="w-full rounded-xl">
                View Certifications
              </Button>
            </Link>
          </div>

          {/* Account Settings */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="font-semibold text-slate-800 text-lg">Account Settings</h2>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              Update your profile, company info, and preferences
            </p>
            <Link href="/dashboard/settings">
              <Button variant="outline" className="w-full rounded-xl">
                Manage Account
              </Button>
            </Link>
          </div>

          {/* Admin Panel (only for admin) */}
          {isAdmin && (
            <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-semibold text-slate-800 text-lg">Admin Panel</h2>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Manage products, orders, users, pricing, and certifications
              </p>
              <Link href="/admin">
                <Button className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                  Go to Admin Panel
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Recent Orders Table */}
        <div className="mt-12 rounded-2xl border border-emerald-100 bg-white p-6">
          <h2 className="font-semibold text-slate-800 text-lg mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-emerald-100">
                <tr>
                  <th className="pb-3 text-sm font-medium text-slate-500">Order ID</th>
                  <th className="pb-3 text-sm font-medium text-slate-500">Date</th>
                  <th className="pb-3 text-sm font-medium text-slate-500">Amount</th>
                  <th className="pb-3 text-sm font-medium text-slate-500">Status</th>
                  <th className="pb-3 text-sm font-medium text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50">
                {[
                  { id: '#EL-1001', date: '2024-01-15', amount: '$5,200', status: 'Shipped' },
                  { id: '#EL-1002', date: '2024-01-10', amount: '$3,800', status: 'Processing' },
                  { id: '#EL-1003', date: '2024-01-05', amount: '$7,500', status: 'Delivered' },
                ].map((order) => (
                  <tr key={order.id} className="hover:bg-emerald-50/30">
                    <td className="py-3 text-sm font-medium text-slate-700">{order.id}</td>
                    <td className="py-3 text-sm text-slate-500">{order.date}</td>
                    <td className="py-3 text-sm font-semibold text-emerald-600">{order.amount}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <Link href={`/dashboard/orders/${order.id}`} className="text-emerald-600 hover:text-emerald-700 text-sm">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Account Info */}
        <div className="mt-8 rounded-2xl border border-emerald-100 bg-white p-6">
          <h2 className="font-semibold text-slate-800 text-lg mb-4">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Full Name:</span>
              <p className="font-medium text-slate-800">{session?.user?.name}</p>
            </div>
            <div>
              <span className="text-slate-500">Email Address:</span>
              <p className="font-medium text-slate-800">{session?.user?.email}</p>
            </div>
            <div>
              <span className="text-slate-500">Account Type:</span>
              <p className="font-medium text-slate-800 capitalize">{userRole}</p>
            </div>
            <div>
              <span className="text-slate-500">Member Since:</span>
              <p className="font-medium text-slate-800">January 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}