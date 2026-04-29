'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  title: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  sku?: string;
  shopifyVariantId?: string;
  shopifyLineId?: string;
}

export function ShoppingCartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [shopifyCartId, setShopifyCartId] = useState<string | null>(null);
  const [shopifyCheckoutUrl, setShopifyCheckoutUrl] = useState<string | null>(null);

  const CART_ID_STORAGE_KEY = 'dementia-aide-shopify-cart-id';

  const setCartFromShopify = (shopifyCart: any | null) => {
    if (!shopifyCart) {
      setCart([]);
      setShopifyCheckoutUrl(null);
      return;
    }

    setShopifyCheckoutUrl(shopifyCart.checkoutUrl ?? null);

    const lines = shopifyCart?.lines?.edges?.map((e: any) => e?.node).filter(Boolean) ?? [];
    const mapped: CartItem[] = lines
      .map((line: any) => {
        const merchandise = line?.merchandise;
        if (!merchandise || merchandise.__typename !== 'ProductVariant') return null;

        const unitPrice = Number.parseFloat(line?.cost?.amountPerQuantity?.amount ?? '0');
        const productTitle = merchandise?.product?.title ?? 'Product';
        const variantTitle = merchandise?.title && merchandise.title !== 'Default Title' ? merchandise.title : 'Default';
        const imageUrl = merchandise?.image?.url ?? '';

        return {
          id: line.id,
          productId: merchandise?.product?.id ?? merchandise.id,
          variantId: merchandise.id,
          title: productTitle,
          variant: variantTitle,
          price: Number.isFinite(unitPrice) ? unitPrice : 0,
          quantity: line.quantity ?? 0,
          image: imageUrl,
          sku: merchandise?.sku ?? undefined,
          shopifyVariantId: merchandise.id,
          shopifyLineId: line.id,
        } satisfies CartItem;
      })
      .filter(Boolean) as CartItem[];

    setCart(mapped);
  };

  const ensureShopifyCartId = async () => {
    if (shopifyCartId) return shopifyCartId;

    const res = await fetch('/api/cart', { method: 'POST' });
    const payload = await res.json();
    if (!res.ok || payload?.error) {
      throw new Error(payload?.error || 'Failed to create cart.');
    }

    const newCartId = payload?.cart?.id as string | undefined;
    if (!newCartId) throw new Error('Shopify did not return a cart id.');

    setShopifyCartId(newCartId);
    localStorage.setItem(CART_ID_STORAGE_KEY, newCartId);
    setCartFromShopify(payload?.cart ?? null);
    return newCartId;
  };

  // Load Shopify cart id from localStorage, then hydrate from Shopify
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_ID_STORAGE_KEY);
    if (!savedCartId) return;

    setShopifyCartId(savedCartId);
    (async () => {
      const res = await fetch(`/api/cart?cartId=${encodeURIComponent(savedCartId)}`, { method: 'GET' });
      const payload = await res.json();
      if (res.ok && payload?.cart) {
        setCartFromShopify(payload.cart);
      } else if (res.ok && payload?.cart === null) {
        localStorage.removeItem(CART_ID_STORAGE_KEY);
        setShopifyCartId(null);
        setCartFromShopify(null);
      }
    })();
  }, []);

  const addToCart = async (product: Omit<CartItem, 'quantity'>, quantity = 1) => {
    const merchandiseId = product.shopifyVariantId;
    if (!merchandiseId) {
      console.warn('Cart item missing shopifyVariantId; cannot add to Shopify cart.', product);
      alert('This product is not connected to Shopify yet.');
      return;
    }

    const cartId = await ensureShopifyCartId();

    const res = await fetch('/api/cart/lines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'add', cartId, merchandiseId, quantity }),
    });
    const payload = await res.json();
    if (!res.ok || payload?.error) {
      throw new Error(payload?.error || 'Failed to add item to cart.');
    }

    setCartFromShopify(payload?.cart ?? null);
  };

  const updateQuantity = async (variantId: string, quantity: number) => {
    const item = cart.find((i) => i.variantId === variantId);
    if (!item?.shopifyLineId) return;

    if (quantity <= 0) {
      await removeFromCart(variantId);
      return;
    }

    if (!shopifyCartId) return;

    const res = await fetch('/api/cart/lines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update', cartId: shopifyCartId, lineId: item.shopifyLineId, quantity }),
    });
    const payload = await res.json();
    if (!res.ok || payload?.error) {
      throw new Error(payload?.error || 'Failed to update cart item.');
    }
    setCartFromShopify(payload?.cart ?? null);
  };

  const removeFromCart = async (variantId: string) => {
    const item = cart.find((i) => i.variantId === variantId);
    if (!item?.shopifyLineId || !shopifyCartId) return;

    const res = await fetch('/api/cart/lines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'remove', cartId: shopifyCartId, lineIds: [item.shopifyLineId] }),
    });
    const payload = await res.json();
    if (!res.ok || payload?.error) {
      throw new Error(payload?.error || 'Failed to remove cart item.');
    }
    setCartFromShopify(payload?.cart ?? null);
  };

  const clearCart = async () => {
    if (!shopifyCartId || cart.length === 0) {
      setCart([]);
      return;
    }

    const lineIds = cart.map((i) => i.shopifyLineId).filter(Boolean) as string[];
    if (lineIds.length === 0) {
      setCart([]);
      return;
    }

    const res = await fetch('/api/cart/lines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'remove', cartId: shopifyCartId, lineIds }),
    });
    const payload = await res.json();
    if (!res.ok || payload?.error) {
      throw new Error(payload?.error || 'Failed to clear cart.');
    }
    setCartFromShopify(payload?.cart ?? null);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice,
      isOpen,
      setIsOpen,
      checkoutUrl: shopifyCheckoutUrl
    }}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

function CartDrawer() {
  const { cart, updateQuantity, removeFromCart, totalPrice, isOpen, setIsOpen, checkoutUrl } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setIsOpen(false);
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
      return;
    }
    window.location.href = '/checkout';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Shopping Cart ({cart.length})</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <motion.div
                      key={item.variantId}
                      layout
                      className="flex gap-3 p-3 border rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.title}</h3>
                        {item.variant && (
                          <p className="text-sm text-muted-foreground">{item.variant}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.variantId)}
                              className="text-red-500 h-auto p-0 text-xs"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold text-lg">${totalPrice.toFixed(2)}</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {isCheckingOut ? 'Processing...' : 'Checkout'}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Cart Context
import { createContext, useContext } from 'react';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>, quantity?: number) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeFromCart: (variantId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  checkoutUrl: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a ShoppingCartProvider');
  }
  return context;
}
