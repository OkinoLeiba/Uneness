import React, { useState } from 'react';
import '../styles/password.css';

/**
 * @typedef {Object} State
 * @description State object for managing password change functionality in a user interface.
 *
 * Password Fields
 * @property {string} oldPassword - The user's current password.
 * @property {string} newPassword1 - The first entry of the new password.
 * @property {string} newPassword2 - The second entry of the new password for confirmation.
 *
 * Feedback Message
 * @property {string} message - Message displayed to the user (e.g., success or error feedback).
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */


const PasswordChangeForm: React.FC = (): React.ReactNode | null => {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword1, setNewPassword1] = useState<string>('');
    const [newPassword2, setNewPassword2] = useState<string>('');
    const [message, setMessage] = useState<TypeError | string>();

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        try {
          const res = await fetch('password/change/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              old_password: oldPassword,
              new_password1: newPassword1,
              new_password2: newPassword2,
            }),
          });
          if (!res.ok) throw new Error('Password change failed');
            setMessage('Password changed successfully!');
        } catch (error) {
            setMessage(error as TypeError);
        }
    }

    return (
      <form onSubmit={handleSubmit}>
        <h2>Change Password</h2>
        <input
          type={'password'}
          placeholder={'Old Password'}
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />
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
        <button name={'password-btn'} type={'submit'}>Change Password</button>
        {message && <p>{typeof message == "object" ? message.message : ''}</p>}
      </form>
    );
}

export default PasswordChangeForm;