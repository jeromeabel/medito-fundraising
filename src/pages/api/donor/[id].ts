import type { APIRoute } from 'astro';
import { supabase } from '@config/supabase';

/* Request
{
  "name": "Marsch Bell",
  "amount": 90,
  "email": "march@moc.com"
}
*/
export const POST: APIRoute = async ({ request, params }) => {
  if (request.headers.get('Content-Type') === 'application/json') {
    const body = await request.json();

    const { count } = await supabase
      .from('donors')
      .select('*', { count: 'exact' });

    const fullName = body.name.split(' ') || 'James Paul'.split(' ');
    let nbDonors = 0;
    if (count) nbDonors = count + 1;

    const newDonor = {
      campaign_id: Number(params.id),
      first_name: fullName[0],
      last_name: fullName[1],
      amount: body.amount,
      created_at: new Date().toISOString(),
      email: body.email,
      id: nbDonors,
    };

    const { data, error } = await supabase
      .from('donors')
      .insert(newDonor)
      .select();

    if (error) {
      return new Response(null, {
        status: 404,
        statusText: 'Not found',
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(null, {
    status: 404,
    statusText: 'Not found',
  });
};
