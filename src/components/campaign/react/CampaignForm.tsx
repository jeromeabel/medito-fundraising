import { useState, useEffect } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(`${import.meta.env.PUBLIC_STRIPE_KEY}`);

type TypeCampaignForm = {
  id: number;
};
const CampaignForm = ({ id }: TypeCampaignForm) => {
  const [clientSecret, setClientSecret] = useState('');
  const originURL = window.location.origin;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${originURL}/api/campaign/${id}/donate`, {
          method: 'POST',
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error while retrieving data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id='checkout' className='bg-gray-100 h-[760px]'>
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
