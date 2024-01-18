import { useState, useEffect } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.PUBLIC_STRIPE_KEY);

const CampaignForm = () => {
  const [clientSecret, setClientSecret] = useState('');
  const originURL = window.location.origin;

  useEffect(() => {
    fetch(`${originURL}/api/campaign/1/donate`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div id='checkout' className='bg-gray-100 py-8 border-t'>
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};

export default CampaignForm;
