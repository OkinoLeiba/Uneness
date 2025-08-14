import React, { Component } from 'react';

interface State {
    email: string;
    username: string;
    password: string;
    password2: string;
    error: string;
}

export default class Login extends Component<object, State> {
    state: State = {
        email: '',
        username: '',
        password: '',
        password2: '',
        error: '',
    };
    
    validate: boolean = false;

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('user/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('token', data.access);
      this.setState({ error: '' });
      // Redirect or update UI
    } catch (error) {
      this.setState({ error: error.message });
    }
  };
    
    validation = () => {
        if (this.state.password === this.state.password2) this.validate = true;
    }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={e => this.setState({ username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={this.state.password2}
          onChange={e => this.setState({ password2: e.target.value })}
        />
        {this.validate ? <p>Password does not match!</p> : ''}
        <button type="submit">Sign Up</button>
        {this.state.error && <p>{this.state.error}</p>}
      </form>
    );
  }
}
