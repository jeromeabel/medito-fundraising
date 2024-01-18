import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(`${import.meta.env.STRIPE_PRIVATE_KEY}`);

export const GET: APIRoute = async ({ params }) => {
  const sessionId = params.id || '';

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  return new Response(
    JSON.stringify({
      status: session.status,
      amount: session.amount_total,
      customer_name: session.customer_details?.name,
      customer_email: session.customer_details?.email || 'test@example.com',
    }),
    {
      status: 200,
    }
  );
};
