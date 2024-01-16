import type { APIRoute } from 'astro';
import { supabase } from '@config/supabase';

export const GET: APIRoute = async () => {
  const { data } = await supabase.from('campaigns').select('*');

  if (!data) {
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
};
