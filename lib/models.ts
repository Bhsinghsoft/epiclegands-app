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

// Product Schema
const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    sku: { type: String, unique: true },
    hsCode: String,
    moq: Number,
    containerLoad: String,
    packaging: String,
    image: String,
    images: [String],
    category: String,
    supportsPrivateLabel: Boolean,
    specifications: {
      origin: String,
      color: String,
      size: String,
      certifications: [String],
    },
    pricing: [
      {
        countryId: mongoose.Schema.Types.ObjectId,
        countryCode: String,
        price: Number,
        currency: String,
      },
    ],
    stock: Number,
    active: { type: Boolean, default: true },
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

// Export models
export const User = mongoose.models.User || mongoose.model('User', userSchema)
export const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)
export const Country =
  mongoose.models.Country || mongoose.model('Country', countrySchema)
export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)
export const Certification =
  mongoose.models.Certification ||
  mongoose.model('Certification', certificationSchema)
export const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model('Testimonial', testimonialSchema)
