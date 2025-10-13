import React, {useState} from 'react';
import '../styles/password.css';

/**
 * @typedef {Object} Props
 * @description Functionality to change user's password, props required for securely resetting a user's password.
 *
 * Authentication
 * @property {string} uid - Unique identifier for the user, typically provided by the backend.
 * @property {string} token - Security token used to validate the password reset request.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

/**
 * @typedef {Object} State
 * @description State object for managing password reset form inputs and feedback.
 *
 * Password Fields
 * @property {string} newPassword1 - First entry of the new password.
 * @property {string} newPassword2 - Second entry of the new password for confirmation.
 *
 * Feedback Message
 * @property {string} message - Message displayed to the user (e.g., success or error feedback).
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

interface Props {
  uid: string;
  token: string;
}


const PasswordResetConfirm: React.FC<Props> = (props) => {
    const [newPassword1, setNewPassword1] = useState<string>('');
    const [newPassword2, setNewPassword2] = useState<string>('');
    const [message, setMessage] = useState<TypeError | string>();

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        try {
        const res = await fetch(`password/reset/confirm/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${props.token}` },
            body: JSON.stringify({
            uid: props.uid,
            // token: props.token,
            new_password1: newPassword1,
            new_password2: newPassword2,
            }),
        });
        if (!res.ok) throw new Error('Reset failed');
            setMessage('Password has been reset!' );
        } catch (error) {
            setMessage(error as TypeError);
        }
    };
 
    return (
      <form onSubmit={handleSubmit}>
        <h2>Set New Password</h2>
        <input
          type={'password'}
          placeholder={'New Password'}
          value={newPassword1}
          onChange={e => setNewPassword1(e.target.value)}
        />
        <input
          type={'password'}
          placeholder={'Confirm New Password'}
          value={newPassword2}
          onChange={e => setNewPassword2(e.target.value)}
        />
        <button name={'password-change--btn'} type={'submit'}>Reset Password</button>
        {message && <p>{message.toString()}</p>}
      </form>
    );
}

export default PasswordResetConfirm;