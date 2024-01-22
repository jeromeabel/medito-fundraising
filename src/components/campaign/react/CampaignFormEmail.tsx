import { type FormEvent, useState } from 'react';

export const CampaignFormEmail = () => {
  const [responseMessage, setResponseMessage] = useState('');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={submit} className='flex flex-col gap-4'>
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
