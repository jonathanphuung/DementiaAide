#!/usr/bin/env node

/**
 * Shopify Migration Runner
 * 
 * This script exports data from your Shopify store for migration.
 * 
 * Prerequisites:
 * 1. Create a Private App in your Shopify Admin with these permissions:
 *    - Products: Read access
 *    - Orders: Read access  
 *    - Customers: Read access
 * 
 * 2. Copy .env.example to .env.local and set:
 *    SHOPIFY_STORE_URL=your-store.myshopify.com
 *    SHOPIFY_ACCESS_TOKEN=your_private_app_access_token
 * 
 * Usage: node scripts/run-migration.js
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { exportShopifyData } from './shopify-export.js';

console.log('🚀 Starting Shopify Migration...\n');

// Validate environment variables
if (!process.env.SHOPIFY_STORE_URL) {
  console.error('❌ SHOPIFY_STORE_URL is required in your .env.local file');
  process.exit(1);
}

if (!process.env.SHOPIFY_ACCESS_TOKEN) {
  console.error('❌ SHOPIFY_ACCESS_TOKEN is required in your .env.local file');
  console.log('\n📋 To get your access token:');
  console.log('1. Go to your Shopify Admin → Apps → Develop apps');
  console.log('2. Create a new private app');
  console.log('3. Grant read permissions for Products, Orders, and Customers');
  console.log('4. Copy the Admin API access token to your .env.local');
  process.exit(1);
}

try {
  const summary = await exportShopifyData();
  
  console.log('\n🎉 Migration export completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Review the exported data in the migration/ folder');
  console.log('2. Run the import script to populate your new database');
  console.log('3. Configure your payment processors');
  console.log('4. Test the checkout flow');
  
} catch (error) {
  console.error('💥 Migration failed:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('- Check your SHOPIFY_ACCESS_TOKEN is valid');
  console.log('- Ensure your private app has the required permissions');
  console.log('- Verify your store URL format (your-store.myshopify.com)');
  process.exit(1);
}