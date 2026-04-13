declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AMAZON_SPP_ACCESS_KEY?: string;
      AMAZON_SPP_SECRET_KEY?: string;
      AMAZON_SPP_REFRESH_TOKEN?: string;
      AMAZON_SPP_CLIENT_ID?: string;
      AMAZON_ASSOCIATE_TAG?: string;
      AMAZON_MARKETPLACE_ID?: string;
      SHOPIFY_STORE_URL?: string;
      SHOPIFY_STOREFRONT_ACCESS_TOKEN?: string;
      STRIPE_SECRET_KEY?: string;
      NEXT_PUBLIC_SITE_URL?: string;
      NEXT_PUBLIC_SHOPIFY_BEAR_HUG_VARIANT_S?: string;
      NEXT_PUBLIC_SHOPIFY_BEAR_HUG_VARIANT_M?: string;
      NEXT_PUBLIC_SHOPIFY_BEAR_HUG_VARIANT_L?: string;
      NEXT_PUBLIC_SHOPIFY_BEAR_HUG_VARIANT_XL?: string;
      NEXT_PUBLIC_SHOPIFY_BEAR_HUG_VARIANT_2XL?: string;
      // Add other environment variables here
    }
  }
}