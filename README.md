# Epic Legends - Global Spice & Agricultural Export Platform

A complete B2B export management platform for spice and agricultural product exporters. Built with Next.js 16, MongoDB, NextAuth, and Tailwind CSS.

## Features

### Core Features
- **Multi-Country Support** - Dedicated landing pages for 7 major markets (USA, UAE, UK, India, Singapore, Australia, Canada)
- **Dynamic Pricing** - Country-specific pricing with automatic currency conversion
- **Product Management** - Full catalog with export specifications (MOQ, HS codes, container loads, private label options)
- **Order Management** - Complete order lifecycle from inquiry to delivery
- **Customer Accounts** - User dashboards with order history and invoice downloads
- **Admin Dashboard** - Comprehensive management for products, orders, pricing, and reports

### B2B Export Features
- Minimum Order Quantities (MOQ) per product
- Harmonized System (HS) codes for customs compliance
- Container load specifications for shipping
- Private label manufacturing capabilities
- Multi-currency pricing by country
- Bulk order support with custom quotes

### Admin Features
- Product CRUD operations
- Order status tracking (Pending → Processing → Shipped → Delivered)
- Dynamic pricing by country and product
- Sales reports and analytics
- Bulk operations for price updates
- CSV import/export capabilities

### Customer Features
- Browse products by category and filters
- View country-specific pricing and shipping options
- Order history with status tracking
- Download invoices as PDFs
- Reorder functionality for frequent customers
- Account management and preferences

## Tech Stack

```
Frontend: Next.js 16 + React 19 + TypeScript
Styling: Tailwind CSS v4 + shadcn/ui components
Database: MongoDB + Mongoose ORM
Authentication: NextAuth.js v5 with email/password & Google OAuth
Export: PDFKit for invoice generation
Charts: Recharts for analytics
Validation: Zod for schema validation
```

## Project Structure

```
epic-legends/
├── app/
│   ├── (public)/              # Public pages
│   │   ├── [country]/         # Country-specific landing pages
│   │   └── page.tsx           # Global homepage
│   ├── products/              # Product catalog
│   ├── admin/                 # Admin dashboard
│   │   ├── products/
│   │   ├── orders/
│   │   └── pricing/
│   ├── customer/              # Customer dashboard
│   ├── auth/                  # Authentication pages
│   ├── api/                   # API routes
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                    # shadcn/ui components
│   └── json-ld.tsx           # SEO structured data
├── lib/
│   ├── db.ts                 # MongoDB connection
│   ├── models.ts             # Mongoose schemas
│   ├── utils.ts              # Utility functions
│   └── utils.ts
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── auth.ts                    # NextAuth configuration
├── .env.example              # Environment variables template
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+ with pnpm
- MongoDB Atlas account (or local MongoDB)
- Google OAuth credentials (optional, for social login)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd epic-legends
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your values:
# - MONGODB_URI: Your MongoDB connection string
# - NEXTAUTH_URL: Your app URL (http://localhost:3000 for development)
# - NEXTAUTH_SECRET: Generate with: openssl rand -base64 32
# - GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET: From Google Cloud Console
```

4. Run the development server
```bash
pnpm dev
```

Visit http://localhost:3000

## Environment Variables

Required for production:

```
# MongoDB
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/epic_legends

# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<generated-secret>

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-secret

# Email Service (Optional)
RESEND_API_KEY=your-api-key
```

## Database Schema

### Collections

**Users**
```javascript
{
  email: String,
  password: String (hashed),
  name: String,
  role: 'customer' | 'admin' | 'exporter',
  country: String,
  company: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Products**
```javascript
{
  name: String,
  category: String,
  description: String,
  moq: String,        // Minimum Order Quantity
  hsCode: String,     // Harmonized System Code
  price: String,      // Price range
  containerLoad: String,
  privateLabel: Boolean,
  certifications: [String],
  origin: String,
  specifications: [{ label, value }],
  createdAt: Date,
  updatedAt: Date
}
```

**Orders**
```javascript
{
  orderId: String,
  customerId: ObjectId,
  products: [{ productId, quantity, price }],
  status: 'pending' | 'processing' | 'shipped' | 'delivered',
  shippingAddress: String,
  totalAmount: Number,
  currency: String,
  paymentStatus: String,
  createdAt: Date,
  updatedAt: Date
}
```

**CountryPricing**
```javascript
{
  country: String,
  currency: String,
  productId: ObjectId,
  price: Number,
  adjustment: String,  // e.g., "+15%" or "-20%"
  lastUpdated: Date
}
```

## Key Routes

### Public Routes
- `/` - Homepage
- `/products` - Product catalog
- `/products/[id]` - Product detail page
- `/[country]` - Country-specific landing page
- `/auth/signin` - Sign in page
- `/auth/register` - Registration page

### Protected Routes (Authentication Required)
- `/dashboard` - User dashboard
- `/customer` - Customer account & orders
- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/pricing` - Pricing management
- `/admin/reports` - Sales reports

### API Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth endpoints
- `GET /api/invoice/[orderId]` - Generate invoice

## Authentication

The app uses NextAuth.js v5 with email/password authentication. Sessions are stored securely with encrypted JWT tokens.

### Creating Admin Users

```typescript
// During registration, set role to 'admin'
const user = await User.create({
  email: 'admin@epiclegends.com',
  password: hashedPassword,
  role: 'admin',
  // ... other fields
})
```

## Laravel Product Sync

To migrate products from an existing Laravel application:

```bash
# See LARAVEL_SYNC.md for detailed instructions
node scripts/sync-from-laravel.js
```

Or set up continuous sync with Vercel Cron Jobs (see LARAVEL_SYNC.md).

## SEO Features

- Dynamic meta tags for all pages
- XML sitemap (`/sitemap.xml`)
- Robots.txt for search crawlers
- JSON-LD structured data (Organization, Product, Collection schemas)
- Open Graph tags for social sharing
- Mobile-friendly responsive design

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel project settings
4. Deploy

```bash
vercel env add MONGODB_URI
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
vercel deploy
```

### Deploy to Other Platforms

Ensure your host supports:
- Node.js 18+
- Dynamic route handling
- Environment variable configuration
- MongoDB connectivity

## Development

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- Component-driven architecture

### Adding New Features

1. Create components in `components/`
2. Add API routes in `app/api/`
3. Update database models in `lib/models.ts`
4. Add pages in appropriate route folders
5. Test in development with `pnpm dev`

### Database Queries

Always scope queries by user ID:
```typescript
// Good - secure
const orders = await Order.find({ customerId: userId })

// Bad - exposes all data
const orders = await Order.find()
```

## Support & Documentation

- **Installation Issues**: Check `.env.example` and ensure MongoDB is accessible
- **Authentication Problems**: Verify NEXTAUTH_SECRET is set and unique
- **Database Errors**: Check MongoDB connection string and network access
- **Email Issues**: Configure email service (Resend, SendGrid, etc.)

For detailed documentation:
- See `LARAVEL_SYNC.md` for product migration
- Check `lib/models.ts` for database schema
- Review `auth.ts` for authentication config

## License

Proprietary - Epic Legends B2B Export Platform

## Version

Current Version: 1.0.0
Built with: Next.js 16, MongoDB, NextAuth v5

---

**Last Updated**: January 2024
**Maintained by**: Epic Legends Development Team
