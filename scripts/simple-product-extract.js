// Simple Product List Extractor
// Extracts just product names and images for manual import

import fs from 'fs';

const products = JSON.parse(fs.readFileSync('./migration/processed/products.json', 'utf8'));

console.log('🛍️  PRODUCTS TO MANUALLY IMPORT\n');
console.log('=' .repeat(50));

products.forEach((product, index) => {
  console.log(`\n${index + 1}. ${product.title}`);
  console.log(`   Handle: ${product.handle}`);
  console.log(`   Price: $${product.variants[0]?.price || 'N/A'}`);
  console.log(`   Status: ${product.status}`);
  
  if (product.images.length > 0) {
    console.log('   Images:');
    product.images.forEach((img, i) => {
      console.log(`     ${i + 1}. ${img.src}`);
    });
  } else {
    console.log('   Images: None');
  }
  
  console.log(`   Description: ${(product.description || '').replace(/<[^>]*>/g, '').substring(0, 100)}...`);
});

console.log('\n' + '='.repeat(50));
console.log(`\nTotal Products: ${products.length}`);

// Create a simple CSV for easy reference
const csvContent = [
  'Title,Handle,Price,Image URL,Status',
  ...products.map(p => `"${p.title}","${p.handle}",${p.variants[0]?.price || 0},"${p.images[0]?.src || ''}","${p.status}"`)
].join('\n');

fs.writeFileSync('./migration/simple-product-list.csv', csvContent);
console.log('\n📄 Created simple-product-list.csv for easy reference');