// Database Import Script
// Imports processed JSON data into Prisma database

import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const PROCESSED_PATH = './migration/processed';

// Helper function to read JSON file
function readJSON(filename) {
  const filePath = path.join(PROCESSED_PATH, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Import Products
async function importProducts() {
  console.log('📦 Importing products to database...');
  
  const products = readJSON('products.json');
  let imported = 0;
  let skipped = 0;
  
  for (const product of products) {
    try {
      // Check if product already exists
      const existing = await prisma.product.findUnique({
        where: { handle: product.handle }
      });
      
      if (existing) {
        console.log(`⚠️  Product already exists: ${product.title}`);
        skipped++;
        continue;
      }
      
      // Create product with variants and images
      await prisma.product.create({
        data: {
          title: product.title,
          handle: product.handle,
          description: product.description,
          vendor: product.vendor,
          productType: product.productType,
          tags: product.tags,
          status: product.status,
          createdAt: new Date(product.createdAt),
          updatedAt: new Date(product.updatedAt),
          // Handle price from first variant
          price: product.variants[0]?.price || 0,
          compareAtPrice: product.variants[0]?.compareAtPrice,
          inventoryQuantity: product.variants.reduce((sum, v) => sum + (v.inventoryQuantity || 0), 0),
          images: product.images.map(img => img.src),
          variants: {
            create: product.variants.map(variant => ({
              title: variant.title,
              price: variant.price,
              compareAtPrice: variant.compareAtPrice,
              sku: variant.sku,
              inventoryQuantity: variant.inventoryQuantity || 0,
              weight: variant.weight || 0,
              weightUnit: variant.weightUnit || 'lb',
              availableForSale: variant.availableForSale,
              option1: variant.option1,
              option2: variant.option2,
              option3: variant.option3
            }))
          },
          seo: {
            create: {
              title: product.seo?.title || product.title,
              description: product.seo?.description || product.title
            }
          }
        }
      });
      
      imported++;
      console.log(`✅ Imported: ${product.title}`);
      
    } catch (error) {
      console.error(`❌ Failed to import product ${product.title}:`, error.message);
    }
  }
  
  console.log(`📊 Products imported: ${imported}, skipped: ${skipped}`);
  return { imported, skipped };
}

// Import Customers
async function importCustomers() {
  console.log('👥 Importing customers to database...');
  
  const customers = readJSON('customers.json');
  let imported = 0;
  let skipped = 0;
  
  for (const customer of customers) {
    try {
      // Check if customer already exists
      const existing = await prisma.customer.findUnique({
        where: { email: customer.email }
      });
      
      if (existing) {
        console.log(`⚠️  Customer already exists: ${customer.email}`);
        skipped++;
        continue;
      }
      
      // Create customer with addresses
      await prisma.customer.create({
        data: {
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone,
          totalSpent: customer.totalSpent,
          totalOrders: customer.totalOrders,
          emailMarketing: customer.emailMarketing,
          tags: customer.tags,
          createdAt: new Date(customer.createdAt),
          updatedAt: new Date(customer.updatedAt),
          addresses: {
            create: customer.addresses.map(address => ({
              firstName: address.firstName,
              lastName: address.lastName,
              phone: address.phone,
              company: address.company,
              address1: address.address1,
              address2: address.address2,
              city: address.city,
              province: address.province,
              country: address.country,
              zip: address.zip,
              isDefault: address.isDefault
            }))
          }
        }
      });
      
      imported++;
      console.log(`✅ Imported: ${customer.email}`);
      
    } catch (error) {
      console.error(`❌ Failed to import customer ${customer.email}:`, error.message);
    }
  }
  
  console.log(`👥 Customers imported: ${imported}, skipped: ${skipped}`);
  return { imported, skipped };
}

// Import Orders
async function importOrders() {
  console.log('📋 Importing orders to database...');
  
  const orders = readJSON('orders.json');
  let imported = 0;
  let skipped = 0;
  
  for (const order of orders) {
    try {
      // Check if order already exists
      const existing = await prisma.order.findUnique({
        where: { id: order.id }
      });
      
      if (existing) {
        console.log(`⚠️  Order already exists: ${order.name}`);
        skipped++;
        continue;
      }
      
      // Find or create customer
      let customer = await prisma.customer.findUnique({
        where: { email: order.customer.email }
      });
      
      if (!customer) {
        customer = await prisma.customer.create({
          data: {
            email: order.customer.email,
            firstName: order.customer.firstName,
            lastName: order.customer.lastName,
            phone: order.customer.phone
          }
        });
      }
      
      // Create order
      await prisma.order.create({
        data: {
          id: order.id,
          orderNumber: order.name,
          customerId: customer.id,
          email: order.email,
          phone: order.phone,
          totalPrice: order.totalPrice,
          subtotalPrice: order.subtotalPrice,
          totalTax: order.totalTax,
          totalShipping: order.totalShipping,
          currency: order.currency,
          financialStatus: order.financialStatus,
          fulfillmentStatus: order.fulfillmentStatus,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
          cancelledAt: order.cancelledAt ? new Date(order.cancelledAt) : null,
          billingAddress: order.billingAddress,
          shippingAddress: order.shippingAddress,
          lineItems: {
            create: order.lineItems.map(item => ({
              title: item.title,
              quantity: item.quantity,
              price: item.price,
              totalPrice: item.totalPrice,
              sku: item.sku,
              vendor: item.vendor
            }))
          }
        }
      });
      
      imported++;
      console.log(`✅ Imported order: ${order.name}`);
      
    } catch (error) {
      console.error(`❌ Failed to import order ${order.name}:`, error.message);
    }
  }
  
  console.log(`📦 Orders imported: ${imported}, skipped: ${skipped}`);
  return { imported, skipped };
}

// Main import function
export async function importToDatabase() {
  try {
    console.log('🚀 Starting database import...\n');
    
    const productResults = await importProducts();
    console.log('');
    
    const customerResults = await importCustomers();
    console.log('');
    
    const orderResults = await importOrders();
    console.log('');
    
    const summary = {
      importDate: new Date().toISOString(),
      results: {
        products: productResults,
        customers: customerResults,
        orders: orderResults
      },
      totals: {
        imported: productResults.imported + customerResults.imported + orderResults.imported,
        skipped: productResults.skipped + customerResults.skipped + orderResults.skipped
      }
    };
    
    // Save import log
    fs.writeFileSync(
      path.join(PROCESSED_PATH, 'database-import-log.json'),
      JSON.stringify(summary, null, 2)
    );
    
    console.log('✅ Database import completed successfully!');
    console.log(`📊 Total imported: ${summary.totals.imported}`);
    console.log(`⚠️  Total skipped: ${summary.totals.skipped}`);
    
    return summary;
    
  } catch (error) {
    console.error('❌ Database import failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// If running directly
if (import.meta.url === `file://${process.argv[1]}`) {
  importToDatabase()
    .then((summary) => {
      console.log('\n🎉 Database Import Summary:', summary);
    })
    .catch((error) => {
      console.error('💥 Fatal Error:', error);
      process.exit(1);
    });
}