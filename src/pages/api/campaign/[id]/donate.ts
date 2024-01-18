import type { APIRoute, APIContext } from 'astro';

import Stripe from 'stripe';

const stripe = new Stripe(`${import.meta.env.STRIPE_PRIVATE_KEY}`);

export const POST: APIRoute = async ({ params, request }: APIContext) => {
  const requestURL = new URL(request.url);
  const host = requestURL.host;
  const protocol = requestURL.protocol;
  const session = await stripe.checkout.sessions.create({
    submit_type: 'donate',
    ui_mode: 'embedded',
    line_items: [
      {
        price: 'price_1OZuQmGIvLxlFj7rTX0ekgbD',
        quantity: 1,
      },
    ],
    payment_method_types: ['card'],
    mode: 'payment',
    return_url: `${protocol}//${host}/thanks?session_id={CHECKOUT_SESSION_ID}`,
  });

  return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
    status: 200,
  });
};