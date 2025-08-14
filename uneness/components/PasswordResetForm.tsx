import React, { Component } from 'react';

interface State {
  email: string;
  message: string ;
}

export class PasswordResetForm extends Component<object, State> {
  state: State = {
    email: '',
    message: '',
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('password/reset/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.state.email }),
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
          type="email"
          placeholder="Email"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <button type="submit">Send Reset Link</button>
        {this.state.message && <p>{this.state.message}</p>}
      </form>
    );
  }
}
