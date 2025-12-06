declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HUGGINGFACE_API_KEY: string;
      NEXT_PUBLIC_YOUTUBE_API_KEYS?: string; // Comma-separated list of YouTube API keys
      AMAZON_SPP_ACCESS_KEY?: string;
      AMAZON_SPP_SECRET_KEY?: string;
      AMAZON_SPP_REFRESH_TOKEN?: string;
      AMAZON_SPP_CLIENT_ID?: string;
      AMAZON_ASSOCIATE_TAG?: string;
      AMAZON_MARKETPLACE_ID?: string;
      // Add other environment variables here
    }
  }
}