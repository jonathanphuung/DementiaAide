// Migration script to export data from Shopify
// Load environment variables first
import { config } from 'dotenv';
config({ path: '.env.local' });

import * as ShopifyClient from '@shopify/admin-api-client';
import fs from 'fs';
import path from 'path';

// Create client only when needed (after env vars are validated)
function createShopifyClient() {
  return ShopifyClient.createAdminApiClient({
    storeDomain: process.env.SHOPIFY_STORE_URL,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    apiVersion: '2026-01',
  });
}

// Helper function to fetch all data with pagination
async function fetchAllData(query, field, client, variables = {}) {
  let allData = [];
  let hasNextPage = true;
  let cursor = null;

  while (hasNextPage) {
    const queryWithPagination = query.replace(
      /first:\s*\d+/,
      `first: 50${cursor ? `, after: "${cursor}"` : ''}`
    );

    try {
      console.log(`🔍 Making API request for ${field}...`);
      const response = await client.request(queryWithPagination, variables);
      
      console.log('📡 API Response structure:', Object.keys(response));
      console.log('📊 Response data keys:', response.data ? Object.keys(response.data) : 'No data property');
      
      if (!response.data || !response.data[field]) {
        console.log('⚠️  No data found for field:', field);
        console.log('📋 Full response:', JSON.stringify(response, null, 2));
        break;
      }
      
      const nodes = response.data[field].nodes;
      const pageInfo = response.data[field].pageInfo;

      allData.push(...nodes);
      hasNextPage = pageInfo?.hasNextPage || false;
      cursor = pageInfo?.endCursor;

      console.log(`📥 Fetched ${allData.length} ${field}...`);
      
      // Only continue if we have more pages
      if (!hasNextPage) break;
      
    } catch (error) {
      console.error(`❌ Error fetching ${field}:`, error.message);
      if (error.response) {
        console.log('📋 Error response:', JSON.stringify(error.response, null, 2));
      }
      break;
    }

    // Rate limiting - wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  return { data: { [field]: { nodes: allData } } };
}

export async function exportShopifyData() {
  try {
    console.log('🔄 Starting Shopify data export...');
    console.log(`🏪 Store: ${process.env.SHOPIFY_STORE_URL}`);

    // Create the client after validation
    const client = createShopifyClient();

    // Export Products with pagination
    console.log('\n📦 Exporting Products...');
    const products = await fetchAllData(`
      query ($cursor: String) {
        products(first: 50, after: $cursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            title
            description
            handle
            vendor
            productType
            tags
            status
            createdAt
            updatedAt
            images(first: 10) {
              nodes {
                id
                url
                altText
              }
            }
            variants(first: 100) {
              nodes {
                id
                title
                price
                compareAtPrice
                sku
                inventoryQuantity
                weight
                weightUnit
                inventoryManagement
                inventoryPolicy
                availableForSale
              }
            }
            seo {
              title
              description
            }
          }
        }
      }
    `, 'products', client);

    // Export Orders with pagination
    console.log('\n📋 Exporting Orders...');
    const orders = await fetchAllData(`
      query ($cursor: String) {
        orders(first: 50, after: $cursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            name
            email
            phone
            createdAt
            updatedAt
            cancelledAt
            cancelReason
            financialStatus
            fulfillmentStatus
            totalPriceSet {
              shopMoney {
                amount
                currencyCode
              }
            }
            subtotalPriceSet {
              shopMoney {
                amount
                currencyCode
              }
            }
            totalTaxSet {
              shopMoney {
                amount
                currencyCode
              }
            }
            shippingAddress {
              firstName
              lastName
              company
              address1
              address2
              city
              province
              country
              zip
              phone
            }
            billingAddress {
              firstName
              lastName
              company
              address1
              address2
              city
              province
              country
              zip
              phone
            }
            lineItems(first: 50) {
              nodes {
                id
                title
                quantity
                variant {
                  id
                  title
                  sku
                }
                originalUnitPriceSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    `, 'orders', client);

    // Export Customers with pagination
    console.log('\n👥 Exporting Customers...');
    const customers = await fetchAllData(`
      query ($cursor: String) {
        customers(first: 50, after: $cursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            firstName
            lastName
            email
            phone
            createdAt
            updatedAt
            acceptsMarketing
            totalSpent
            ordersCount
            addresses(first: 10) {
              id
              firstName
              lastName
              company
              address1
              address2
              city
              province
              country
              zip
              phone
            }
          }
        }
      }
    `, 'customers', client);

    // Ensure migration directory exists
    const migrationDir = path.join(process.cwd(), 'migration');
    if (!fs.existsSync(migrationDir)) {
      fs.mkdirSync(migrationDir, { recursive: true });
    }

    // Save to JSON files with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const productsFile = path.join(migrationDir, `products-${timestamp}.json`);
    const ordersFile = path.join(migrationDir, `orders-${timestamp}.json`);
    const customersFile = path.join(migrationDir, `customers-${timestamp}.json`);

    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
    fs.writeFileSync(customersFile, JSON.stringify(customers, null, 2));

    // Also save a summary report
    const summary = {
      exportDate: new Date().toISOString(),
      store: process.env.SHOPIFY_STORE_URL,
      counts: {
        products: products.data.products.nodes.length,
        orders: orders.data.orders.nodes.length,
        customers: customers.data.customers.nodes.length
      },
      files: {
        products: productsFile,
        orders: ordersFile,
        customers: customersFile
      }
    };

    fs.writeFileSync(
      path.join(migrationDir, `export-summary-${timestamp}.json`), 
      JSON.stringify(summary, null, 2)
    );

    console.log('\n✅ Shopify data export completed successfully!');
    console.log(`📊 Products: ${products.data.products.nodes.length}`);
    console.log(`📦 Orders: ${orders.data.orders.nodes.length}`);
    console.log(`👤 Customers: ${customers.data.customers.nodes.length}`);
    console.log(`\n📁 Files saved to: ${migrationDir}`);

    return summary;

  } catch (error) {
    console.error('❌ Export failed:', error);
    throw error;
  }
}

// If running directly
if (import.meta.url === `file://${process.argv[1]}`) {
  exportShopifyData()
    .then((summary) => {
      console.log('\n🎉 Export Summary:', summary);
    })
    .catch((error) => {
      console.error('💥 Fatal Error:', error);
      process.exit(1);
    });
}