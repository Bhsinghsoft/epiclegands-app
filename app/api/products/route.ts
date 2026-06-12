import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Product } from '@/lib/models';

// ✅ GET /api/products - Get all products (with optional filters)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    
    // Build query filters
    const query: any = {};
    if (category && category !== 'All') query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { hsCode: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(query)
    ]);
    
    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('GET /api/products error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// ✅ POST /api/products - Create new product
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.priceMin || !body.priceMax) {
      return NextResponse.json(
        { success: false, error: 'Name and price are required' },
        { status: 400 }
      );
    }
    
    // ✅ SAFETY: Convert stock to string if it's a number
    let stockValue = body.stock || '';
    if (typeof stockValue === 'number') {
      stockValue = stockValue.toString();
    }
    
    const product = await Product.create({
      name: body.name,
      category: body.category || 'Spices',
      origin: body.origin || '',
      hsCode: body.hsCode || '',
      moq: body.moq || '',
      containerLoad: body.containerLoad || '',
      price: `${body.priceMin}-${body.priceMax}/kg`,
      priceMin: body.priceMin,
      priceMax: body.priceMax,
      currency: body.currency || 'USD',
      privateLabel: body.privateLabel || false,
      description: body.description || '',
      fullDescription: body.fullDescription || '',
      stock: stockValue,  // ✅ Safe string value
      qualityGrade: body.qualityGrade || '',
      leadTime: body.leadTime || '15-20 days',
      certifications: body.certifications || [],
      specifications: body.specifications || [],
      packaging: body.packaging || [],
      shippingPorts: body.shippingPorts || [],
      image: body.image || '',
      status: 'Active'
    });
    
    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully'
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('POST /api/products error:', error);
    
    // ✅ Better error message
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: errors.join(', ') },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}