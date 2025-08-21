import React from 'react';

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

interface State {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
  message: string;
}

export class PasswordChangeForm extends React.Component<object, State> {
  state: State = {
    oldPassword: '',
    newPassword1: '',
    newPassword2: '',
    message: '',
  };
  // TODO: replace with services in services folder, handleSubmit will be wrapper method
  // TODO: validation on the frontend* or backend, pass one or two new_password??
  // TODO: get token form local storage or cookie
  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('password/change/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          old_password: this.state.oldPassword,
          new_password1: this.state.newPassword1,
          new_password2: this.state.newPassword2,
        }),
      });
      if (!res.ok) throw new Error('Password change failed');
      this.setState({ message: 'Password changed successfully!' });
    } catch (error) {
      this.setState({ message: error.message });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Change Password</h2>
        <input
          type={'password'}
          placeholder={'Old Password'}
          value={this.state.oldPassword}
          onChange={e => this.setState({ oldPassword: e.target.value })}
        />
        <input
          type={'password'}
          placeholder={'New Password'}
          value={this.state.newPassword1}
          onChange={e => this.setState({ newPassword1: e.target.value })}
        />
        <input
          type={'password'}
          placeholder={'Confirm New Password'}
          value={this.state.newPassword2}
          onChange={e => this.setState({ newPassword2: e.target.value })}
        />
        <button name={'password-btn'} type={'submit'}>Change Password</button>
        {this.state.message && <p>{this.state.message}</p>}
      </form>
    );
  }
}
