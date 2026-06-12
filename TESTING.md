# Epic Legends - Testing Guide

Complete testing strategy and procedures for Epic Legends B2B Export Platform.

## Testing Levels

### 1. Unit Tests

Test individual functions and components in isolation.

```bash
pnpm test
```

Example test file structure (`lib/__tests__/utils.test.ts`):

```typescript
import { formatCurrency, calculateDiscount } from '../utils'

describe('Utility Functions', () => {
  describe('formatCurrency', () => {
    it('should format USD currency correctly', () => {
      expect(formatCurrency(1000, 'USD')).toBe('$1,000.00')
    })

    it('should format AED currency correctly', () => {
      expect(formatCurrency(1000, 'AED')).toBe('AED 1,000.00')
    })
  })

  describe('calculateDiscount', () => {
    it('should calculate percentage discount correctly', () => {
      expect(calculateDiscount(100, 10)).toBe(90)
    })

    it('should handle zero discount', () => {
      expect(calculateDiscount(100, 0)).toBe(100)
    })
  })
})
```

### 2. Integration Tests

Test multiple components working together.

Example API integration test:

```typescript
// app/api/__tests__/auth.test.ts
import { POST } from '../auth/register/route'
import { NextRequest } from 'next/server'

describe('Auth API', () => {
  it('should register a new user', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'TestPassword123!',
        name: 'Test User',
      }),
    })

    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(201)
    expect(data.user.email).toBe('test@example.com')
  })

  it('should reject duplicate email', async () => {
    // First registration
    const req1 = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'duplicate@example.com',
        password: 'TestPassword123!',
        name: 'User 1',
      }),
    })
    await POST(req1)

    // Second registration with same email
    const req2 = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'duplicate@example.com',
        password: 'TestPassword123!',
        name: 'User 2',
      }),
    })

    const res = await POST(req2)
    expect(res.status).toBe(400)
  })
})
```

### 3. E2E Tests

Test complete user workflows from start to finish.

Using Playwright for browser automation:

```bash
pnpm add -D @playwright/test
```

Example E2E test (`e2e/auth.spec.ts`):

```typescript
import { test, expect } from '@playwright/test'

test.describe('User Authentication Flow', () => {
  test('should complete full registration and login flow', async ({ page }) => {
    // Navigate to registration
    await page.goto('http://localhost:3000/auth/register')

    // Fill registration form
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'testuser@example.com')
    await page.fill('input[name="password"]', 'TestPassword123!')
    await page.fill('input[name="confirmPassword"]', 'TestPassword123!')

    // Submit form
    await page.click('button[type="submit"]')

    // Verify success message or redirect
    await expect(page).toHaveURL('http://localhost:3000/auth/signin')

    // Now test login
    await page.fill('input[name="email"]', 'testuser@example.com')
    await page.fill('input[name="password"]', 'TestPassword123!')
    await page.click('button[type="submit"]')

    // Verify logged in
    await expect(page).toHaveURL('http://localhost:3000/dashboard')
    await expect(page.locator('text=Welcome')).toBeVisible()
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/signin')

    await page.fill('input[name="email"]', 'nonexistent@example.com')
    await page.fill('input[name="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')

    // Should show error message
    await expect(page.locator('text=Invalid credentials')).toBeVisible()
  })
})
```

## Manual Testing Checklist

### Homepage & Navigation

- [ ] Homepage loads with all sections visible
- [ ] Navigation menu works and responsive on mobile
- [ ] Footer displays correctly with all links
- [ ] Logo links back to homepage
- [ ] Search functionality works (if implemented)

### Product Pages

- [ ] Product listing page shows all products
- [ ] Filters work (category, price, MOQ)
- [ ] Sorting works (name, price, newest)
- [ ] Pagination works correctly
- [ ] Product detail page loads with full information
- [ ] Related products display correctly
- [ ] Images load and optimize properly

### Country-Specific Pages

For each of the 7 countries (USA, UAE, UK, India, Singapore, Australia, Canada):

- [ ] Country page loads with correct flag and name
- [ ] Pricing displays in correct currency
- [ ] Top products section shows relevant items
- [ ] Certifications and tax info correct
- [ ] "Browse Products" button redirects to products
- [ ] Market overview stats displayed correctly

### Authentication

- [ ] Registration form validates input
- [ ] Passwords require minimum complexity
- [ ] Email validation works
- [ ] Sign-in with valid credentials works
- [ ] Sign-in fails with invalid credentials shows error
- [ ] "Remember me" functionality works (if implemented)
- [ ] Forgot password flow works
- [ ] Password reset email sends
- [ ] Logout clears session

### Admin Dashboard

- [ ] Dashboard loads and shows stats
- [ ] All navigation tabs accessible
- [ ] Can view product list
- [ ] Can add new product
- [ ] Can edit existing product
- [ ] Can delete product
- [ ] Can view orders
- [ ] Can change order status
- [ ] Can view pricing by country
- [ ] Can update prices
- [ ] Can export reports

### Customer Dashboard

- [ ] Customer can see their profile info
- [ ] Order history displays correctly
- [ ] Can view order details
- [ ] Can download invoice PDF
- [ ] Invoice PDF opens in browser
- [ ] Invoice contains correct data
- [ ] Can place new order
- [ ] Reorder button works (if implemented)

### Mobile Responsive

- [ ] All pages render correctly on iPhone (375px)
- [ ] All pages render correctly on iPad (768px)
- [ ] Touch targets are at least 44x44px
- [ ] Navigation is accessible on mobile
- [ ] Tables are scrollable on small screens
- [ ] Images resize appropriately

### Database Operations

- [ ] New products save to MongoDB
- [ ] Products update correctly
- [ ] Orders save with correct data
- [ ] Customer data is secure
- [ ] Admin can't see other admin emails
- [ ] Customers can only see their orders

### SEO

- [ ] Homepage has correct title and description
- [ ] Meta tags visible in page source
- [ ] Robots.txt allows crawling
- [ ] Sitemap.xml exists and valid
- [ ] Product pages have unique titles
- [ ] Open Graph tags present
- [ ] Schema markup valid (test with Google Schema Validator)

### Security

- [ ] Passwords are hashed (never visible in DB)
- [ ] Sessions expire after inactivity
- [ ] Can't access admin pages without admin role
- [ ] Can't access other users' data
- [ ] API routes validate authentication
- [ ] No sensitive data in browser console
- [ ] CSRF protection working
- [ ] XSS protection in place

### Performance

- [ ] Homepage loads in <3 seconds
- [ ] Product pages load in <2 seconds
- [ ] Images lazy load correctly
- [ ] No console errors
- [ ] No console warnings
- [ ] Lighthouse score >80

## Test Data

### Sample Users

```javascript
// Admin User
{
  email: "admin@epiclegends.com",
  password: "AdminPass123!",
  role: "admin"
}

// Customer User
{
  email: "customer@example.com",
  password: "CustomerPass123!",
  role: "customer",
  company: "Test Company"
}
```

### Sample Products

```javascript
{
  name: "Turmeric Powder",
  category: "Spices",
  moq: "1000 KG",
  hsCode: "0907.10",
  price: "$5-8/KG",
  containerLoad: "20 MT",
  privateLabel: true,
  certifications: ["Organic", "Fair Trade"]
}
```

## Continuous Integration

### GitHub Actions Workflow

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:6.0
        options: >-
          --health-cmd mongosh
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 27017:27017

    steps:
      - uses: actions/checkout@v3
      
      - uses: pnpm/action-setup@v2
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - run: pnpm install
      
      - run: pnpm lint
      
      - run: pnpm type-check
      
      - run: pnpm test
        env:
          MONGODB_URI: mongodb://localhost:27017/epic_legends_test
      
      - run: pnpm build
```

## Before Going to Production

### Pre-Production Checklist

- [ ] All tests passing
- [ ] TypeScript no errors
- [ ] No console errors or warnings
- [ ] All routes tested manually
- [ ] Database backups configured
- [ ] Error logging setup (Sentry optional)
- [ ] Monitoring alerts configured
- [ ] HTTPS enabled
- [ ] Environment variables set correctly
- [ ] Performance metrics acceptable

### Performance Benchmarks

```
Target Metrics:
- Homepage: < 2.5s LCP
- Product Page: < 2s LCP
- Admin Dashboard: < 3s LCP
- Database Query: < 100ms average
- API Response: < 200ms average
```

## Support

For issues or questions:
- Check application logs
- Review database for data integrity
- Test with different browsers
- Check responsive design on multiple devices

---

**Created**: January 2024
**Last Updated**: January 2024
