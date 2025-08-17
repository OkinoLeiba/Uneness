import React, { Component } from 'react';
import { StyleContext, type StyleContextType } from './LayOut';
import { AuthContext } from '../services/authContextClass';
import brandLogo from '../src/assets/icons/icon-uneness2.svg';
import '../styles/login.css';


interface State {
  email: string;
  password: string;
  error?: string;
}


// FOR DEBUG
const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

export default class Login extends Component<State> {
  static context = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;

  // FOR PRODUCTIONS-maybe
  // Other Option same as DEBUG wih env.production
  login_url = window.location.origin + "/uneness/login";
  

  state: State = {
      email: '',
      password: '',
      error: ''
  };
  

  // handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // try {
      // const res = await fetch(DJANGO_BASE_URL+'user/login/', {
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({
          // email: this.state.email,
          // password: this.state.password,
        // }),
        // credentials: 'include',
      // });
      // if (!res.ok) throw new Error('Invalid credentials');
      // const data = await res.json();
      // document.cookie = `token=${res.headers.getSetCookie()}; path=/; secure=false; httponly=false; samesite=None`;
      // localStorage.setItem('token', res.headers.getSetCookie().find(t => t=='token'));
      // sessionStorage.setItem('token', res.headers.getSetCookie().find(t => t=='token'));
      // this.setState({ message: '' });
      //Redirect or update UI??
      // if (res.ok) window.location.href = '/homepage';
    // } catch (error) {
      // this.setState({ error: error});
    // }
  // };
  
  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const {email, password} = this.state;
    try {
      //@ts-expect-errors parameters exists and arguments are passed
      await this.context.login(email=this.state.email, password=this.state.password)
    } catch (error) {
      this.setState({error: error})
    }
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
            className={'login-container'}
          >
            <div className={'login-form-input'}>
              <img src={brandLogo} alt="Brand Logo" width={180} height={80} loading="eager" />
              <form onSubmit={this.handleSubmit}>
                <h2>Log In</h2>
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
                <button type="submit" className={'login-btn-round'}>Log in</button>
                {this.state.error && <p>{this.state.error}</p>}
              </form>
            </div>
          </div>)
        }
      </StyleContext.Consumer>
    );
  }
}
