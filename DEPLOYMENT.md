# Epic Legends - Deployment Guide

Complete guide to deploying Epic Legends to production on Vercel.

## Pre-Deployment Checklist

### Environment Configuration
- [ ] MongoDB Atlas cluster created and accessible
- [ ] MONGODB_URI environment variable set
- [ ] NEXTAUTH_SECRET generated (`openssl rand -base64 32`)
- [ ] NEXTAUTH_URL set to your production domain
- [ ] All environment variables in `.env.local` are correct

### Code Quality
- [ ] No console.log statements left in production code
- [ ] TypeScript compiles without errors (`pnpm tsc`)
- [ ] All imports are correct and files exist
- [ ] ESLint passes (`pnpm lint`)
- [ ] No hardcoded API keys or secrets in code

### Testing
- [ ] Homepage loads correctly
- [ ] Products page displays all items
- [ ] Country pages show correct pricing
- [ ] User registration and login work
- [ ] Admin dashboard accessible with admin account
- [ ] Customer dashboard shows orders
- [ ] Invoice PDF generation works
- [ ] Mobile responsive design verified

### Database
- [ ] MongoDB collections created and indexed
- [ ] Sample data loaded (products, categories)
- [ ] User roles defined (admin, customer, exporter)
- [ ] Backup strategy in place

## Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

#### 1. Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Epic Legends B2B Export Platform"
git branch -M main
git remote add origin https://github.com/your-username/epic-legends.git
git push -u origin main
```

#### 2. Connect to Vercel

1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Choose your GitHub repository
4. Click "Import"

#### 3. Configure Environment Variables

In Vercel dashboard:

```
Environment Variables → Add

MONGODB_URI = mongodb+srv://user:password@cluster.mongodb.net/epic_legends
NEXTAUTH_URL = https://your-domain.com
NEXTAUTH_SECRET = <your-generated-secret>
GOOGLE_CLIENT_ID = (optional)
GOOGLE_CLIENT_SECRET = (optional)
```

#### 4. Deploy

1. Click "Deploy"
2. Wait for build to complete (usually 2-3 minutes)
3. Visit your production URL

### Option 2: Deploy to Self-Hosted Server

#### 1. Install Dependencies

```bash
ssh your-server
cd /var/www/epic-legends
git clone https://github.com/your-repo.git .
pnpm install
```

#### 2. Build Application

```bash
pnpm build
```

#### 3. Set Environment Variables

```bash
cat > .env.production << EOF
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/epic_legends
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=<your-secret>
EOF
```

#### 4. Start Application

Using PM2:
```bash
pnpm install -g pm2
pm2 start npm --name "epic-legends" -- start
pm2 startup
pm2 save
```

Using Docker:
```bash
docker build -t epic-legends .
docker run -p 3000:3000 --env-file .env.production epic-legends
```

#### 5. Configure Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 6. SSL Certificate (Let's Encrypt)

```bash
certbot certonly --nginx -d your-domain.com
```

## Post-Deployment

### 1. Verify Production

- [ ] Homepage loads
- [ ] Products display correctly
- [ ] Authentication works
- [ ] Admin dashboard accessible
- [ ] Invoices generate properly
- [ ] No errors in logs

### 2. Database Setup

```bash
# Connect to MongoDB Atlas
# Create initial admin user:

db.users.insertOne({
  email: "admin@epiclegends.com",
  password: "$2b$10$...", // bcrypt hashed password
  role: "admin",
  company: "Epic Legends",
  createdAt: new Date(),
  updatedAt: new Date()
})

# Create indexes for better performance
db.products.createIndex({ category: 1 })
db.products.createIndex({ hsCode: 1 })
db.orders.createIndex({ customerId: 1 })
db.orders.createIndex({ status: 1 })
```

### 3. Monitor Application

#### Vercel Analytics
- Monitor build times and deployments
- Track function performance
- Review logs for errors

#### Database Monitoring
- Set up MongoDB Atlas alerts
- Monitor connection count
- Track storage usage

#### Application Monitoring
- Set up error tracking (Sentry optional)
- Monitor API response times
- Track user engagement

### 4. Backup Strategy

#### MongoDB Backups

Vercel/Atlas automatic backups:
- Enabled by default on MongoDB Atlas M10+
- Daily backups with 30-day retention
- Point-in-time recovery available

Manual backups:
```bash
mongodump --uri="mongodb+srv://user:password@cluster.mongodb.net/epic_legends" --out=backups/$(date +%Y-%m-%d)
```

#### Code Backups
- GitHub repository serves as code backup
- Enable branch protection
- Tag releases

## Performance Optimization

### 1. Image Optimization

Products images should be optimized:
- Use Next.js Image component
- Lazy load images
- Compress images before upload

### 2. Database Optimization

```javascript
// Add indexes in MongoDB
db.products.createIndex({ name: "text" })
db.orders.createIndex({ customerId: 1, createdAt: -1 })
db.users.createIndex({ email: 1 }, { unique: true })
```

### 3. Caching Strategy

- Enable ISR (Incremental Static Regeneration) for product pages
- Cache country pages with 24-hour revalidation
- Cache sitemaps and robots.txt

```typescript
// In page.tsx
export const revalidate = 86400 // 24 hours
```

### 4. CDN Configuration

If using Vercel, CDN is automatic. For custom deployments:
- Use Cloudflare for DNS and CDN
- Configure caching rules
- Enable compression

## Troubleshooting

### Build Fails

1. Check Node.js version: `node --version` (should be 18+)
2. Clear cache: `pnpm install && pnpm build`
3. Check for TypeScript errors: `pnpm tsc --noEmit`
4. Review build logs for specific errors

### MongoDB Connection Issues

```javascript
// Test connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected'))
  .catch(err => console.log('Error:', err.message));
```

### Authentication Not Working

1. Verify NEXTAUTH_SECRET is set
2. Check NEXTAUTH_URL matches your domain
3. Verify database has users collection
4. Check browser cookies for NextAuth session

### Performance Issues

1. Check Vercel Analytics for slow functions
2. Review MongoDB slow query logs
3. Optimize database queries
4. Consider upgrading MongoDB tier

### Memory Issues

```bash
# Monitor memory usage
pnpm dlx cross-env NODE_OPTIONS=--max-old-space-size=2048 npm run build
```

## Maintenance

### Regular Tasks

Daily:
- Monitor error logs
- Check server health
- Verify backups completed

Weekly:
- Review performance metrics
- Check for security updates
- Update dependencies if needed

Monthly:
- Review analytics
- Test disaster recovery
- Update documentation

### Dependency Updates

```bash
# Check for outdated packages
pnpm outdated

# Update dependencies
pnpm update

# Update Next.js
pnpm up next@latest react@latest react-dom@latest
```

## Support & Help

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **MongoDB Atlas Help**: https://docs.atlas.mongodb.com
- **NextAuth.js Guide**: https://next-auth.js.org

## Rollback Plan

If deployment goes wrong:

1. **Revert to Previous Version**
```bash
git revert HEAD
git push origin main
```

2. **Redeploy from Vercel Dashboard**
- Click deployments
- Select previous successful deployment
- Click "Redeploy"

3. **Database Rollback**
- Use MongoDB point-in-time recovery
- Contact support if needed

---

**Created**: January 2024
**Last Updated**: January 2024
