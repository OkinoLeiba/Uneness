import React, { Component } from 'react';
import { StyleContext, type StyleContextType } from './LayOut';
import brandLogo from '../src/assets/icons/icon-uneness2.svg';
import '../styles/login.css';


interface State {
  email: string;
  password: string;
  message?: string;
}

interface Props {
  styleContext: StyleContextType;
}

// FOR DEBUG
const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

export default class Login extends Component<Props, State> {
  // FOR PRODUCTIONS-maybe
  // Other Option same as DEBUG wih env.production
  login_url = window.location.origin + "/uneness/login";
  
  state: State = {
    email: '',
    password: '',
    message: '',
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(DJANGO_BASE_URL+'user/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('token', data.access);
      this.setState({ message: '' });
        // Redirect or update UI??
        // TODO: manage on the backend???
    } catch (error) {
      this.setState({ message: error.message});
    }
  };

  

  render() {
    return (
      <StyleContext.Consumer>
        {(styles: StyleContextType) => (
          <div
            style={{
              backgroundImage: styles.backgroundImage,
              backgroundPosition: styles.backgroundPosition,
              backgroundRepeat: styles.backgroundRepeat,
              backgroundSize: styles.backgroundSize,
              width: styles.width,
              height: styles.height,
              minHeight: styles.minHeight

              
            }}
            className={'login-container'}
          >
            <div className={'login-input'}>
              <img src={brandLogo} alt="Brand Logo" width={180} height={80} loading="eager" />
              <form onSubmit={this.handleSubmit}>
                <h2>Login</h2>
                <input
                  type="text"
                  placeholder="email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <button type="submit" className={'login-button-round'}>Log in</button>
                {this.state.message && <p>{this.state.message}</p>}
              </form>
            </div>
          </div>)
        }
      </StyleContext.Consumer>
    );
  }
}
