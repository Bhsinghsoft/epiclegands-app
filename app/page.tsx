'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Certifications } from '@/components/Certifications';

import { WhatsAppButton } from '@/components/WhatsAppButton';
import { 
  ArrowRight, TrendingUp, Users, Package, Globe, 
  Shield, Clock, Award, Star, Truck, Leaf, CheckCircle,
  Download, Calendar, Phone, MessageCircle, FileText
} from 'lucide-react';
import { Testimonials } from '@/components/Testimonials';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white">
      
      {/* Hero Section - Improved with 5 CTAs */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-teal-600/5" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 mb-6">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-700 font-medium">India's Premier Export Partner</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                India's{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
                  Trusted Export Gateway
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Connecting international buyers with verified Indian suppliers across spices, 
                commodities, and agricultural produce — from farm to destination.
              </p>
              
              {/* ✅ 5 CTAs as per PDF Page 9 */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link href="/products">
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl px-6">
                    Request Quote
                  </Button>
                </Link>
                <Link href="/catalogue.pdf">
                  <Button variant="outline" className="rounded-xl border-emerald-200">
                    <Download className="w-4 h-4 mr-2" />
                    Download Catalogue
                  </Button>
                </Link>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-xl border-green-200 text-green-600 hover:bg-green-50">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </a>
                <button className="rounded-xl px-4 py-2 text-emerald-600 border border-emerald-200 hover:bg-emerald-50 transition-colors">
                  <Calendar className="w-4 h-4 mr-2 inline" />
                  Schedule Meeting
                </button>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Award className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Certifications</p>
                    <p className="font-semibold text-slate-800">8+ Global</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Countries Served</p>
                    <p className="font-semibold text-slate-800">25+</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Package className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Products</p>
                    <p className="font-semibold text-slate-800">50+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Stats Card */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-emerald-100">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Users, value: '500+', label: 'Global Clients' },
                    { icon: Package, value: '50+', label: 'Products' },
                    { icon: Globe, value: '25+', label: 'Countries' },
                    { icon: TrendingUp, value: '99%', label: 'Satisfaction' },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50">
                      <stat.icon className="w-8 h-8 text-emerald-500 mb-2" />
                      <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                      <div className="text-xs text-slate-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center">
                  <p className="text-sm">Export Capability</p>
                  <p className="text-xl font-bold">20+ Containers Monthly</p>
                  <p className="text-2xl font-bold mt-2">FCL/LCL Worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-emerald-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10+', label: 'Years Experience', icon: Clock },
              { value: '25+', label: 'Export Countries', icon: Globe },
              { value: '500+', label: 'Happy Clients', icon: Users },
              { value: '100%', label: 'Quality Assured', icon: CheckCircle },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Certifications Wall (NEW) */}
      <Certifications />

      {/* Products Preview */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Premium{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                Export Products
              </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Export-quality spices with complete traceability from farm to port
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Turmeric Powder', origin: 'Sangli, India', moq: '1,000 KG', price: '$5-8/kg', rating: 4.9, emoji: '🟡' },
              { name: 'Black Pepper', origin: 'Kerala, India', moq: '500 KG', price: '$8-12/kg', rating: 4.8, emoji: '⚫' },
              { name: 'Cardamom', origin: 'Idukki, India', moq: '300 KG', price: '$15-20/kg', rating: 4.9, emoji: '🟢' },
              { name: 'Cumin Seeds', origin: 'Gujarat, India', moq: '1,500 KG', price: '$6-10/kg', rating: 4.7, emoji: '🟤' },
            ].map((product, i) => (
              <Link key={i} href={`/products/${i + 1}`}>
                <div className="group bg-white rounded-2xl overflow-hidden border border-emerald-100 hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-500 hover:-translate-y-2">
                  <div className="h-32 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                    <span className="text-6xl">{product.emoji}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">{product.origin}</p>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <div className="flex justify-between items-center">
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
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/products">
              <Button variant="outline" className="rounded-xl">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ B2B Testimonials (NEW) */}
      <Testimonials />

      {/* Why Choose Us - 6 Pillars */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                Epic Legends
              </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Six pillars that make us your trusted export partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: '10+ Years Experience', desc: 'Building corridors into GCC, Western Europe and North America' },
              { icon: Users, title: 'Expert Team', desc: 'Procurement, QC, packaging, documentation across functions' },
              { icon: Shield, title: 'Quality Testing', desc: 'Lab reports per lot - moisture, purity, oil content' },
              { icon: Truck, title: 'Global Shipping', desc: 'CFR, CIF, FOB, DDP. Mundra, Nhava Sheva & Pipavav' },
              { icon: Award, title: 'Private Label', desc: 'Custom artwork, retail packs, regulatory labels' },
              { icon: Package, title: 'Bulk Order Handling', desc: 'Single SKU to mixed-SKU consolidation from 1MT MOQ' },
            ].map((item, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Source Premium Spices?</h2>
          <p className="text-emerald-100 mb-8">
            Get a free quote within 24 hours. No minimum order for samples.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="bg-white text-emerald-600 hover:bg-gray-100 rounded-xl px-8">
                Browse Products
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-xl px-8">
                Register as Importer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button (NEW) */}
      <WhatsAppButton />
    </div>
  );
}