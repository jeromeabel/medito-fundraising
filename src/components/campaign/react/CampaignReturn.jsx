import { useState, useEffect, useLayoutEffect } from 'react';
import { useReward } from 'react-rewards';

const CampaignReturn = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState(0);
  const [campaignId, setCampaignId] = useState(0);

  const { reward } = useReward('rewardId', 'confetti', {
    elementCount: 200,
    lifetime: 500,
    elementSize: 10,
    startVelocity: 20,
    angle: 70,
    spread: 150,
  });

  const insertNewDonor = async () => {
    try {
      const originURL = window.location.origin;
      const response = await fetch(`${originURL}/api/donor/${campaignId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: customerName,
          amount: amount,
          email: customerEmail,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // const data = await response.json();
    } catch (error) {
      console.error('Error while inserting a New Donor data:', error);
    }
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');
    const campaignId = urlParams.get('campaign_id');
    const originURL = window.location.origin;

    const fetchData = async () => {
      try {
        const response = await fetch(`${originURL}/api/session/${sessionId}`);
        const data = await response.json();
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        setCustomerName(data.customer_name);
        setAmount(Math.floor(data.amount / 100));
        setCampaignId(campaignId);
      } catch (error) {
        console.error(
          'Error while retrieving data from Stripe Session:',
          error
        );
      }
    };

    fetchData();
  }, []);

  useLayoutEffect(() => {
    if (status === 'complete') {
      reward();
      insertNewDonor();
    }
  }, [status]);

  if (status === 'open') {
    return <p>OPEN</p>;
  }

  if (status === 'complete') {
    return (
      <section className='prose prose-lg pt-8'>
        <p>
          Thank you <strong>{customerName}</strong> for your {amount}$!{' '}
          <span id='rewardId' />
        </p>
        <p>
          We appreciate your support. A confirmation email will be sent to{' '}
          <strong>{customerEmail}</strong>. If you have any questions, please
          email at <a href='mailto:orders@example.com'>orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
};

export default CampaignReturn;
