import React from 'react';
import '../styles/password.css';

interface State {
  first_name: string;
  last_name: string;
  email: string;
  message: string ;
}

export class PasswordResetForm extends React.Component<object, State> {
  state: State = {
    first_name: '',
    last_name: '',
    email: '',
    message: '',
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('password/reset/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: this.state.first_name,
          lastName: this.state.last_name,
          email: this.state.email
        }),
      });
      if (!res.ok) throw new Error('Reset failed');
      this.setState({ message: 'Reset email sent!' });
    } catch (error) {
      this.setState({ message: error.message });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Reset Password</h2>
        <input
          type={'text'}
          placeholder={'First Name'}
          value={this.state.first_name}
          onChange={e => this.setState({ first_name: e.target.value })}
        />
        <input
          type={'text'}
          placeholder={'Last Name'}
          value={this.state.last_name}
          onChange={e => this.setState({ last_name: e.target.value})}
        />
        <input
          type={'email'}
          placeholder={'email'}
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <button name={'password-reset-btn'} type={'submit'}>Send Reset Link</button>
        {this.state.message && <p>{this.state.message}</p>}
      </form>
    );
  }
}
