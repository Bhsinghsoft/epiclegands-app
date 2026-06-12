'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Award, Upload, Download, Edit, Trash2, Plus, 
  CheckCircle, Eye, FileText, Shield 
} from 'lucide-react';

const CERTIFICATIONS_LIST = [
  { id: 1, name: 'IEC', fullName: 'Import Export Code', status: 'Active', expiryDate: '2025-12-31', downloadable: true },
  { id: 2, name: 'APEDA', fullName: 'Agricultural Products Export Development Authority', status: 'Active', expiryDate: '2025-12-31', downloadable: true },
  { id: 3, name: 'FSSAI', fullName: 'Food Safety and Standards Authority of India', status: 'Active', expiryDate: '2026-06-30', downloadable: true },
  { id: 4, name: 'ISO 9001:2015', fullName: 'Quality Management System', status: 'Active', expiryDate: '2025-03-15', downloadable: true },
  { id: 5, name: 'HACCP', fullName: 'Hazard Analysis Critical Control Point', status: 'Active', expiryDate: '2025-08-20', downloadable: true },
  { id: 6, name: 'HALAL', fullName: 'Halal Certified', status: 'Active', expiryDate: '2025-11-10', downloadable: true },
  { id: 7, name: 'Organic', fullName: 'Organic Certified (USDA/EU)', status: 'Active', expiryDate: '2025-05-01', downloadable: true },
  { id: 8, name: 'GST', fullName: 'Goods and Services Tax', status: 'Active', expiryDate: 'Life Time', downloadable: true },
];

export default function AdminCertificationsPage() {
  const [certifications, setCertifications] = useState(CERTIFICATIONS_LIST);

  const handleDownload = (certName: string) => {
    alert(`Downloading ${certName} certificate...`);
  };

  const handleStatusToggle = (id: number) => {
    setCertifications(certs =>
      certs.map(cert =>
        cert.id === id
          ? { ...cert, status: cert.status === 'Active' ? 'Inactive' : 'Active' }
          : cert
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      
      {/* Header */}
      <div className="border-b border-emerald-100 bg-white px-4 py-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Certifications Management</h1>
            <p className="mt-1 text-slate-500">Manage export certifications (PDF Page 6 Requirement)</p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-500">
            <Plus className="w-4 h-4 mr-2" />
            Add New Certification
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 py-8">
        {[
          { label: 'Total Certifications', value: '8', icon: Award, color: 'emerald' },
          { label: 'Active', value: '8', icon: CheckCircle, color: 'green' },
          { label: 'Expiring Soon', value: '2', icon: Shield, color: 'yellow' },
          { label: 'Downloadable', value: '8', icon: Download, color: 'blue' },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl bg-white border border-emerald-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
              <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Certifications Table */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-emerald-50 border-b border-emerald-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Certification</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Full Name</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Expiry Date</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50">
              {certifications.map((cert) => (
                <tr key={cert.id} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                        <Award className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="font-semibold text-slate-800">{cert.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{cert.fullName}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleStatusToggle(cert.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        cert.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {cert.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{cert.expiryDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownload(cert.name)}
                        className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors" title="Preview">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Upload Section */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border border-emerald-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-semibold text-slate-800">Upload New Certificate</h3>
              <p className="text-sm text-slate-500 mt-1">Upload PDF certificates for display on website</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-emerald-200">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500">
                Upload
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}