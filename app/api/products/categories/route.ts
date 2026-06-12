import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Product } from '@/lib/models';

// ✅ GET /api/products/categories - Get all unique categories
export async function GET() {
  try {
    await dbConnect();
    
    const categories = await Product.distinct('category');
    
    return NextResponse.json({
      success: true,
      data: ['All', ...categories.sort()]
    });
    
  } catch (error) {
    console.error('GET /api/products/categories error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}