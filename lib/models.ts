import mongoose from 'mongoose'

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, sparse: true },
    password: String,
    image: String,
    role: {
      type: String,
      enum: ['user', 'admin', 'exporter'],
      default: 'user',
    },
    emailVerified: Date,
    accounts: [
      {
        provider: String,
        providerAccountId: String,
        type: String,
        refresh_token: String,
        access_token: String,
        expires_at: Number,
        token_type: String,
        scope: String,
      },
    ],
  },
  { timestamps: true }
)

// ✅ Product Schema - UPDATED with all fields from admin panel
const productSchema = new mongoose.Schema(
  {
    // Basic Info
    name: { type: String, required: true },
    category: { type: String, default: 'Spices' },
    origin: { type: String },
    hsCode: { type: String },
    
    // Export Details
    moq: { type: String },  // Changed from Number to String (e.g., "1,000 KG")
    containerLoad: { type: String },
    
    // Pricing
    price: { type: String },  // Formatted price string (e.g., "$5-8/kg")
    priceMin: { type: String },
    priceMax: { type: String },
    currency: { type: String, default: 'USD' },
    
    // Pricing by country (existing)
    pricing: [
      {
        countryId: mongoose.Schema.Types.ObjectId,
        countryCode: String,
        price: Number,
        currency: String,
      },
    ],
    
    // Features
    privateLabel: { type: Boolean, default: false },  // renamed from supportsPrivateLabel
    supportsPrivateLabel: { type: Boolean, default: false }, // keep for backward compatibility
    
    // Descriptions
    description: { type: String },  // Short description
    fullDescription: { type: String },  // Long description for detail page
    
    // Inventory
    stock: { type: String },  // Changed from Number to String (e.g., "15,000 KG")
    
    // Quality & Shipping
    qualityGrade: { type: String },
    leadTime: { type: String, default: '15-20 days' },
    
    // Certifications (array of strings)
    certifications: [{ type: String }],
    
    // Specifications (array of {label, value})
    specifications: [
      {
        label: { type: String },
        value: { type: String }
      }
    ],
    
    // Packaging options (array of strings)
    packaging: [{ type: String }],
    
    // Shipping ports (array of strings)
    shippingPorts: [{ type: String }],
    
    // Images
    image: { type: String },
    images: [{ type: String }],
    
    // Status
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    active: { type: Boolean, default: true }, // keep for backward compatibility
    
    // Rating
    rating: { type: Number, default: 0 },
    
    // Legacy fields (for backward compatibility)
    sku: { type: String, unique: true, sparse: true },
    specifications_legacy: {
      origin: String,
      color: String,
      size: String,
      certifications: [String],
    },
    
    // Created by
    createdBy: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
)

// Country Schema
const countrySchema = new mongoose.Schema(
  {
    name: String,
    code: { type: String, unique: true },
    flag: String,
    locale: String,
    currency: String,
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

// Order Schema
const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true },
    userId: mongoose.Schema.Types.ObjectId,
    items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
        price: Number,
        countryId: mongoose.Schema.Types.ObjectId,
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    totalAmount: Number,
    currency: String,
    shippingAddress: {
      country: String,
      city: String,
      address: String,
      zipCode: String,
    },
    notes: String,
    invoicePDF: String,
    packingListPDF: String,
  },
  { timestamps: true }
)

// Certification Schema
const certificationSchema = new mongoose.Schema(
  {
    name: String,
    icon: String,
    description: String,
    products: [mongoose.Schema.Types.ObjectId],
  },
  { timestamps: true }
)

// Testimonial Schema
const testimonialSchema = new mongoose.Schema(
  {
    name: String,
    company: String,
    image: String,
    message: String,
    rating: Number,
    country: String,
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// ✅ Export models
export const User = mongoose.models.User || mongoose.model('User', userSchema)
export const Product = mongoose.models.Product || mongoose.model('Product', productSchema)
export const Country = mongoose.models.Country || mongoose.model('Country', countrySchema)
export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)
export const Certification = mongoose.models.Certification || mongoose.model('Certification', certificationSchema)
export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema)