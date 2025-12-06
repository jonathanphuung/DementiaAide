'use client';

import { useState, useEffect } from 'react';

export default function ImageTestPage() {
  const [testImage, setTestImage] = useState('');
  const [imageLoadStatus, setImageLoadStatus] = useState('');
  
  useEffect(() => {
    // Test the exact image URL from our API
    setTestImage('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80');
  }, []);

  const handleImageLoad = () => {
    setImageLoadStatus('✅ Image loaded successfully!');
    console.log('✅ Test image loaded successfully');
  };

  const handleImageError = () => {
    setImageLoadStatus('❌ Image failed to load');
    console.error('❌ Test image failed to load');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Image Loading Test</h1>
      
      <div className="space-y-6">
        {/* Test Image */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Test Image</h2>
          <div className="w-64 h-64 border-2 border-gray-200 rounded">
            {testImage && (
              <img
                src={testImage}
                alt="Test product image"
                className="w-full h-full object-contain"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
          </div>
          <p className="mt-2 text-sm">Status: {imageLoadStatus}</p>
          <p className="text-xs text-gray-600 mt-1">URL: {testImage}</p>
        </div>
        
        {/* Test API Call */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">API Test</h2>
          <TestApiCall />
        </div>
      </div>
    </div>
  );
}

function TestApiCall() {
  const [apiResult, setApiResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const testApi = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/amazon/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'refuses to eat', maxResults: 1 })
      });
      const data = await response.json();
      setApiResult(data);
    } catch (error) {
      setApiResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <button 
        onClick={testApi}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test API'}
      </button>
      
      {apiResult && (
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold">API Result:</h3>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
            {JSON.stringify(apiResult, null, 2)}
          </pre>
          
          {apiResult.products?.[0] && (
            <div className="mt-4">
              <h4 className="font-semibold">First Product Image:</h4>
              <div className="w-32 h-32 border border-gray-200 rounded mt-2">
                <img
                  src={apiResult.products[0].image}
                  alt={apiResult.products[0].title}
                  className="w-full h-full object-contain"
                  onLoad={() => console.log('✅ API product image loaded')}
                  onError={() => console.error('❌ API product image failed')}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}