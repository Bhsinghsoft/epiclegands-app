# Laravel Product Sync Integration

This document provides guidance on syncing products from your existing Laravel system to the Epic Legends MongoDB database.

## Overview

The Epic Legends platform uses MongoDB to store products, orders, and customer data. If you're migrating from a Laravel-based system, you can sync your existing product data.

## Option 1: One-Time Migration (Recommended for Initial Setup)

### Step 1: Create an API Endpoint in Laravel

Create a new endpoint in your Laravel application that exports products in JSON format:

```php
// routes/api.php
Route::get('/products-export', function () {
    $products = \App\Models\Product::all();
    return response()->json($products);
});
```

### Step 2: Create a Migration Script in Next.js

Create a script to fetch and import products:

```bash
# In your Next.js project root
node scripts/sync-from-laravel.js
```

Example script (`scripts/sync-from-laravel.js`):

```javascript
const mongoose = require('mongoose');

const LARAVEL_API_URL = 'https://your-laravel-app.com/api/products-export';

async function syncProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Fetch products from Laravel
    const response = await fetch(LARAVEL_API_URL);
    const laravelProducts = await response.json();
    
    // Transform and save to MongoDB
    for (const product of laravelProducts) {
      await Product.updateOne(
        { externalId: product.id },
        {
          name: product.name,
          category: product.category,
          moq: product.moq_kg,
          hsCode: product.hs_code,
          price: product.price_range,
          // ... map other fields
          externalId: product.id,
          lastSyncedAt: new Date(),
        },
        { upsert: true }
      );
    }
    
    console.log('✓ Sync completed successfully');
  } catch (error) {
    console.error('✗ Sync failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

syncProducts();
```

## Option 2: Continuous Sync (For Ongoing Updates)

### Using a Cron Job

Set up a scheduled job in Vercel or your hosting provider to sync products periodically:

```typescript
// app/api/cron/sync-products/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Verify the request is from Vercel Cron
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Fetch from Laravel API
    const response = await fetch(`${process.env.LARAVEL_API_URL}/products-export`)
    const laravelProducts = await response.json()

    // Update MongoDB with latest data
    // (implement your sync logic here)

    return NextResponse.json({ success: true, synced: laravelProducts.length })
  } catch (error) {
    console.error('Sync failed:', error)
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
  }
}
```

### Vercel Cron Configuration

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/sync-products",
      "schedule": "0 2 * * *"
    }
  ]
}
```

## Data Mapping

Map Laravel fields to MongoDB schema:

| Laravel Field | MongoDB Field | Notes |
|---|---|---|
| `id` | `externalId` | For reference |
| `name` | `name` | Product name |
| `category` | `category` | Spices, Seeds, etc. |
| `moq_kg` | `moq` | Minimum order quantity |
| `hs_code` | `hsCode` | Harmonized System code |
| `price_range` | `price` | e.g., "$5-8/KG" |
| `description` | `description` | Product description |
| `container_load_mt` | `containerLoad` | e.g., "20 MT" |
| `private_label` | `privateLabel` | Boolean |

## Troubleshooting

### Connection Issues

- Verify `MONGODB_URI` and `LARAVEL_API_URL` are set in environment variables
- Check that Laravel API is accessible from your hosting environment
- Ensure proper CORS headers if accessing cross-domain

### Data Mismatches

- Validate field names match your Laravel schema
- Check for required fields in MongoDB schema
- Review transformed data before syncing large datasets

### Performance

- For large product catalogs (>10,000 items), use batch processing
- Consider implementing pagination in Laravel API export
- Monitor MongoDB connection limits

## After Sync

1. Verify product data in MongoDB Atlas or MongoDB Compass
2. Test product pages to ensure data displays correctly
3. Set up monitoring for sync errors
4. Keep Laravel and MongoDB in sync during transition period

## Support

For issues or questions, contact: support@epiclegends.com
