import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {

  const send = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['dev@jeromeabel.net'],
    subject: 'Hello World',
    html: '<strong>It works!</strong>',
  });

  
  return new Response(
    JSON.stringify({
      message: 'Success!',
    }),
    { status: 200 }
  );

};

