'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, Package, Search, Loader2 } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  category: string;
  moq: string;
  price: string;
  status: string;
  stock: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ✅ Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Delete product
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    setDeletingId(id);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        fetchProducts(); // Refresh list
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    } finally {
      setDeletingId(null);
    }
  };

  // Filter products by search
  const filteredProducts = products.filter(p => 
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      
      {/* Header */}
      <div className="border-b border-emerald-100 bg-white px-4 py-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Products Management</h1>
            <p className="mt-1 text-slate-500">Manage your export product catalog</p>
          </div>
          <Link href="/admin/products/add">
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-emerald-50 border-b border-emerald-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Product</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Category</th>
                <th className="px-6 py-4 font-semibold text-slate-700">MOQ</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Price Range</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Stock</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-emerald-50/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                        <Package className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="font-medium text-slate-800">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{product.category || 'Spices'}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{product.moq || '-'}</td>
                  <td className="px-6 py-4 text-sm font-medium text-emerald-600">{product.price || '-'}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{product.stock || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/products/${product._id}`}>
                        <button className="p-2 rounded-lg text-blue-600 hover:bg-blue-50" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        disabled={deletingId === product._id}
                        className="p-2 rounded-lg text-red-600 hover:bg-red-50 disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === product._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                      <Link href={`/products/${product._id}`} target="_blank">
                        <button className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50" title="Preview">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}