import React from 'react';
import { StyleContext, type StyleContextType } from './LayOut';
import { AuthContext } from '../services/authContextClass';
import brandLogo from '../src/assets/icons/icon-uneness2.svg';
import '../styles/login.css';

/**
 * @typedef {Object} State
 * @description State object for a login/authentication form.
 *
 * User Credentials
 * @property {string} email - The user's email address for authentication.
 * @property {string} password - The user's password entry.
 *
 * Error Handling
 * @property {string} [error] - Optional error message to display on login failure.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */


interface State {
  email: string;
  password: string;
  error?: string;
}


// FOR DEBUG
//const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

export default class Login extends React.Component<object, State> {
  static contextType = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;

  // FOR PRODUCTIONS-maybe
  // Other Option same as DEBUG wih env.production
  login_url = window.location.origin + '/uneness/login';
  

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
      const res = await this.context?.login(this.state.email, this.state.password);
      document.cookie = `token=${res?.data.token}; path=/; secure=true; httponly=true; samesite=Lax`;
      localStorage.setItem('token', res?.data.token);
      sessionStorage.setItem('token', res?.data.token);
      // console.log(res.status)
      // console.log(res.data)
      // console.log(res.headers)
      // console.log(res.statusText)
      if (!(res?.status === 200)) {
        throw new Error('Invalid credentials');
      }
      if (res?.status === 200) window.location.href = '/homepage';
    } catch (error) {
      // @ts-expect-error error will have state
      this.setState({error: error.message})
    }
  }

  

  render() {
    return (
      <StyleContext.Consumer>
        {(styles: StyleContextType | null) => (
          <div
            style={{
              backgroundImage: styles!.backgroundImage,
              backgroundPosition: styles!.backgroundPosition,
              backgroundRepeat: styles!.backgroundRepeat,
              backgroundSize: styles!.backgroundSize,
              width: styles!.width,
              height: styles!.height,
              minHeight: styles!.minHeight,
              padding: styles!.padding
            }}
            className={'login-container'}
          >
            <div className={'login-form-input'}>
              <img src={brandLogo} alt={'Brand Logo'} width={180} height={80} loading={'eager'} />
              <form onSubmit={this.handleSubmit}>
                <h2>Log In</h2>
                <input
                  type={'text'}
                  placeholder={'email'}
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <input
                  type={'password'}
                  placeholder={'password'}
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <button type={'submit'} className={'login-btn-round'}>Log In</button>
                {this.state.error && <p>{this.state.error}</p>}
              </form>
            </div>
          </div>)}
      </StyleContext.Consumer>
    );
  }
}
