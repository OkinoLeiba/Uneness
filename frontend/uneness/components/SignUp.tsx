import React from 'react';
import { StyleContext, type StyleContextType } from './LayOut';
import { AuthContext } from '../services/authContextClass';
import brandLogo from '../src/assets/icons/icon-uneness2.svg';
import '../styles/signup.css';

/**
 * @typedef {Object} State
 * @description State object for managing user registration form inputs and error feedback.
 *
 * User Information
 * @property {string} email - The user's email address.
 * @property {string} first_name - The user's first name.
 * @property {string} last_name - The user's last name.
 *
 * Password Fields
 * @property {string} password - The user's chosen password.
 * @property {string} password2 - Confirmation entry for the password.
 *
 * Error Handling
 * @property {string} error - Error message to display in case of validation or submission failure.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

interface State {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password2: string;
    error: string;
}

// FOR DEBUG
//const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
export default class Login extends React.Component<object, State> {
  static contextType = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;


  state: State = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
    error: '',
  };
  
  // FOR PRODUCTIONS-maybe
  // Other Option same as DEBUG wih env.production
  login_url = window.location.origin + '/uneness/login';
    
  validate: boolean = false;

  // handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // this.validation();
    // if (this.validate) {
      // try {
        // const res = await fetch(DJANGO_BASE_URL+'user/signup/', {
          // method: 'POST',
          // headers: { 'Content-Type': 'application/json' },
          // body: JSON.stringify({
            // first_name: this.state.first_name,
            // last_name: this.state.last_name,
            // email: this.state.email,
            // password: this.state.password,
          // }),
          // credentials: 'include'
        // });
        //
        //
        // this.validate = false;
        // if (!res?.ok) {
          // if ((await res?.text()).includes('user_already_exists')) {
            //  throw new Error('User Already Exits');
          // }
          // throw new Error('Invalid credentials');
        // }
        // const data = await res?.json();
        //
        // console.log(data)
        // console.log(data.token)
        // console.log(res?.headers)
        // console.log(await res?.headers.getSetCookie())
        // console.log(await res?.headers.getSetCookie().find(t => t=='token'))
        // console.log(await res?.headers.get('set-cookie')); // undefined
        // console.log(document.cookie); // nope
        // document.cookie = `token=${res?.headers.getSetCookie()}; path=/; secure=false; httponly=false; samesite=None`;
        // localStorage.setItem('token', res?.headers.getSetCookie().find(t => t=='token'));
        // sessionStorage.setItem('token', res?.headers.getSetCookie().find(t => t=='token'));
        //
        // this.setState({ error: '' });
        //Redirect or update UI
        // if (res?.ok) window.location.href = '/homepage';
      // } catch (error) {
        // console.log(error)
        // this.setState({ error: error.message});
      // }
    // }
  // };
    
  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    this.validation();
    if (this.validate) {
      try {
        this.validate = false;
        const res = await this.context?.signup(this.state.email, this.state.first_name, this.state.last_name, this.state.password, this.state.password2)
        // console.log(res?.status) 
        // console.log(res?.data)
        // console.log(res?.headers)
        // console.log(res?.statusText)
        document.cookie = `token=${res?.data.token}; path=/; secure=true; httponly=true; samesite=Lax`;
        localStorage.setItem('token', res?.data.token);
        sessionStorage.setItem('token', res?.data.token);
        if (!(res?.status === 201)) {
          if (res?.data.user_already_exists) {
            throw new Error('User Already Exits');
          }
          throw new Error('Invalid credentials');
        }
        alert('Thank you, your account has been created.')
        if (res?.status === 201) window.location.href = '/homepage';
      } catch (error) {
        //@ts-expect-error error will have state 
        this.setState({ error: error.message });
      }
    }
  }
    validation = () => {
      if (this.state.password === this.state.password2) { this.validate = true; }
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
              minHeight: styles!.minHeight
            }}
            className={'signup-container'}
          >
            <div className={'signup-form-input'}>
              <img src={brandLogo} alt={'Brand Logo'} width={180} height={80} loading={'eager'} />
              <form onSubmit={this.handleSubmit}>
                <h2>Sign Up</h2>
                <input
                  type={'text'}
                  placeholder={'first name'}
                  value={this.state.first_name}
                  onChange={e => this.setState({ first_name: e.target.value })}
                />
                <input
                  type={'text'}
                  placeholder={'last name'}
                  value={this.state.last_name}
                  onChange={e => this.setState({ last_name: e.target.value })}
                />
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
                <input
                  type={'password'}
                  placeholder={'confirm password'}
                  value={this.state.password2}
                  onChange={e => this.setState({ password2: e.target.value })}
                />
                <button name={'signup-btn'} type={'submit'} className={'signup-btn-round'}>Sign Up</button>
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
