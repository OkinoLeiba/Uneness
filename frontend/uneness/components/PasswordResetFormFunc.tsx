import React, { useState } from 'react';
import '../styles/password.css';




const PasswordResetForm: React.FC = (): React.ReactNode | null => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<TypeError | string>();
  
    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();
      try {
        const res = await fetch('password/reset/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email
          }),
        });
        if (!res.ok) throw new Error('Reset failed');
          setMessage('Reset email sent!');
      } catch (error) {
          setMessage(error as TypeError);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <input
          type={'text'}
          placeholder={'First Name'}
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          type={'text'}
          placeholder={'Last Name'}
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <input
          type={'email'}
          placeholder={'email'}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button name={'password-reset-btn'} type={'submit'}>Send Reset Link</button>
        {message && <p>{message.toString()}</p>}
      </form>
    );
}

export default PasswordResetForm;