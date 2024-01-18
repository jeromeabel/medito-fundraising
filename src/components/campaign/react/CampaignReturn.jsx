import { useEffect, useState } from 'react';

const CampaignReturn = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`/api/session/${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        setCustomerName(data.customer_name);
        setAmount(data.amount);
      });
  }, []);

  if (status === 'open') {
    return <p>OPEN</p>;
  }

  if (status === 'complete') {
    return (
      <section id='success' className='prose prose-lg pt-8'>
        <p>
          Thank you <strong>{customerName}</strong> for your {amount}$!
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
