#!/usr/bin/env node

/**
 * Test Environment Loading
 * Quick test to verify environment variables are loaded correctly
 */

import 'dotenv/config';

console.log('🧪 Testing environment variable loading...\n');

const requiredVars = [
  'SHOPIFY_STORE_URL',
  'SHOPIFY_ACCESS_TOKEN'
];

console.log('📋 Checking required variables:');
for (const varName of requiredVars) {
  const value = process.env[varName];
  const status = value && value !== `your-${varName.toLowerCase().replace('_', '-')}` ? '✅' : '❌';
  const display = value ? (value.length > 20 ? `${value.substring(0, 20)}...` : value) : 'undefined';
  console.log(`${status} ${varName}: ${display}`);
}

console.log('\n📂 Environment file locations:');
console.log('- .env.local (highest priority)');
console.log('- .env.development.local');  
console.log('- .env.development');
console.log('- .env.example (template only)');

console.log('\n🔧 Current working directory:', process.cwd());