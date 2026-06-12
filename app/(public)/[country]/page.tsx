'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Globe, Ship, Award, Leaf, Package, ChevronRight, ArrowRight, 
  Star, Users, TrendingUp, Shield, Clock, MapPin, Phone, 
  CheckCircle, Truck, Coffee, Sparkles, HeartHandshake 
} from 'lucide-react';
import { Certifications } from '@/components/Certifications';
import { Testimonials } from '@/components/Testimonials';
import { WhatsAppButton } from '@/components/WhatsAppButton';

// ✅ Country Data (Add more countries here)
const COUNTRIES_DATA: Record<string, any> = {
  india: {
    name: 'India',
    flag: '🇮🇳',
    code: 'IN',
    currency: 'INR',
    marketSize: '$2B+',
    shippingTime: '3-5 days',
    minOrder: '100 kg',
    heroColor: 'from-orange-500 to-amber-600',
    accentColor: 'orange',
    specialProduct: 'Premium Turmeric',
    specialPrice: '₹200/kg',
    description: 'India\'s #1 Spice Export Gateway. Direct sourcing from certified farms across Kerala, Gujarat, and Rajasthan.'
  },
  uae: {
    name: 'UAE',
    flag: '🇦🇪',
    code: 'AE',
    currency: 'AED',
    marketSize: '$500M+',
    shippingTime: '5-7 days',
    minOrder: '500 kg',
    heroColor: 'from-emerald-500 to-teal-600',
    accentColor: 'emerald',
    specialProduct: 'Premium Cardamom',
    specialPrice: 'د.إ 55/kg',
    description: 'Dubai, Abu Dhabi, Sharjah - Your Gateway to GCC Markets. Fast shipping to Jebel Ali Port.'
  },
  usa: {
    name: 'USA',
    flag: '🇺🇸',
    code: 'US',
    currency: 'USD',
    marketSize: '$3B+',
    shippingTime: '14-21 days',
    minOrder: '1000 kg',
    heroColor: 'from-blue-500 to-indigo-600',
    accentColor: 'blue',
    specialProduct: 'Black Pepper',
    specialPrice: '$8/kg',
    description: 'New York, California, Texas - North America\'s Spice Hub. FDA approved facilities.'
  },
  uk: {
    name: 'United Kingdom',
    flag: '🇬🇧',
    code: 'GB',
    currency: 'GBP',
    marketSize: '$200M+',
    shippingTime: '10-14 days',
    minOrder: '500 kg',
    heroColor: 'from-red-500 to-rose-600',
    accentColor: 'red',
    specialProduct: 'Cumin Seeds',
    specialPrice: '£6/kg',
    description: 'London, Manchester, Birmingham - Europe\'s Spice Capital. Halal certified products.'
  },
  germany: {
    name: 'Germany',
    flag: '🇩🇪',
    code: 'DE',
    currency: 'EUR',
    marketSize: '$150M+',
    shippingTime: '10-14 days',
    minOrder: '500 kg',
    heroColor: 'from-yellow-500 to-amber-600',
    accentColor: 'yellow',
    specialProduct: 'Organic Turmeric',
    specialPrice: '€7/kg',
    description: 'Berlin, Hamburg, Munich - EU\'s Largest Spice Market. Organic certified.'
  },
  australia: {
    name: 'Australia',
    flag: '🇦🇺',
    code: 'AU',
    currency: 'AUD',
    marketSize: '$100M+',
    shippingTime: '14-21 days',
    minOrder: '1000 kg',
    heroColor: 'from-red-500 to-orange-600',
    accentColor: 'red',
    specialProduct: 'Premium Cardamom',
    specialPrice: 'A$12/kg',
    description: 'Sydney, Melbourne, Brisbane - Asia Pacific Hub. AQIS compliant.'
  },
};

const PRODUCTS = [
  { name: 'Turmeric Powder', origin: 'Sangli, India', moq: '1,000 KG', price: '$5-8/kg', rating: 4.9, emoji: '🟡' },
  { name: 'Black Pepper', origin: 'Kerala, India', moq: '500 KG', price: '$8-12/kg', rating: 4.8, emoji: '⚫' },
  { name: 'Cardamom', origin: 'Idukki, India', moq: '300 KG', price: '$15-20/kg', rating: 4.9, emoji: '🟢' },
  { name: 'Cumin Seeds', origin: 'Gujarat, India', moq: '1,500 KG', price: '$6-10/kg', rating: 4.7, emoji: '🟤' },
];

const FEATURES = [
  { icon: Shield, title: 'Quality Certified', description: 'FDA, EU, Halal, Organic certifications', color: 'emerald' },
  { icon: Ship, title: 'Global Shipping', description: 'Sea & air freight to 50+ countries', color: 'blue' },
  { icon: Clock, title: 'On-Time Delivery', description: '99% on-time delivery record', color: 'orange' },
  { icon: Award, title: 'Best Prices', description: 'Direct from source pricing', color: 'purple' },
];

interface PageProps {
  params: { country: string };
}

export default function CountryPage({ params }: PageProps) {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Handle params (Next.js 15 compatibility)
    const getParams = async () => {
      const resolvedParams = await params;
      setCountryCode(resolvedParams.country);
    };
    getParams();
  }, [params]);

  if (!countryCode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading market data...</p>
        </div>
      </div>
    );
  }

  const country = COUNTRIES_DATA[countryCode];
  
  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <Globe className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Market Coming Soon</h1>
          <p className="text-slate-600 mb-6">We're expanding to {countryCode.toUpperCase()} soon. Stay tuned!</p>
          <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const gradientClass = `bg-gradient-to-r ${country.heroColor}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white">
      
      {/* Hero Section - Country Specific */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
        <div className={`absolute inset-0 ${gradientClass} opacity-5`} />
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 mb-6">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-700 font-medium">
                  Exporting to {country.name}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Premium Spices 
                <span className={`block text-transparent bg-clip-text ${gradientClass}`}>
                  Exported to {country.name}
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                {country.description}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link href="/products">
                  <button className="group px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:-translate-y-1">
                    <span className="flex items-center gap-2">
                      Browse Products
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>
                <Link href="/auth/register">
                  <button className="px-8 py-3 rounded-2xl border-2 border-emerald-200 bg-white text-emerald-600 font-semibold hover:border-emerald-400 transition-all">
                    Get Quote
                  </button>
                </Link>
              </div>

              {/* Stats Row */}
              <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Market Size</p>
                    <p className="font-bold text-slate-800">{country.marketSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Ship className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Shipping</p>
                    <p className="font-bold text-slate-800">{country.shippingTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Package className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Min Order</p>
                    <p className="font-bold text-slate-800">{country.minOrder}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Special Offer Card */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-emerald-100">
                <div className="text-center mb-6">
                  <span className="text-6xl">{country.flag}</span>
                  <h3 className="text-xl font-bold text-slate-800 mt-2">{country.name} Market</h3>
                  <p className="text-sm text-slate-500">{country.currency} Currency</p>
                </div>
                <div className={`p-6 rounded-2xl ${gradientClass} text-white text-center`}>
                  <p className="text-sm opacity-90">Special Offer for {country.name}</p>
                  <p className="text-2xl font-bold mt-2">{country.specialProduct}</p>
                  <p className="text-3xl font-bold mt-2">{country.specialPrice}</p>
                  <p className="text-sm opacity-90 mt-2">*MOQ {country.minOrder}</p>
                </div>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Customs clearance support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose{' '}
              <span className={`text-transparent bg-clip-text ${gradientClass}`}>
                Epic Legends
              </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We make exporting to {country.name} seamless and reliable
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-emerald-50/20 to-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Products for <span className={`text-transparent bg-clip-text ${gradientClass}`}>{country.name}</span>
            </h2>
            <p className="text-slate-600">Most demanded spices in the {country.name} market</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden border border-emerald-100 hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className={`h-32 ${gradientClass} opacity-20 flex items-center justify-center`}>
                  <span className="text-6xl">{product.emoji}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-800 text-lg">{product.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {product.origin}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-slate-500">MOQ</p>
                      <p className="font-semibold text-sm">{product.moq}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Price</p>
                      <p className="font-bold text-emerald-600">{product.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 px-4 ${gradientClass} text-white`}>
        <div className="mx-auto max-w-4xl text-center">
          <HeartHandshake className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Source Spices for {country.name}?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Get a free quote within 24 hours. Dedicated support for {country.name} importers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <button className="px-8 py-3 rounded-2xl bg-white text-emerald-600 font-semibold hover:shadow-xl transition-all">
                Register as Importer
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-3 rounded-2xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all">
                Talk to Expert
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Certifications />

{/* B2B Testimonials */}
<Testimonials />

{/* WhatsApp Button */}
<WhatsAppButton />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-6 h-6 text-emerald-400" />
                <span className="text-xl font-bold">EpicLegends</span>
              </div>
              <p className="text-slate-400 text-sm">Premium spices & agricultural products export from India to {country.name}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/products" className="hover:text-emerald-400">Products</Link></li>
                <li><Link href="/about" className="hover:text-emerald-400">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-emerald-400">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Markets</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/india" className="hover:text-emerald-400">India</Link></li>
                <li><Link href="/uae" className="hover:text-emerald-400">UAE</Link></li>
                <li><Link href="/usa" className="hover:text-emerald-400">USA</Link></li>
                <li><Link href="/uk" className="hover:text-emerald-400">UK</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-slate-400">Email: sales@epiclegends.com</p>
              <p className="text-sm text-slate-400 mt-2">Phone: +91 98765 43210</p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2024 Epic Legends. All rights reserved. Exporting to {country.name} since 2015.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}