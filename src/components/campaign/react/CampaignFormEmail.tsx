import { useState } from 'react';

type EmailBodyType = {
  from: string;
  to: string;
  reply_to: string;
  subject: string;
  html: string;
  text: string;
};

export const CampaignFormEmail = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [textarea, setTextarea] = useState('');

  const emailBody: EmailBodyType = {
    from: 'Acme <onboarding@resend.dev>',
    to: 'dev@jeromeabel.net',
    reply_to: '',
    subject: '[Medito Fundraising]',
    html: '',
    text: 'Blank text',
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    emailBody.reply_to = email;
    emailBody.subject = `[Medito Fundraising] From ${name}`;
    emailBody.html = `<p>Message from: <strong>${name}</strong></p><p>Reply to:${email}</p><p>${textarea}</p>`;

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailBody),
    });

    /* Handle messages from API?
    const data = await response.json();
    if (data.message) setResponseMessage(data.message);
    }
    */

    if (response.ok) {
      setResponseMessage('Your message was sent successfully');
      setName('');
      setEmail('');
      setTextarea('');
      event.currentTarget.reset();
    } else
      setResponseMessage(
        'Sorry, an error occured when sending the message. Please try again.'
      );
  };

  const inputChangeHandler = (
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFunction(event.target.value);
  };

  const handleChangeTextArea = (
    event: React.FormEvent<HTMLTextAreaElement>
  ) => {
    setTextarea(event.currentTarget.value);
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <div className='flex-1 flex flex-col gap-1'>
          <label htmlFor='name' className=' text-gray-700 text-sm font-bold'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='px-3 py-2 border rounded-md'
            required
            value={name}
            onChange={(e) => inputChangeHandler(setName, e)}
          />
        </div>
        <div className='flex-1 flex flex-col gap-1'>
          <label htmlFor='email' className=' text-gray-700 text-sm font-bold'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='px-3 py-2 border rounded-md'
            required
            value={email}
            onChange={(e) => inputChangeHandler(setEmail, e)}
          />
        </div>
      </div>

      <div className=''>
        <label
          htmlFor='message'
          className='block text-gray-700 text-sm font-bold mb-2'
        >
          Message
        </label>
        <textarea
          id='message'
          name='message'
          rows={4}
          className='w-full px-3 py-2 border rounded-md'
          value={textarea}
          onChange={handleChangeTextArea}
        ></textarea>
      </div>
      <button
        type='submit'
        className='bg-black text-white px-4 py-2 rounded-md hover:bg-green-500 max-w-fit'
      >
        Send a message
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
};
