import React, { Component } from 'react';
import { StyleContext, type StyleContextType } from './LayOut';
import brandLogo from '../src/assets/icons/icon-uneness2.svg';
import '../styles/signup.css';

interface State {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    password2: string;
    error: string;
}

// FOR DEBUG
const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
export default class Login extends Component<State> {
  // constructor(props: Props) {
    // super(props);
    // this.state = {
      // email: props.email || '',
      // username: props.username || '',
      // password: props.password || '',
      // password2: props.password2 || '',
      // error: props.error || '',
    // };
  // }

  state: State = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    password2: '',
    error: '',
  };
  
    // FOR PRODUCTIONS-maybe
// Other Option same as DEBUG wih env.production
login_url = window.location.origin + "/uneness/login";
    
    validate: boolean = false;

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    this.validation();
    if (this.validate) {
      console.log(this.validate)
      try {
        const res = await fetch(DJANGO_BASE_URL+'user/signup/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
          }),
        });
        if (!res.ok) throw new Error('Invalid credentials');
        const data = await res.json();
        console.log(data)
        localStorage.setItem('token', data.auth_token);
        this.setState({ error: '' });
        this.validate = false;
        // Redirect or update UI
      } catch (error) {
        this.setState({ error: error});
      }
    }
  };
    
    validation = () => {
      if (this.state.password === this.state.password2) { this.validate = true; }
    }

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
            className={'signup-container'}
          >
            <div className={'signup-form-input'}>
              <img src={brandLogo} alt="Brand Logo" width={180} height={80} loading="eager" />
              <form onSubmit={this.handleSubmit}>
                <h2>Sign Up</h2>
                <input
                  type="text"
                  placeholder="first name "
                  value={this.state.firstname}
                  onChange={e => this.setState({ firstname: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="last name"
                  value={this.state.lastname}
                  onChange={e => this.setState({ lastname: e.target.value })}
                />
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
                <input
                  type="password"
                  placeholder="confirm password"
                  value={this.state.password2}
                  onChange={e => this.setState({ password2: e.target.value })}
                />
                <button type="submit">Sign Up</button>
                {this.validate ? <p>Password does not match!</p> : ''}
                {this.state.error && <p>{this.state.error}</p>}
              </form>
            </div>
          </div>)
        }
      </StyleContext.Consumer>
    );
  }
}
