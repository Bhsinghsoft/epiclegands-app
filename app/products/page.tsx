'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Package, Star, Truck, Award, Filter } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: 'Turmeric Powder',
    category: 'Spices',
    moq: '1000 KG',
    hsCode: '0910.30.30',
    price: '$5-8/KG',
    image: 'bg-gradient-to-br from-amber-100 to-orange-100',
    description: 'Pure organic turmeric powder from Telangana. High curcumin content.',
    containerLoad: '20 MT',
    privateLabel: true,
    rating: 4.9,
    origin: 'Telangana, India',
  },
  {
    id: 2,
    name: 'Black Pepper',
    category: 'Spices',
    moq: '500 KG',
    hsCode: '0904.11.10',
    price: '$8-12/KG',
    image: 'bg-gradient-to-br from-slate-200 to-gray-300',
    description: 'Grade A black pepper from Kerala. Tellicherry Garbled Special.',
    containerLoad: '18 MT',
    privateLabel: true,
    rating: 4.8,
    origin: 'Kerala, India',
  },
  {
    id: 3,
    name: 'Cumin Seeds',
    category: 'Seeds',
    moq: '1500 KG',
    hsCode: '0909.31.00',
    price: '$6-10/KG',
    image: 'bg-gradient-to-br from-yellow-100 to-amber-100',
    description: 'Premium cumin seeds from Gujarat. Europe quality, 99% purity.',
    containerLoad: '22 MT',
    privateLabel: false,
    rating: 4.7,
    origin: 'Gujarat, India',
  },
  {
    id: 4,
    name: 'Cardamom',
    category: 'Spices',
    moq: '300 KG',
    hsCode: '0908.31.00',
    price: '$15-20/KG',
    image: 'bg-gradient-to-br from-emerald-100 to-green-100',
    description: 'Green cardamom from Kerala hills. Bold size 7-8mm.',
    containerLoad: '15 MT',
    privateLabel: true,
    rating: 4.9,
    origin: 'Idukki, Kerala',
  },
  {
    id: 5,
    name: 'Coriander Seeds',
    category: 'Seeds',
    moq: '2000 KG',
    hsCode: '0909.21.10',
    price: '$4-7/KG',
    image: 'bg-gradient-to-br from-amber-100 to-yellow-100',
    description: 'High-quality coriander seeds. Eagle quality, 99% purity.',
    containerLoad: '24 MT',
    privateLabel: false,
    rating: 4.6,
    origin: 'Rajasthan, India',
  },
  {
    id: 6,
    name: 'Red Chilli',
    category: 'Spices',
    moq: '1200 KG',
    hsCode: '0904.21.10',
    price: '$7-11/KG',
    image: 'bg-gradient-to-br from-red-100 to-rose-100',
    description: 'Organic red chili from Andhra Pradesh. Teja variety.',
    containerLoad: '21 MT',
    privateLabel: true,
    rating: 4.8,
    origin: 'Guntur, Andhra',
  },
  {
    id: 7,
    name: 'Ginger Powder',
    category: 'Spices',
    moq: '800 KG',
    hsCode: '0910.11.10',
    price: '$3-5/KG',
    image: 'bg-gradient-to-br from-orange-100 to-amber-100',
    description: 'Fresh ginger powder. High oil content, rich flavor.',
    containerLoad: '23 MT',
    privateLabel: true,
    rating: 4.5,
    origin: 'Kerala, India',
  },
  {
    id: 8,
    name: 'Fenugreek Seeds',
    category: 'Seeds',
    moq: '1000 KG',
    hsCode: '0910.99.10',
    price: '$5-8/KG',
    image: 'bg-gradient-to-br from-yellow-100 to-orange-100',
    description: 'Premium fenugreek seeds. Golden yellow, 99% purity.',
    containerLoad: '20 MT',
    privateLabel: false,
    rating: 4.5,
    origin: 'Rajasthan, India',
  },
];

const CATEGORIES = ['All', 'Spices', 'Seeds', 'Private Label'];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                          product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      product.category === selectedCategory ||
      (selectedCategory === 'Private Label' && product.privateLabel);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Premium Product Range</h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Export-quality spices with complete traceability from farm to port
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-emerald-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-slate-500">
            Showing {filteredProducts.length} of {PRODUCTS.length} products
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600">No products found</h3>
              <p className="text-slate-400 mt-2">Try adjusting your search or filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div className="group bg-white rounded-2xl overflow-hidden border border-emerald-100 hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-500 hover:-translate-y-2">
                    {/* Image */}
                    <div className={`${product.image} h-40 flex items-center justify-center`}>
                      <span className="text-6xl">
                        {product.name === 'Turmeric Powder' && '🟡'}
                        {product.name === 'Black Pepper' && '⚫'}
                        {product.name === 'Cumin Seeds' && '🟤'}
                        {product.name === 'Cardamom' && '🟢'}
                        {product.name === 'Coriander Seeds' && '🟠'}
                        {product.name === 'Red Chilli' && '🔴'}
                        {product.name === 'Ginger Powder' && '🟡'}
                        {product.name === 'Fenugreek Seeds' && '🟤'}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-slate-800 text-lg group-hover:text-emerald-600 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-slate-500 mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                        <div>
                          <p className="text-xs text-slate-400">MOQ</p>
                          <p className="font-semibold text-slate-700">{product.moq}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Price</p>
                          <p className="font-semibold text-emerald-600">{product.price}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {product.privateLabel && (
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-xs">
                            Private Label
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-xs">
                          {product.category}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs">
                          HS: {product.hsCode}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Export Benefits */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <Truck className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800">Worldwide Shipping</h3>
              <p className="text-sm text-slate-500">FCL/LCL to all major ports</p>
            </div>
            <div className="p-6">
              <Award className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800">Quality Certified</h3>
              <p className="text-sm text-slate-500">FDA, EU, Organic, Halal</p>
            </div>
            <div className="p-6">
              <Package className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800">Farm Direct</h3>
              <p className="text-sm text-slate-500">No middlemen, best prices</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Need Custom Sourcing?</h2>
          <p className="mt-2 text-emerald-100">
            Contact our team for bulk orders, private label options, or custom specifications.
          </p>
          <div className="mt-6">
            <Link href="mailto:sales@epiclegends.com">
              <Button variant="secondary" size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                Contact Sales Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}