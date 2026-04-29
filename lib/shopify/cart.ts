import { shopifyStorefrontFetch } from '@/lib/shopify/storefront';

export type ShopifyMoney = { amount: string; currencyCode: string };

export type ShopifyCartLineNode = {
  id: string;
  quantity: number;
  cost: {
    amountPerQuantity: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
  merchandise: {
    __typename: string;
    id: string;
    title: string;
    sku?: string | null;
    image?: { url: string; altText?: string | null } | null;
    product?: { id: string; title: string } | null;
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
    totalTaxAmount?: ShopifyMoney | null;
  };
  lines: { edges: Array<{ node: ShopifyCartLineNode }> };
};

type CartQueryData = { cart: ShopifyCart | null };

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
    totalTaxAmount { amount currencyCode }
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        cost {
          amountPerQuantity { amount currencyCode }
          totalAmount { amount currencyCode }
        }
        merchandise {
          __typename
          ... on ProductVariant {
            id
            title
            sku
            image { url altText }
            product { id title }
          }
        }
      }
    }
  }
`;

export async function getCart(cartId: string) {
  const query = `
    query getCart($id: ID!) {
      cart(id: $id) {
        ${CART_FIELDS}
      }
    }
  `;

  const data = await shopifyStorefrontFetch<CartQueryData>({
    query,
    variables: { id: cartId },
    cache: 'no-store',
  });

  return data.cart;
}

type CartCreateData = {
  cartCreate: {
    cart: ShopifyCart | null;
    userErrors: Array<{ field?: string[] | null; message: string }>;
  };
};

export async function createCart(input?: {
  lines?: Array<{ merchandiseId: string; quantity: number }>;
}) {
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `;

  const data = await shopifyStorefrontFetch<CartCreateData>({
    query: mutation,
    variables: { input: { lines: input?.lines ?? [] } },
    cache: 'no-store',
  });

  const userErrors = data.cartCreate.userErrors ?? [];
  if (userErrors.length) {
    throw new Error(userErrors[0]?.message || 'Failed to create Shopify cart.');
  }

  if (!data.cartCreate.cart) {
    throw new Error('Shopify did not return a cart.');
  }

  return data.cartCreate.cart;
}

type CartLinesAddData = {
  cartLinesAdd: {
    cart: ShopifyCart | null;
    userErrors: Array<{ field?: string[] | null; message: string }>;
  };
};

export async function addLines(cartId: string, lines: Array<{ merchandiseId: string; quantity: number }>) {
  const mutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `;

  const data = await shopifyStorefrontFetch<CartLinesAddData>({
    query: mutation,
    variables: { cartId, lines },
    cache: 'no-store',
  });

  const userErrors = data.cartLinesAdd.userErrors ?? [];
  if (userErrors.length) {
    throw new Error(userErrors[0]?.message || 'Failed to add lines to Shopify cart.');
  }

  if (!data.cartLinesAdd.cart) {
    throw new Error('Shopify did not return an updated cart.');
  }

  return data.cartLinesAdd.cart;
}

type CartLinesUpdateData = {
  cartLinesUpdate: {
    cart: ShopifyCart | null;
    userErrors: Array<{ field?: string[] | null; message: string }>;
  };
};

export async function updateLines(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>
) {
  const mutation = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `;

  const data = await shopifyStorefrontFetch<CartLinesUpdateData>({
    query: mutation,
    variables: { cartId, lines },
    cache: 'no-store',
  });

  const userErrors = data.cartLinesUpdate.userErrors ?? [];
  if (userErrors.length) {
    throw new Error(userErrors[0]?.message || 'Failed to update Shopify cart lines.');
  }

  if (!data.cartLinesUpdate.cart) {
    throw new Error('Shopify did not return an updated cart.');
  }

  return data.cartLinesUpdate.cart;
}

type CartLinesRemoveData = {
  cartLinesRemove: {
    cart: ShopifyCart | null;
    userErrors: Array<{ field?: string[] | null; message: string }>;
  };
};

export async function removeLines(cartId: string, lineIds: string[]) {
  const mutation = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `;

  const data = await shopifyStorefrontFetch<CartLinesRemoveData>({
    query: mutation,
    variables: { cartId, lineIds },
    cache: 'no-store',
  });

  const userErrors = data.cartLinesRemove.userErrors ?? [];
  if (userErrors.length) {
    throw new Error(userErrors[0]?.message || 'Failed to remove Shopify cart lines.');
  }

  if (!data.cartLinesRemove.cart) {
    throw new Error('Shopify did not return an updated cart.');
  }

  return data.cartLinesRemove.cart;
}

