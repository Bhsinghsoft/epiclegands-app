import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Product } from '@/lib/models';

// ✅ POST /api/products/bulk - Bulk operations (delete, update status)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { action, productIds, data } = await request.json();
    
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Product IDs are required' },
        { status: 400 }
      );
    }
    
    let result;
    
    switch (action) {
      case 'delete':
        result = await Product.deleteMany({ _id: { $in: productIds } });
        return NextResponse.json({
          success: true,
          message: `${result.deletedCount} products deleted`,
          deletedCount: result.deletedCount
        });
        
      case 'updateStatus':
        if (!data?.status) {
          return NextResponse.json(
            { success: false, error: 'Status is required' },
            { status: 400 }
          );
        }
        result = await Product.updateMany(
          { _id: { $in: productIds } },
          { status: data.status }
        );
        return NextResponse.json({
          success: true,
          message: `${result.modifiedCount} products updated`,
          modifiedCount: result.modifiedCount
        });
        
      case 'updatePricing':
        if (!data?.percentage) {
          return NextResponse.json(
            { success: false, error: 'Percentage is required' },
            { status: 400 }
          );
        }
        // Bulk price update logic
        const products = await Product.find({ _id: { $in: productIds } });
        for (const product of products) {
          const minPrice = parseFloat(product.priceMin) * (1 + data.percentage / 100);
          const maxPrice = parseFloat(product.priceMax) * (1 + data.percentage / 100);
          await Product.findByIdAndUpdate(product._id, {
            priceMin: minPrice.toFixed(2),
            priceMax: maxPrice.toFixed(2),
            price: `${minPrice.toFixed(2)}-${maxPrice.toFixed(2)}/kg`
          });
        }
        return NextResponse.json({
          success: true,
          message: `${products.length} products pricing updated`,
          updatedCount: products.length
        });
        
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('POST /api/products/bulk error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to perform bulk operation' },
      { status: 500 }
    );
  }
}