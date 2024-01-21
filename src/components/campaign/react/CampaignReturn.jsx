import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useReward } from 'react-rewards';

const CampaignReturn = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState(0);

  const { reward } = useReward('rewardId', 'confetti', {
    elementCount: 200,
    lifetime: 500,
    elementSize: 10,
    startVelocity: 20,
    angle: 70,
    spread: 150,
  });

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');
    const originURL = window.location.origin;

    const fetchData = async () => {
      try {
        const response = await fetch(`${originURL}/api/session/${sessionId}`);
        const data = await response.json();
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        setCustomerName(data.customer_name);
        setAmount(Math.floor(data.amount / 100));
      } catch (error) {
        console.error('Error while retrieving data:', error);
      }
    };

    fetchData();
  }, []);

  useLayoutEffect(() => {
    if (status === 'complete') {
      reward();
    }
  }, [status, reward]);

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
