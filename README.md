# DementiaAide

DementiaAide is a caregiver support platform for finding practical guidance, trusted resources, and relevant products for common dementia-care situations.

[View the live site](https://dementia-aide.vercel.app/)

## How the care assistant works

A caregiver can describe a situation in everyday language, such as “wandering at night” or “refusing to eat.” The application then:

1. Normalizes the query and expands common caregiving terms with related keywords.
2. Classifies the request into a care category and a specific scenario.
3. Returns structured guidance, practical next steps, and related topics.
4. Ranks curated resources using the query, category, and scenario match.
5. Adds a prominent safety notice when the query suggests an urgent medical or safety risk.

The response engine is deterministic and runs from local TypeScript data. It does not send caregiver questions to a generative AI service.

## Engineering highlights

- Built scenario-specific guidance for wandering, bathing resistance, aggression, sundowning, medication concerns, caregiver burnout, and other common situations.
- Added weighted resource ranking and synonym expansion so different phrases can resolve to the same care topic.
- Mapped urgent phrases to action-focused notices and sources from organizations including the CDC, National Institute on Aging, and Alzheimer's Association.
- Created reusable resource, product, search, cart, and checkout components with responsive and accessible UI patterns.
- Integrated Shopify's Storefront GraphQL API to create carts from mapped product variants and continue into Shop Pay.
- Added optional Stripe and shipping service routes for the commerce workflow.

## Stack

Next.js, React, TypeScript, Tailwind CSS, Radix UI, Shopify Storefront API, Stripe, and Vercel.

## Current focus

The caregiver guidance and resource search are the main product experience. Commerce features are secondary, and video resources remain disabled until the content has been reviewed and approved.
