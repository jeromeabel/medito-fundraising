import { useState } from 'react';

export const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [textarea, setTextarea] = useState('');

  type EmailBodyType = {
    from: string;
    to: string;
    reply_to: string;
    subject: string;
    html: string;
    text: string;
  };

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
    emailBody.html = `<p>Message from: <strong>${name}</strong></p><p>Reply to:${email}</p><p>${textarea}</p>`;

    // const newEmail = {
    //   from: 'Acme <onboarding@resend.dev>',
    //   to: ['dev@jeromeabel.net'],
    //   reply_to: email,
    //   subject: `[Medito Fundraising] From ${name} - ${email}`,
    //   html: `<strong>From ${name}</strong><p>${textarea}</p>`,
    //   text: textarea,
    // };

    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailBody),
    });

    console.log(res);
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
    <form onSubmit={onSubmitHandler}>
      <div>
        <label htmlFor='name'>Name</label>
      </div>
      <div>
        <input
          id='name'
          onChange={(e) => inputChangeHandler(setName, e)}
          type='text'
        />
      </div>
      <div>
        <label htmlFor='email'>Email</label>
      </div>
      <div>
        <input
          id='email'
          onChange={(e) => inputChangeHandler(setEmail, e)}
          type='email'
        />
      </div>
      <div>
        <textarea
          id='message'
          value={textarea}
          onChange={handleChangeTextArea}
        />
      </div>
      <input type='submit' />
    </form>
  );
};
