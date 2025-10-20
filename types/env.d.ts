declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HUGGINGFACE_API_KEY: string;
      // Add other environment variables here
    }
  }
}