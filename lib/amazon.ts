import {
  DefaultApi,
  SearchItemsRequest,
  GetItemsRequest,
  Condition,
  SearchItemsResource,
  PartnerType,
} from 'paapi5-nodejs-sdk';

export interface AmazonProduct {
  asin: string;
  title: string;
  description?: string;
  price?: {
    amount: number;
    currency: string;
    formatted: string;
  };
  rating?: {
    stars: number;
    count: number;
  };
  imageUrl: string;
  productUrl: string;
  prime?: boolean;
}

class AmazonAPI {
  private api: DefaultApi;
  private readonly marketplace: string;
  private readonly partnerTag: string;

  constructor() {
    if (!process.env.AMAZON_ACCESS_KEY || 
        !process.env.AMAZON_SECRET_KEY || 
        !process.env.AMAZON_PARTNER_TAG) {
      throw new Error('Amazon API credentials are not properly configured');
    }

    this.marketplace = process.env.AMAZON_MARKETPLACE || 'US';
    this.partnerTag = process.env.AMAZON_PARTNER_TAG;

    this.api = new DefaultApi({
      accessKey: process.env.AMAZON_ACCESS_KEY,
      secretKey: process.env.AMAZON_SECRET_KEY,
      region: this.getRegionFromMarketplace(this.marketplace),
      partnerTag: this.partnerTag,
      partnerType: PartnerType.Associates,
    });
  }

  private getRegionFromMarketplace(marketplace: string): string {
    const regionMap: { [key: string]: string } = {
      'US': 'us-east-1',
      'UK': 'eu-west-1',
      'CA': 'us-east-1',
      'DE': 'eu-west-1',
      // Add more marketplaces as needed
    };
    return regionMap[marketplace] || 'us-east-1';
  }

  async searchProducts(query: string, options: {
    category?: string;
    maxResults?: number;
    minPrice?: number;
    maxPrice?: number;
    condition?: 'New' | 'Used' | 'All';
  } = {}): Promise<AmazonProduct[]> {
    try {
      const searchRequest = new SearchItemsRequest({
        Keywords: query,
        Resources: [
          SearchItemsResource.IMAGES_PRIMARY_LARGE,
          SearchItemsResource.ITEMINFO_TITLE,
          SearchItemsResource.ITEMINFO_BYLINEINFO,
          SearchItemsResource.OFFERS_LISTINGS_PRICE,
          SearchItemsResource.OFFERS_LISTINGS_DELIVERY_INFO_IS_PRIME_ELIGIBLE,
          SearchItemsResource.CUSTOMERREVIEWS_COUNT,
          SearchItemsResource.CUSTOMERREVIEWS_STARRATING,
        ],
        PartnerTag: this.partnerTag,
        PartnerType: PartnerType.Associates,
        Marketplace: this.marketplace,
        ItemCount: options.maxResults || 10,
        SearchIndex: options.category || 'All',
        Condition: options.condition === 'Used' ? Condition.Used : 
                  options.condition === 'New' ? Condition.New : 
                  undefined,
      });

      const response = await this.api.searchItems(searchRequest);
      
      if (!response.SearchResult?.Items) {
        return [];
      }

      return response.SearchResult.Items.map(item => ({
        asin: item.ASIN!,
        title: item.ItemInfo?.Title?.DisplayValue || '',
        description: item.ItemInfo?.Title?.DisplayValue, // Full description not available in search
        price: item.Offers?.Listings?.[0]?.Price ? {
          amount: item.Offers.Listings[0].Price.Amount || 0,
          currency: item.Offers.Listings[0].Price.Currency || 'USD',
          formatted: item.Offers.Listings[0].Price.DisplayAmount || '',
        } : undefined,
        rating: item.CustomerReviews ? {
          stars: parseFloat(item.CustomerReviews.StarRating?.Value || '0'),
          count: parseInt(item.CustomerReviews.Count || '0', 10),
        } : undefined,
        imageUrl: item.Images?.Primary?.Large?.URL || '',
        productUrl: item.DetailPageURL || '',
        prime: item.Offers?.Listings?.[0]?.DeliveryInfo?.IsPrimeEligible || false,
      })).filter(product => {
        // Apply price filters if provided
        if (options.minPrice && (!product.price || product.price.amount < options.minPrice)) {
          return false;
        }
        if (options.maxPrice && (!product.price || product.price.amount > options.maxPrice)) {
          return false;
        }
        return true;
      });

    } catch (error) {
      console.error('Error searching Amazon products:', error);
      throw error;
    }
  }

  async getProductDetails(asin: string): Promise<AmazonProduct | null> {
    try {
      const request = new GetItemsRequest({
        ItemIds: [asin],
        Resources: [
          SearchItemsResource.IMAGES_PRIMARY_LARGE,
          SearchItemsResource.ITEMINFO_TITLE,
          SearchItemsResource.ITEMINFO_BYLINEINFO,
          SearchItemsResource.ITEMINFO_PRODUCTINFO,
          SearchItemsResource.OFFERS_LISTINGS_PRICE,
          SearchItemsResource.OFFERS_LISTINGS_DELIVERY_INFO_IS_PRIME_ELIGIBLE,
          SearchItemsResource.CUSTOMERREVIEWS_COUNT,
          SearchItemsResource.CUSTOMERREVIEWS_STARRATING,
        ],
        PartnerTag: this.partnerTag,
        PartnerType: PartnerType.Associates,
        Marketplace: this.marketplace,
      });

      const response = await this.api.getItems(request);
      
      if (!response.ItemsResult?.Items?.[0]) {
        return null;
      }

      const item = response.ItemsResult.Items[0];

      return {
        asin: item.ASIN!,
        title: item.ItemInfo?.Title?.DisplayValue || '',
        description: item.ItemInfo?.Title?.DisplayValue,
        price: item.Offers?.Listings?.[0]?.Price ? {
          amount: item.Offers.Listings[0].Price.Amount || 0,
          currency: item.Offers.Listings[0].Price.Currency || 'USD',
          formatted: item.Offers.Listings[0].Price.DisplayAmount || '',
        } : undefined,
        rating: item.CustomerReviews ? {
          stars: parseFloat(item.CustomerReviews.StarRating?.Value || '0'),
          count: parseInt(item.CustomerReviews.Count || '0', 10),
        } : undefined,
        imageUrl: item.Images?.Primary?.Large?.URL || '',
        productUrl: item.DetailPageURL || '',
        prime: item.Offers?.Listings?.[0]?.DeliveryInfo?.IsPrimeEligible || false,
      };

    } catch (error) {
      console.error('Error getting Amazon product details:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const amazonApi = new AmazonAPI();