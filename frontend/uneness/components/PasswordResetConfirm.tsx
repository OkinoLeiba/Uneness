import React from 'react';

/**
 * @typedef {Object} Props
 * @description Props required for securely resetting a user's password.
 *
 * Authentication
 * @property {string} uid - Unique identifier for the user, typically provided by the backend.
 * @property {string} token - Security token used to validate the password reset request.
 *
 * @author Okino
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

interface State {
  newPassword1: string;
  newPassword2: string;
  message: string;
}

export class PasswordResetConfirm extends React.Component<Props, State> {
  state: State = {
    newPassword1: '',
    newPassword2: '',
    message: '',
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`password/reset/confirm/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: this.props.uid,
          token: this.props.token,
          new_password1: this.state.newPassword1,
          new_password2: this.state.newPassword2,
        }),
      });
      if (!res.ok) throw new Error('Reset failed');
      this.setState({ message: 'Password has been reset!' });
    } catch (error) {
      this.setState({ message: error.message });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Set New Password</h2>
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
        <button name={'password-change--btn'} type={'submit'}>Reset Password</button>
        {this.state.message && <p>{this.state.message}</p>}
      </form>
    );
  }
}
