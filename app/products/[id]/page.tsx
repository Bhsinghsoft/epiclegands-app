'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // ✅ Use useParams hook
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Truck, Package, Award, Shield, 
  Clock, MapPin, CheckCircle, Phone, Mail 
} from 'lucide-react';

const PRODUCTS_MAP: Record<
  string,
  {
    id: number;
    name: string;
    category: string;
    moq: string;
    hsCode: string;
    price: string;
    image: string;
    description: string;
    containerLoad: string;
    privateLabel: boolean;
    fullDescription: string;
    specifications: Array<{ label: string; value: string }>;
    origin: string;
    certifications: string[];
    shippingOptions: Array<{ type: string; duration: string; cost: string }>;
  }
> = {
  '1': {
    id: 1,
    name: 'Turmeric Powder',
    category: 'Spices',
    moq: '1000 KG',
    hsCode: '0713.10.00',
    price: '$5-8/KG',
    image: 'bg-gradient-to-br from-amber-100 to-orange-100',
    description: 'Pure organic turmeric powder from Telangana',
    containerLoad: '20 MT',
    privateLabel: true,
    fullDescription:
      'Our premium turmeric powder is sourced from the finest turmeric-growing regions of Telangana. We use traditional farming methods combined with modern processing to ensure maximum curcumin content and purity. Every batch is tested for quality, purity, and potency. Perfect for food processing, pharmaceutical, and cosmetic industries.',
    specifications: [
      { label: 'Curcumin Content', value: '≥7%' },
      { label: 'Moisture', value: '≤10%' },
      { label: 'Ash Content', value: '≤8%' },
      { label: 'Microbial Count', value: '<10,000 CFU/g' },
      { label: 'Color', value: 'Deep Golden Yellow' },
    ],
    origin: 'Telangana, India',
    certifications: ['ISO 9001:2015', 'FSSAI Certified', 'Organic Certified', 'FDA Approved'],
    shippingOptions: [
      { type: 'Air Freight', duration: '3-5 days', cost: '$2-3/KG' },
      { type: 'Sea Freight', duration: '21-28 days', cost: '$0.5-1/KG' },
      { type: 'Land Freight', duration: '7-10 days', cost: '$1-1.5/KG' },
    ],
  },
  '2': {
    id: 2,
    name: 'Black Pepper',
    category: 'Spices',
    moq: '500 KG',
    hsCode: '0704.90.00',
    price: '$8-12/KG',
    image: 'bg-gradient-to-br from-slate-200 to-gray-300',
    description: 'Grade A black pepper from Kerala',
    containerLoad: '18 MT',
    privateLabel: true,
    fullDescription:
      'Premium Grade A black pepper sourced directly from Kerala, India. Hand-harvested and sun-dried for maximum flavor and aroma. Perfect for both industrial use and premium culinary applications. Our pepper is machine cleaned and sorted for uniform size.',
    specifications: [
      { label: 'Piperine Content', value: '≥5%' },
      { label: 'Moisture', value: '≤12%' },
      { label: 'Foreign Matter', value: '<1%' },
      { label: 'Volatile Oil', value: '1.5-3%' },
      { label: 'Grade', value: 'ASTA-A' },
    ],
    origin: 'Kerala, India',
    certifications: ['ISO 9001:2015', 'FSSAI Certified', 'FDA Approved', 'HACCP'],
    shippingOptions: [
      { type: 'Air Freight', duration: '3-5 days', cost: '$2.5-3.5/KG' },
      { type: 'Sea Freight', duration: '21-28 days', cost: '$0.8-1.2/KG' },
      { type: 'Land Freight', duration: '7-10 days', cost: '$1.2-1.8/KG' },
    ],
  },
  '3': {
    id: 3,
    name: 'Cumin Seeds',
    category: 'Seeds',
    moq: '1500 KG',
    hsCode: '0709.60.00',
    price: '$6-10/KG',
    image: 'bg-gradient-to-br from-yellow-100 to-amber-100',
    description: 'Premium cumin seeds from Gujarat',
    containerLoad: '22 MT',
    privateLabel: false,
    fullDescription:
      'High-quality cumin seeds from Gujarat with excellent aroma and flavor. Suitable for both bulk industrial use and retail packaging. Our seeds are carefully selected, machine cleaned, and packed to maintain freshness.',
    specifications: [
      { label: 'Moisture Content', value: '≤10%' },
      { label: 'Foreign Matter', value: '<2%' },
      { label: 'Essential Oil', value: '2.5-4%' },
      { label: 'Bulk Density', value: '750-850 g/L' },
      { label: 'Test Weight', value: '55-65 g/100 seeds' },
    ],
    origin: 'Gujarat, India',
    certifications: ['ISO 9001:2015', 'FSSAI Certified', 'EU Approved'],
    shippingOptions: [
      { type: 'Sea Freight', duration: '21-28 days', cost: '$0.6-1/KG' },
      { type: 'Land Freight', duration: '7-10 days', cost: '$1-1.5/KG' },
    ],
  },
  '4': {
    id: 4,
    name: 'Cardamom',
    category: 'Spices',
    moq: '300 KG',
    hsCode: '0908.31.00',
    price: '$15-20/KG',
    image: 'bg-gradient-to-br from-emerald-100 to-green-100',
    description: 'Premium green cardamom from Idukki',
    containerLoad: '5 MT',
    privateLabel: true,
    fullDescription:
      'Premium green cardamom sourced from the hills of Idukki, Kerala. Known for its intense aroma and flavor. Hand-picked, sun-dried, and carefully graded for export quality.',
    specifications: [
      { label: 'Moisture', value: '≤12%' },
      { label: 'Color', value: 'Deep Green' },
      { label: 'Size', value: '7-8mm' },
      { label: 'Foreign Matter', value: '<1%' },
      { label: 'Volatile Oil', value: '≥4%' },
    ],
    origin: 'Idukki, Kerala',
    certifications: ['ISO 9001:2015', 'Organic Certified', 'Halal Certified'],
    shippingOptions: [
      { type: 'Air Freight', duration: '3-5 days', cost: '$3-4/KG' },
      { type: 'Sea Freight', duration: '21-28 days', cost: '$1-1.5/KG' },
    ],
  },
};

export default function ProductDetailPage() {
  // ✅ Fix: Use useParams hook instead of direct params prop
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        // ✅ Fix: Unwrap params (Next.js 15 - params is Promise)
        const resolvedParams = await params;
        const id = resolvedParams.id;
        
        // ✅ Fix: Convert to string and check
        const idString = Array.isArray(id) ? id[0] : id;
        
        if (idString && PRODUCTS_MAP[idString]) {
          setProduct(PRODUCTS_MAP[idString]);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading product details...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Link href="/products" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800">Product Not Found</h1>
            <p className="text-slate-500 mt-2">The product you're looking for doesn't exist.</p>
            <Link href="/products">
              <Button className="mt-6">Browse All Products</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white">
      
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-emerald-100 py-4 sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-emerald-600">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-emerald-600">Products</Link>
            <span>/</span>
            <span className="text-emerald-600 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Header */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Image */}
            <div className={`${product.image} rounded-3xl h-96 flex items-center justify-center shadow-lg`}>
              <span className="text-8xl">
                {product.name === 'Turmeric Powder' && '🟡'}
                {product.name === 'Black Pepper' && '⚫'}
                {product.name === 'Cumin Seeds' && '🟤'}
                {product.name === 'Cardamom' && '🟢'}
              </span>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                  {product.category}
                </Badge>
                {product.privateLabel && (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                    Private Label Available
                  </Badge>
                )}
              </div>
              <h1 className="mt-4 text-3xl md:text-4xl font-bold text-slate-800">{product.name}</h1>
              <p className="mt-2 text-slate-500">{product.description}</p>

              {/* Key Info Cards */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="text-xs text-slate-500">Price Range</p>
                  <p className="text-xl font-bold text-emerald-600">{product.price}</p>
                </div>
                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="text-xs text-slate-500">Minimum Order</p>
                  <p className="text-xl font-bold text-slate-800">{product.moq}</p>
                </div>
                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="text-xs text-slate-500">Container Load</p>
                  <p className="text-xl font-bold text-slate-800">{product.containerLoad}</p>
                </div>
                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="text-xs text-slate-500">HS Code</p>
                  <p className="text-sm font-bold font-mono text-slate-800">{product.hsCode}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="mailto:sales@epiclegends.com">
                  <Button size="lg" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                    Request Quote
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="outline" size="lg" className="w-full">
                    Register for Account
                  </Button>
                </Link>
              </div>

              {/* Quick Contact */}
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91 98765 43210</span>
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> sales@epiclegends.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="border-t border-emerald-100 bg-white py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-slate-800">Product Details</h2>
          <p className="mt-4 leading-relaxed text-slate-600">{product.fullDescription}</p>
        </div>
      </section>

      {/* Specifications Table */}
      <section className="border-t border-emerald-100 py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-slate-800">Technical Specifications</h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-emerald-100">
            <table className="w-full text-left">
              <tbody>
                {product.specifications.map((spec: any, idx: number) => (
                  <tr key={idx} className="border-b border-emerald-100 last:border-b-0">
                    <td className="px-6 py-4 font-semibold text-slate-700 bg-emerald-50/30 w-1/3">
                      {spec.label}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Origin & Certifications */}
      <section className="border-t border-emerald-100 bg-white py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-slate-800">Origin</h3>
                <p className="mt-1 text-slate-600">{product.origin}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-emerald-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-slate-800">Certifications</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.certifications.map((cert: string) => (
                    <Badge key={cert} variant="outline" className="border-emerald-200 text-emerald-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="border-t border-emerald-100 py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-slate-800">Shipping Options</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {product.shippingOptions.map((option: any, idx: number) => (
              <div key={idx} className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <Truck className="w-8 h-8 text-emerald-500 mb-3" />
                <h4 className="font-semibold text-slate-800">{option.type}</h4>
                <div className="mt-3 space-y-1 text-sm text-slate-500">
                  <p>⏱️ {option.duration}</p>
                  <p className="font-semibold text-emerald-600">💰 {option.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl md:text-3xl font-bold">Ready to Place an Order?</h2>
          <p className="mt-2 text-emerald-100">
            Get in touch with our sales team for quotes, samples, and bulk orders.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="mailto:sales@epiclegends.com">
              <Button variant="secondary" size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                Email Sales Team
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}