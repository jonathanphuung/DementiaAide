// CSV to JSON Import Script
// Converts Shopify CSV exports to database format

import { config } from 'dotenv';
config({ path: '.env.local' });

import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const EXPORT_PATH = './migration/shopify-export';
const OUTPUT_PATH = './migration/processed';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_PATH)) {
  fs.mkdirSync(OUTPUT_PATH, { recursive: true });
}

// Helper function to read CSV file
function readCSV(filename) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(EXPORT_PATH, filename))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

// Process Products
async function processProducts() {
  console.log('📦 Processing products...');
  
  const rawProducts = await readCSV('Products.csv');
  const products = new Map();
  
  // Group by product handle to combine variants
  for (const row of rawProducts) {
    const handle = row.Handle;
    
    if (!products.has(handle)) {
      products.set(handle, {
        id: row.ID,
        title: row.Title,
        handle: handle,
        description: row['Body HTML'],
        vendor: row.Vendor,
        productType: row.Type,
        tags: row.Tags ? row.Tags.split(', ') : [],
        status: (row.Status || 'draft').toLowerCase(),
        createdAt: row['Created At'],
        updatedAt: row['Updated At'],
        images: [],
        variants: [],
        seo: {
          title: row.Title,
          description: row.Title
        }
      });
    }
    
    const product = products.get(handle);
    
    // Add image if present
    if (row['Image Src'] && !product.images.find(img => img.src === row['Image Src'])) {
      product.images.push({
        src: row['Image Src'],
        alt: row['Image Alt Text'] || row.Title,
        width: parseInt(row['Image Width']) || null,
        height: parseInt(row['Image Height']) || null
      });
    }
    
    // Add variant
    if (row['Variant ID']) {
      product.variants.push({
        id: row['Variant ID'],
        title: row['Option1 Value'] || 'Default Title',
        price: parseFloat(row['Variant Price']) || 0,
        compareAtPrice: row['Variant Compare At Price'] ? parseFloat(row['Variant Compare At Price']) : null,
        sku: row['Variant SKU'] || '',
        inventoryQuantity: parseInt(row['Variant Inventory Qty']) || 0,
        weight: parseFloat(row['Variant Weight']) || 0,
        weightUnit: row['Variant Weight Unit'] || 'lb',
        availableForSale: (row.Status || 'draft') === 'Active',
        option1: row['Option1 Value'] || null,
        option2: row['Option2 Value'] || null,
        option3: row['Option3 Value'] || null
      });
    }
  }
  
  const productsArray = Array.from(products.values());
  fs.writeFileSync(
    path.join(OUTPUT_PATH, 'products.json'),
    JSON.stringify(productsArray, null, 2)
  );
  
  console.log(`✅ Processed ${productsArray.length} products`);
  return productsArray;
}

// Process Customers
async function processCustomers() {
  console.log('👥 Processing customers...');
  
  const rawCustomers = await readCSV('Customers.csv');
  const customers = new Map();
  
  for (const row of rawCustomers) {
    const email = row.Email;
    
    if (!customers.has(email)) {
      customers.set(email, {
        id: row.ID,
        email: email,
        firstName: row['First Name'],
        lastName: row['Last Name'],
        phone: row.Phone,
        createdAt: row['Created At'],
        updatedAt: row['Updated At'],
        totalSpent: parseFloat(row['Total Spent']) || 0,
        totalOrders: parseInt(row['Total Orders']) || 0,
        emailMarketing: row['Email Marketing: Status'] === 'subscribed',
        tags: row.Tags ? row.Tags.split(', ') : [],
        addresses: []
      });
    }
    
    const customer = customers.get(email);
    
    // Add address if present
    if (row['Address Line 1']) {
      customer.addresses.push({
        id: row['Address ID'],
        firstName: row['Address First Name'],
        lastName: row['Address Last Name'],
        phone: row['Address Phone'],
        company: row['Address Company'],
        address1: row['Address Line 1'],
        address2: row['Address Line 2'],
        city: row['Address City'],
        province: row['Address Province'],
        country: row['Address Country'],
        zip: row['Address Zip'],
        isDefault: row['Address Is Default'] === 'true'
      });
    }
  }
  
  const customersArray = Array.from(customers.values());
  fs.writeFileSync(
    path.join(OUTPUT_PATH, 'customers.json'),
    JSON.stringify(customersArray, null, 2)
  );
  
  console.log(`✅ Processed ${customersArray.length} customers`);
  return customersArray;
}

// Process Orders
async function processOrders() {
  console.log('📋 Processing orders...');
  
  const rawOrders = await readCSV('Orders.csv');
  const orders = new Map();
  
  for (const row of rawOrders) {
    const orderId = row.ID;
    
    if (!orders.has(orderId)) {
      orders.set(orderId, {
        id: orderId,
        name: row.Name,
        email: row.Email || row['Customer: Email'],
        phone: row.Phone || row['Customer: Phone'],
        createdAt: row['Created At'],
        updatedAt: row['Updated At'],
        cancelledAt: row['Cancelled At'] || null,
        financialStatus: row['Payment: Status'] || 'pending',
        fulfillmentStatus: row['Order Fulfillment Status'] || 'unfulfilled',
        currency: row.Currency || 'USD',
        totalPrice: parseFloat(row['Price: Total']) || 0,
        subtotalPrice: parseFloat(row['Price: Subtotal']) || 0,
        totalTax: parseFloat(row['Tax: Total']) || 0,
        totalShipping: parseFloat(row['Price: Total Shipping']) || 0,
        customer: {
          id: row['Customer: ID'],
          email: row['Customer: Email'],
          firstName: row['Customer: First Name'],
          lastName: row['Customer: Last Name'],
          phone: row['Customer: Phone']
        },
        billingAddress: {
          firstName: row['Billing: First Name'],
          lastName: row['Billing: Last Name'],
          company: row['Billing: Company'],
          address1: row['Billing: Address 1'],
          address2: row['Billing: Address 2'],
          city: row['Billing: City'],
          province: row['Billing: Province'],
          country: row['Billing: Country'],
          zip: row['Billing: Zip'],
          phone: row['Billing: Phone']
        },
        shippingAddress: {
          firstName: row['Shipping: First Name'],
          lastName: row['Shipping: Last Name'],
          company: row['Shipping: Company'],
          address1: row['Shipping: Address 1'],
          address2: row['Shipping: Address 2'],
          city: row['Shipping: City'],
          province: row['Shipping: Province'],
          country: row['Shipping: Country'],
          zip: row['Shipping: Zip'],
          phone: row['Shipping: Phone']
        },
        lineItems: []
      });
    }
    
    const order = orders.get(orderId);
    
    // Add line item if present
    if (row['Line: Type'] === 'Line Item' && row['Line: Product ID']) {
      order.lineItems.push({
        id: row['Line: ID'],
        productId: row['Line: Product ID'],
        variantId: row['Line: Variant ID'],
        title: row['Line: Title'],
        name: row['Line: Name'],
        sku: row['Line: SKU'],
        quantity: parseInt(row['Line: Quantity']) || 1,
        price: parseFloat(row['Line: Price']) || 0,
        totalPrice: parseFloat(row['Line: Total']) || 0,
        vendor: row['Line: Vendor']
      });
    }
  }
  
  const ordersArray = Array.from(orders.values());
  fs.writeFileSync(
    path.join(OUTPUT_PATH, 'orders.json'),
    JSON.stringify(ordersArray, null, 2)
  );
  
  console.log(`✅ Processed ${ordersArray.length} orders`);
  return ordersArray;
}

// Main import function
export async function importShopifyData() {
  try {
    console.log('🚀 Starting Shopify data import...\n');
    
    const products = await processProducts();
    const customers = await processCustomers();
    const orders = await processOrders();
    
    // Create summary
    const summary = {
      importDate: new Date().toISOString(),
      counts: {
        products: products.length,
        customers: customers.length,
        orders: orders.length
      },
      files: {
        products: path.join(OUTPUT_PATH, 'products.json'),
        customers: path.join(OUTPUT_PATH, 'customers.json'),
        orders: path.join(OUTPUT_PATH, 'orders.json')
      }
    };
    
    fs.writeFileSync(
      path.join(OUTPUT_PATH, 'import-summary.json'),
      JSON.stringify(summary, null, 2)
    );
    
    console.log('\n✅ Shopify data import completed successfully!');
    console.log(`📊 Products: ${products.length}`);
    console.log(`👥 Customers: ${customers.length}`);
    console.log(`📦 Orders: ${orders.length}`);
    console.log(`\n📁 Files saved to: ${OUTPUT_PATH}`);
    
    return summary;
    
  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  }
}

// If running directly
if (import.meta.url === `file://${process.argv[1]}`) {
  importShopifyData()
    .then((summary) => {
      console.log('\n🎉 Import Summary:', summary);
    })
    .catch((error) => {
      console.error('💥 Fatal Error:', error);
      process.exit(1);
    });
}