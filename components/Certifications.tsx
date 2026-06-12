'use client';

import { Award, Download, Shield, CheckCircle, FileCheck, Leaf, Globe, Truck } from 'lucide-react';
import { useState } from 'react';

const CERTIFICATIONS = [
  { 
    name: 'IEC', 
    fullName: 'Import Export Code', 
    icon: Globe, 
    color: 'from-blue-500 to-cyan-500',
    description: 'Government of India registered exporter',
    downloadable: true
  },
  { 
    name: 'APEDA', 
    fullName: 'Agricultural Products Export Development Authority', 
    icon: Leaf, 
    color: 'from-emerald-500 to-teal-500',
    description: 'Registered for agricultural exports',
    downloadable: true
  },
  { 
    name: 'FSSAI', 
    fullName: 'Food Safety and Standards Authority of India', 
    icon: Shield, 
    color: 'from-orange-500 to-red-500',
    description: 'Food safety certified',
    downloadable: true
  },
  { 
    name: 'ISO 9001:2015', 
    fullName: 'Quality Management System', 
    icon: Award, 
    color: 'from-purple-500 to-pink-500',
    description: 'International quality standards',
    downloadable: true
  },
  { 
    name: 'HACCP', 
    fullName: 'Hazard Analysis Critical Control Point', 
    icon: CheckCircle, 
    color: 'from-green-500 to-emerald-500',
    description: 'Food safety management',
    downloadable: true
  },
  { 
    name: 'HALAL', 
    fullName: 'Halal Certified', 
    icon: FileCheck, 
    color: 'from-amber-500 to-yellow-500',
    description: 'Halal compliant products',
    downloadable: true
  },
  { 
    name: 'Organic', 
    fullName: 'Organic Certified', 
    icon: Leaf, 
    color: 'from-lime-500 to-green-500',
    description: 'USDA & EU organic standards',
    downloadable: true
  },
  { 
    name: 'GST', 
    fullName: 'Goods and Services Tax', 
    icon: Truck, 
    color: 'from-slate-500 to-gray-500',
    description: 'Tax compliant',
    downloadable: true
  },
];

export function Certifications() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (certName: string) => {
    setDownloading(certName);
    // Simulate download - in production, link to actual PDF
    setTimeout(() => {
      alert(`Downloading ${certName} certificate...`);
      setDownloading(null);
    }, 500);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Our Credentials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Certified &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              Trusted Worldwide
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We hold all major certifications required for international spice trade
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.name}
              className="group relative bg-white rounded-2xl p-5 text-center border border-emerald-100 hover:shadow-xl hover:shadow-emerald-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => cert.downloadable && handleDownload(cert.name)}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <cert.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">{cert.name}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{cert.fullName}</p>
              {cert.downloadable && (
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="w-4 h-4 text-emerald-500" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Download Note */}
        <div className="text-center mt-8 text-sm text-slate-500">
          <p>Click on any certification to download the official certificate (PDF)</p>
        </div>
      </div>
    </section>
  );
}