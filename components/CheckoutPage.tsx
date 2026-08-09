'use client';

import { useState } from 'react';
import { CreditCard, Truck, ShieldCheck, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/components/ShoppingCart';

export function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('stripe');

  const shippingCost = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08; // 8% tax estimate
  const finalTotal = totalPrice + shippingCost + tax;

  const paymentMethods = [
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard,
      color: 'bg-primary',
    },
    {
      id: 'shop_pay',
      name: 'Shop Pay (Shopify Checkout)',
      description: 'Fast checkout through your Shopify store',
      icon: ShoppingBag,
      color: 'bg-sage',
    },
  ];

  const handleCheckout = async (paymentMethod: string) => {
    setIsProcessing(true);
    
    try {
      // Create checkout session with specific payment method
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            images: [item.image],
            description: item.variant,
            shopifyVariantId: item.shopifyVariantId
          })),
          paymentMethod,
          totals: {
            subtotal: totalPrice,
            shipping: shippingCost,
            tax,
            total: finalTotal
          }
        })
      });

      const { url, error } = await response.json();
      
      if (error) {
        throw new Error(error);
      }
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-extrabold text-foreground mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some dementia care products to get started</p>
          <Button onClick={() => window.location.href = '/shop'}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="font-display text-3xl font-extrabold text-foreground">Secure Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedPayment === method.id
                          ? 'border-primary bg-teal-tint'
                          : 'border-foreground/15 hover:border-foreground/30'
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${method.color} flex items-center justify-center text-primary-foreground`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{method.name}</p>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPayment === method.id
                            ? 'bg-primary border-primary'
                            : 'border-foreground/20'
                        }`} />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4" />
              <span>256-bit SSL encrypted checkout</span>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.variantId} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{item.title}</p>
                        {item.variant && (
                          <p className="text-xs text-muted-foreground">{item.variant}</p>
                        )}
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Shipping
                    </span>
                    <span>
                      {shippingCost === 0 ? (
                        <Badge variant="secondary">Free</Badge>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (estimated)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {totalPrice < 50 && (
                  <div className="bg-teal-tint border-2 border-teal-border rounded-lg p-3">
                    <p className="text-sm text-primary">
                      Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <Button
                  onClick={() => handleCheckout(selectedPayment)}
                  disabled={isProcessing}
                  className="w-full h-12 text-lg"
                  size="lg"
                >
                  {isProcessing ? 'Processing...' : `Complete Order - $${finalTotal.toFixed(2)}`}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By completing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}