import type { APIRoute } from 'astro';
import { supabase } from '@config/supabase';

export const GET: APIRoute = async ({ params }) => {
  const campaignId = params.id;

  const { data } = await supabase
    .from('donors')
    .select('*')
    .eq('campaign_id', Number(campaignId))
    .order('created_at', { ascending: false });

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
