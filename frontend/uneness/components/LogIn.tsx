import React, { Component } from 'react';
import { StyleContext, type StyleContextType } from './LayOut';
import brandLogo from '../src/assets/icons/icon-uneness2.svg';
import '../styles/login.css';


interface Props {
  email: string;
  password: string;
  error?: string;

  styleContext: StyleContextType;
}


// FOR DEBUG
const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

export default class Login extends Component<Props> {
  // FOR PRODUCTIONS-maybe
  // Other Option same as DEBUG wih env.production
  login_url = window.location.origin + "/uneness/login";
  
  constructor(props: Props) {
    super(props);
    this.state = {
      email: props.email || '',
      password: props.password ||  '',
      error: props.error || '',

      styleContext: props.styleContext
    };
  }

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(DJANGO_BASE_URL+'user/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.props.email,
          password: this.props.password,
        }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      document.cookie = `token=${res.headers.getSetCookie()}; path=/; secure=false; httponly=true; samesite=Lax`;
      localStorage.setItem('token', res.headers.getSetCookie().find(t => t=='token'));
      sessionStorage.setItem('token', res.headers.getSetCookie().find(t => t=='token')); 
      this.setState({ message: '' });
        // Redirect or update UI??
        // TODO: manage on the backend???
    } catch (error) {
      this.setState({ error: error});
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
            <div className={'login-form-input'}>
              <img src={brandLogo} alt="Brand Logo" width={180} height={80} loading="eager" />
              <form onSubmit={this.handleSubmit}>
                <h2>Log In</h2>
                <input
                  type="text"
                  placeholder="email"
                  value={this.props.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="password"
                  value={this.props.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <button type="submit" className={'login-btn-round'}>Log in</button>
                {this.props.message && <p>{this.props.message}</p>}
              </form>
            </div>
          </div>)
        }
      </StyleContext.Consumer>
    );
  }
}
