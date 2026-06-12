'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, Save, X, Plus, Trash2, Upload, 
  Eye, Check, AlertCircle, Loader2,Award
} from 'lucide-react';

const CERTIFICATION_OPTIONS = [
  'FDA Approved', 'ISO 9001:2015', 'HACCP', 'Organic Certified', 
  'Halal Certified', 'EU Approved', 'FSSAI', 'APEDA'
];

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Spices',
    origin: '',
    hsCode: '',
    moq: '',
    containerLoad: '',
    priceMin: '',
    priceMax: '',
    currency: 'USD',
    privateLabel: false,
    description: '',
    fullDescription: '',
    stock: '',
    certifications: [] as string[],
    packaging: [''],
    specifications: [{ label: '', value: '' }],
    shippingPorts: ['Mundra', 'Nhava Sheva'],
    leadTime: '15-20 days',
    qualityGrade: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleCertification = (cert: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter(c => c !== cert)
        : [...prev.certifications, cert]
    }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { label: '', value: '' }]
    }));
  };

  const removeSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }));
  };

  const updateSpecification = (index: number, field: 'label' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) => 
        i === index ? { ...spec, [field]: value } : spec
      )
    }));
  };

  const addPackaging = () => {
    setFormData(prev => ({
      ...prev,
      packaging: [...prev.packaging, '']
    }));
  };

  const updatePackaging = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      packaging: prev.packaging.map((p, i) => i === index ? value : p)
    }));
  };

  const removePackaging = (index: number) => {
    setFormData(prev => ({
      ...prev,
      packaging: prev.packaging.filter((_, i) => i !== index)
    }));
  };

  const addShippingPort = () => {
    setFormData(prev => ({
      ...prev,
      shippingPorts: [...prev.shippingPorts, '']
    }));
  };

  const updateShippingPort = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      shippingPorts: prev.shippingPorts.map((p, i) => i === index ? value : p)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.priceMin || !formData.priceMax) {
      alert('Please fill all required fields');
      return;
    }
    
    if (!imageFile && !imagePreview) {
      alert('Please upload a product image');
      return;
    }
    
    setLoading(true);
    
    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        origin: formData.origin,
        hsCode: formData.hsCode,
        moq: formData.moq,
        containerLoad: formData.containerLoad,
        priceMin: formData.priceMin,
        priceMax: formData.priceMax,
        currency: formData.currency,
        price: `${formData.priceMin}-${formData.priceMax}/kg`,
        privateLabel: formData.privateLabel,
        description: formData.description,
        fullDescription: formData.fullDescription,
        stock: formData.stock,
        certifications: formData.certifications,
        specifications: formData.specifications.filter(s => s.label && s.value),
        packaging: formData.packaging.filter(p => p.trim() !== ''),
        shippingPorts: formData.shippingPorts,
        leadTime: formData.leadTime,
        qualityGrade: formData.qualityGrade,
        image: imagePreview,
        status: 'Active'
      };
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        router.push('/admin/products');
      } else {
        alert(data.error || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="border-b border-emerald-100 bg-white px-4 py-6 sticky top-0 z-10">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Add New Product</h1>
            <p className="mt-1 text-slate-500">Create a new export product listing with complete specifications</p>
          </div>
          <Link href="/admin/products">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 py-8">
        <div className="space-y-8">
          
          {/* ===== SECTION 1: BASIC INFO & IMAGE ===== */}
          <div className="bg-white rounded-2xl border border-emerald-100 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-500" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
                    placeholder="e.g., Turmeric Powder"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
                  >
                    <option value="Spices">Spices</option>
                    <option value="Seeds">Seeds</option>
                    <option value="Powder">Powder</option>
                    <option value="Whole">Whole</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Origin</label>
                  <input
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
                    placeholder="e.g., Sangli, India"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">HS Code</label>
                  <input
                    type="text"
                    name="hsCode"
                    value={formData.hsCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
                    placeholder="e.g., 0910.30.30"
                  />
                </div>
              </div>
              
              {/* Right Column - Image Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Product Image <span className="text-red-500">*</span>
                </label>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative border-2 border-dashed border-emerald-300 rounded-2xl p-8 text-center cursor-pointer hover:border-emerald-500 transition-all bg-emerald-50/30"
                >
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Product preview" 
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview(null);
                          setImageFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                      <p className="text-slate-600">Click to upload product image</p>
                      <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ===== SECTION 2: PRICING & EXPORT DETAILS ===== */}
          <div className="bg-white rounded-2xl border border-emerald-100 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-500" />
              Pricing & Export Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Min Price (USD) *</label>
                <input
                  type="text"
                  name="priceMin"
                  value={formData.priceMin}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
                  placeholder="e.g., 5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Max Price (USD) *</label>
                <input
                  type="text"
                  name="priceMax"
                  value={formData.priceMax}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
                  placeholder="e.g., 8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">MOQ</label>
                <input
                  type="text"
                  name="moq"
                  value={formData.moq}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
                  placeholder="e.g., 1,000 KG"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Container Load</label>
                <input
                  type="text"
                  name="containerLoad"
                  value={formData.containerLoad}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
                  placeholder="e.g., 20' FCL - 19MT"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Lead Time</label>
                <select
                  name="leadTime"
                  value={formData.leadTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
                >
                  <option>7-10 days</option>
                  <option>10-14 days</option>
                  <option>15-20 days</option>
                  <option>21-28 days</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-3">
              <input
                type="checkbox"
                name="privateLabel"
                checked={formData.privateLabel}
                onChange={handleChange}
                className="w-5 h-5 rounded border-emerald-300"
              />
              <label className="text-sm font-medium text-slate-700">Private Label Available</label>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Quality Grade</label>
              <input
                type="text"
                name="qualityGrade"
                value={formData.qualityGrade}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
                placeholder="e.g., Singapore/Europe Grade - 99% purity"
              />
            </div>
          </div>

          {/* ===== SECTION 3: CERTIFICATIONS ===== */}
          <div className="bg-white rounded-2xl border border-emerald-100 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500" />
              Certifications
            </h2>
            <div className="flex flex-wrap gap-3">
              {CERTIFICATION_OPTIONS.map((cert) => (
                <button
                  key={cert}
                  type="button"
                  onClick={() => toggleCertification(cert)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.certifications.includes(cert)
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-emerald-100'
                  }`}
                >
                  {cert}
                </button>
              ))}
            </div>
            {formData.certifications.length > 0 && (
              <div className="mt-4 text-sm text-emerald-600">
                Selected: {formData.certifications.join(', ')}
              </div>
            )}
          </div>

          {/* ===== SECTION 4: SPECIFICATIONS ===== */}
          <div className="bg-white rounded-2xl border border-emerald-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-emerald-500" />
                Technical Specifications
              </h2>
              <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
                <Plus className="w-4 h-4 mr-1" /> Add Specification
              </Button>
            </div>
            
            {formData.specifications.map((spec, index) => (
              <div key={index} className="flex gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Label (e.g., Curcumin Content)"
                  value={spec.label}
                  onChange={(e) => updateSpecification(index, 'label', e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Value (e.g., ≥7%)"
                  value={spec.value}
                  onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
                />
                <Button type="button" variant="ghost" size="sm" onClick={() => removeSpecification(index)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          {/* ===== SECTION 5: PACKAGING & SHIPPING ===== */}
          <div className="bg-white rounded-2xl border border-emerald-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Packaging Options */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-slate-800">Packaging Options</h2>
                  <Button type="button" variant="outline" size="sm" onClick={addPackaging}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
                {formData.packaging.map((pack, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="e.g., 25 kg PP bags"
                      value={pack}
                      onChange={(e) => updatePackaging(index, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
                    />
                    {formData.packaging.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removePackaging(index)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Shipping Ports */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-slate-800">Shipping Ports</h2>
                  <Button type="button" variant="outline" size="sm" onClick={addShippingPort}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
                {formData.shippingPorts.map((port, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder="e.g., Mundra Port"
                    value={port}
                    onChange={(e) => updateShippingPort(index, e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none mb-2"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ===== SECTION 6: DESCRIPTIONS ===== */}
          <div className="bg-white rounded-2xl border border-emerald-100 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Product Descriptions</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
                  placeholder="Brief description for product listing"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Description</label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
                  placeholder="Detailed description for product detail page"
                />
              </div>
            </div>
          </div>

          {/* ===== SECTION 7: INVENTORY ===== */}
          <div className="bg-white rounded-2xl border border-emerald-100 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Inventory</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Stock Quantity</label>
              <input
                type="text"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full md:w-1/2 px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:outline-none"
                placeholder="e.g., 15,000 KG"
              />
            </div>
          </div>

          {/* ===== SUBMIT BUTTONS ===== */}
          <div className="flex gap-4 justify-end sticky bottom-4 bg-white/95 backdrop-blur p-4 rounded-2xl border border-emerald-100">
            <Link href="/admin/products">
              <Button type="button" variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={loading} className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8">
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {loading ? 'Saving Product...' : 'Save Product'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}