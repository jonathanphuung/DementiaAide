# Shopify Data Export Guide

This guide walks you through exporting your existing Shopify store data for migration to your new Next.js site.

## Prerequisites

Before running the export, you need to create a **Private App** in your Shopify store to get API access.

### Step 1: Create a Shopify Private App

1. **Go to your Shopify Admin Panel**
   - Navigate to `Apps` → `Develop apps` (or `Apps` → `Manage private apps` in older versions)

2. **Create a new private app**
   - Click "Create an app" or "Create a new private app"
   - Give it a name like "Data Migration App"

3. **Configure API Scopes** - Grant **READ** access to:
   - ✅ `read_products` - Export product catalog
   - ✅ `read_orders` - Export order history  
   - ✅ `read_customers` - Export customer data
   - ✅ `read_inventory` - Export inventory levels

4. **Get your credentials**
   - Copy the **Admin API access token** (starts with `shpat_`)
   - Note your **store URL** (format: `your-store.myshopify.com`)

### Step 2: Configure Environment Variables

Update your `.env.local` file with your Shopify credentials:

```env
SHOPIFY_STORE_URL=your-actual-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=shpat_your_actual_access_token_here
```

**⚠️ Security Note:** Never commit your `.env.local` file to version control!

## Running the Export

### Option 1: Quick Export (Recommended)
```bash
node scripts/run-migration.js
```

### Option 2: Direct Export
```bash
node scripts/shopify-export.js
```

## What Gets Exported

The script exports three main data types:

### 🛍️ Products
- Product details (title, description, handle, vendor, tags)
- Product images and SEO data
- All variants with pricing and inventory
- Categories and product types

### 📦 Orders  
- Order details and customer information
- Billing and shipping addresses
- Line items and pricing
- Order status and fulfillment info

### 👥 Customers
- Customer profiles and contact info
- Order history and spending data  
- Addresses and preferences
- Marketing opt-in status

## Export Files

Data is saved to the `migration/` folder with timestamps:

```
migration/
├── products-2026-01-30T10-30-00-000Z.json
├── orders-2026-01-30T10-30-00-000Z.json
├── customers-2026-01-30T10-30-00-000Z.json
└── export-summary-2026-01-30T10-30-00-000Z.json
```

## Troubleshooting

### Common Issues

**❌ "Domain not found" error**
- Check your `SHOPIFY_STORE_URL` format
- Should be: `your-store.myshopify.com` (not the custom domain)

**❌ "Access denied" error**  
- Verify your `SHOPIFY_ACCESS_TOKEN` is correct
- Ensure your private app has the required permissions
- Token should start with `shpat_`

**❌ "Rate limit exceeded"**
- The script includes automatic rate limiting
- Wait a few minutes and try again

**❌ Missing data**
- Check if your private app has read permissions
- Some fields may be empty if not used in your store

### Getting Help

If you encounter issues:
1. Check the Shopify Admin API documentation
2. Verify your private app permissions
3. Test your credentials with a simple API call

## Next Steps

After successful export:

1. ✅ **Review exported data** - Check the JSON files for completeness
2. 🔄 **Run import script** - Populate your new database  
3. 💳 **Configure payments** - Set up Stripe, PayPal, etc.
4. 🧪 **Test checkout** - Verify the full purchase flow

The export preserves all your product relationships, customer history, and order data for seamless migration to your new platform.

## Security Cleanup

After migration is complete:
- Delete or revoke the private app from Shopify Admin
- Remove Shopify credentials from `.env.local`
- Securely delete exported JSON files if they contain sensitive data

---

**Ready to export?** Run `node scripts/run-migration.js` when you've set up your Shopify credentials!