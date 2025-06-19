export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()
    const stripe = event.context.nitro.stripe
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${config.appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.appUrl}`,
    })

    return { url: session.url }
  } catch (error) {
    console.error('Erreur lors de la création de la session de paiement:', error)
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la création de la session de paiement'
    })
  }
}) 
