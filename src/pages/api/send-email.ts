
import type { APIRoute } from 'astro';

/*
const testEmail = {
      from: "Acme <onboarding@resend.dev>",
      to: ["dev@jeromeabel.net"],
      subject: "BONJOUR MAN - 9",
      html: "<strong>it works!</strong>"
    }
*/

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { to, from, html, subject, text, reply_to } = body;

  if (!to || !from || !html || !subject || !text) {
    return new Response(null, {
      status: 404,
      statusText: 'Did not provide the right data',
    });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({ to, from, html, subject, text, reply_to }),    
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};