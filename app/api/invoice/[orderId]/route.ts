import { NextRequest, NextResponse } from 'next/server'

// Mock order data - in production, fetch from MongoDB
const MOCK_ORDERS: Record<
  string,
  {
    id: string
    customer: string
    product: string
    quantity: string
    unitPrice: string
    totalAmount: string
    orderDate: string
    deliveryDate?: string
    status: string
    address: string
    email: string
  }
> = {
  'ORD-C001': {
    id: 'ORD-C001',
    customer: 'Global Imports LLC',
    product: 'Turmeric Powder',
    quantity: '2000',
    unitPrice: '$5.00',
    totalAmount: '$10,000.00',
    orderDate: '2024-01-10',
    deliveryDate: '2024-01-25',
    status: 'Delivered',
    address: '123 Import Street, New York, NY 10001, USA',
    email: 'contact@globalimports.com',
  },
  'ORD-C002': {
    id: 'ORD-C002',
    customer: 'Global Imports LLC',
    product: 'Black Pepper',
    quantity: '1000',
    unitPrice: '$8.50',
    totalAmount: '$8,500.00',
    orderDate: '2024-01-05',
    deliveryDate: '2024-01-20',
    status: 'Delivered',
    address: '123 Import Street, New York, NY 10001, USA',
    email: 'contact@globalimports.com',
  },
}

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const orderId = params.orderId
  const order = MOCK_ORDERS[orderId]

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  // Create HTML invoice
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Invoice ${order.id}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          color: #333;
        }
        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          border-bottom: 2px solid #c41e3a;
          padding-bottom: 20px;
        }
        .company-info h1 {
          margin: 0;
          color: #c41e3a;
          font-size: 28px;
        }
        .invoice-info {
          text-align: right;
        }
        .invoice-info h2 {
          margin: 0;
          color: #666;
          font-size: 14px;
          font-weight: normal;
        }
        .invoice-info p {
          margin: 5px 0;
          font-weight: bold;
        }
        .addresses {
          display: flex;
          gap: 40px;
          margin-bottom: 40px;
        }
        .address-block {
          flex: 1;
        }
        .address-block h3 {
          margin-top: 0;
          color: #c41e3a;
          font-size: 12px;
          text-transform: uppercase;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }
        th {
          background-color: #f5f5f5;
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid #c41e3a;
          font-weight: bold;
          color: #333;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
        }
        .total-section {
          text-align: right;
          margin-bottom: 40px;
        }
        .total-row {
          display: flex;
          justify-content: flex-end;
          gap: 20px;
          margin-bottom: 8px;
          font-size: 14px;
        }
        .total-row.final {
          border-top: 2px solid #c41e3a;
          padding-top: 10px;
          font-weight: bold;
          font-size: 16px;
          color: #c41e3a;
        }
        .footer {
          text-align: center;
          color: #999;
          font-size: 12px;
          border-top: 1px solid #ddd;
          padding-top: 20px;
          margin-top: 40px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-info">
          <h1>Epic Legends</h1>
          <p>Premium Spices & Agricultural Exports</p>
        </div>
        <div class="invoice-info">
          <h2>Invoice</h2>
          <p>${order.id}</p>
          <p>${order.orderDate}</p>
        </div>
      </div>

      <div class="addresses">
        <div class="address-block">
          <h3>Bill To</h3>
          <p><strong>${order.customer}</strong></p>
          <p>${order.address}</p>
          <p>${order.email}</p>
        </div>
        <div class="address-block">
          <h3>Delivery Address</h3>
          <p><strong>${order.customer}</strong></p>
          <p>${order.address}</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity (KG)</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${order.product}</td>
            <td style="text-align: right;">${order.quantity}</td>
            <td style="text-align: right;">${order.unitPrice}</td>
            <td style="text-align: right;">${order.totalAmount}</td>
          </tr>
        </tbody>
      </table>

      <div class="total-section">
        <div class="total-row">
          <span>Subtotal:</span>
          <span>${order.totalAmount}</span>
        </div>
        <div class="total-row">
          <span>Shipping:</span>
          <span>Included</span>
        </div>
        <div class="total-row final">
          <span>Total Amount Due:</span>
          <span>${order.totalAmount}</span>
        </div>
      </div>

      <div class="footer">
        <p>Payment Terms: Net 30 | This is an electronically generated document</p>
        <p>Thank you for your business!</p>
      </div>
    </body>
    </html>
  `

  // Return HTML - user can print or save as PDF using browser
  return new NextResponse(htmlContent, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `attachment; filename="invoice-${order.id}.html"`,
    },
  })
}
