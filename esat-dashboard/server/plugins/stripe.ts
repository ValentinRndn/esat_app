import { defineNitroPlugin } from 'nitropack/runtime/plugin'
import Stripe from 'stripe'

declare module 'nitropack' {
  interface NitroApp {
    stripe: Stripe
  }
}

export default defineNitroPlugin((nitroApp) => {
  const config = useRuntimeConfig()
  
  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: '2025-05-28.basil'
  })
  
  nitroApp.stripe = stripe
}) 