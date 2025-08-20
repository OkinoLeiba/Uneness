import React from 'react';

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
