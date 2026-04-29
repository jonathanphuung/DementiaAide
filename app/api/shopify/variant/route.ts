import { NextRequest, NextResponse } from 'next/server';
import { shopifyStorefrontFetch } from '@/lib/shopify/storefront';

type SelectedOption = { name: string; value: string };

type VariantNode = {
  id: string;
  selectedOptions: SelectedOption[];
};

type ProductByHandleData = {
  productByHandle: {
    id: string;
    title: string;
    handle: string;
    variants: { edges: Array<{ node: VariantNode }> };
  } | null;
};

type ProductsSearchData = {
  products: {
    nodes: Array<{
      id: string;
      title: string;
      handle: string;
      variants: { edges: Array<{ node: VariantNode }> };
    }>;
  };
};

function normalizeOptionName(name: string) {
  return name.trim().toLowerCase();
}

function normalizeOptionValue(value: string) {
  return value.trim().toLowerCase();
}

function findMatchingVariantId(
  variants: Array<{ node: VariantNode }>,
  selectedOptions: SelectedOption[]
) {
  if (variants.length === 0) return null;
  if (selectedOptions.length === 0) return variants[0]?.node?.id ?? null;

  const desired = selectedOptions.map((o) => ({
    name: normalizeOptionName(o.name),
    value: normalizeOptionValue(o.value),
  }));

  for (const edge of variants) {
    const variant = edge.node;
    const actual = (variant.selectedOptions ?? []).map((o) => ({
      name: normalizeOptionName(o.name),
      value: normalizeOptionValue(o.value),
    }));

    const matches = desired.every((want) =>
      actual.some((got) => got.name === want.name && got.value === want.value)
    );
    if (matches) return variant.id;
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const handle = typeof body?.handle === 'string' ? body.handle : null;
    const title = typeof body?.title === 'string' ? body.title : null;
    const selectedOptions = Array.isArray(body?.selectedOptions) ? (body.selectedOptions as SelectedOption[]) : [];

    if (!handle && !title) {
      return NextResponse.json({ error: 'Missing handle or title.' }, { status: 400 });
    }

    const variantFields = `
      edges {
        node {
          id
          selectedOptions { name value }
        }
      }
    `;

    if (handle) {
      const query = `
        query productByHandle($handle: String!) {
          productByHandle(handle: $handle) {
            id
            title
            handle
            variants(first: 100) { ${variantFields} }
          }
        }
      `;

      const data = await shopifyStorefrontFetch<ProductByHandleData>({
        query,
        variables: { handle },
        cache: 'no-store',
      });

      if (data.productByHandle) {
        const variantId = findMatchingVariantId(data.productByHandle.variants.edges, selectedOptions);
        if (!variantId) {
          return NextResponse.json({ error: 'Variant not found for selected options.' }, { status: 404 });
        }
        return NextResponse.json({ variantId }, { status: 200 });
      }
    }

    if (title) {
      const query = `
        query productsByTitle($query: String!) {
          products(first: 10, query: $query) {
            nodes {
              id
              title
              handle
              variants(first: 100) { ${variantFields} }
            }
          }
        }
      `;

      const shopifyQuery = `title:\"${title.replace(/\"/g, '\\\\\"')}\"`;
      const data = await shopifyStorefrontFetch<ProductsSearchData>({
        query,
        variables: { query: shopifyQuery },
        cache: 'no-store',
      });

      const product = (data.products.nodes ?? []).find((p) => p.title.toLowerCase() === title.toLowerCase()) ?? data.products.nodes?.[0];
      if (!product) {
        return NextResponse.json({ error: 'Product not found in Shopify.' }, { status: 404 });
      }

      const variantId = findMatchingVariantId(product.variants.edges, selectedOptions);
      if (!variantId) {
        return NextResponse.json({ error: 'Variant not found for selected options.' }, { status: 404 });
      }

      return NextResponse.json({ variantId }, { status: 200 });
    }

    return NextResponse.json({ error: 'Product not found in Shopify.' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to resolve Shopify variant.' }, { status: 500 });
  }
}

