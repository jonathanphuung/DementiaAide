const LOCAL_SITE_URL = 'http://localhost:3000'

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '')
  }

  const vercelUrl = process.env.VERCEL_URL?.trim()

  if (vercelUrl) {
    const normalizedUrl = vercelUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    return `https://${normalizedUrl}`
  }

  return LOCAL_SITE_URL
}