import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import { StyleContext, type StyleContextType } from './LayOut';
import brandLogo from '../src/assets/icons/icon-uneness2.svg';
import '../styles/login.css';
import { useAuth } from '../services/useAuth';




/**
 * @typedef {Object} State
 * @description State object for a login/authentication form.
 *
 * User Credentials
 * @property {string} email - The user's email address for auth
 * @property {string} password - The user's password entry.
 *
 * Error Handling
 * @property {string} [error] - Optional error message to displ
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */


// interface State {
  // email: string;
  // password: string;
  // error?: string;
// }


// FOR DEBUG
//const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

const LogIn: React.FC = (): React.ReactNode | null => {
  const context = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<TypeError>();
  
  // FOR PRODUCTIONS-maybe
  // Other Option same as DEBUG wih env.production
  // const login_url: string = window.location.origin + '/uneness/login';

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();
      try {
        const res: AxiosResponse | undefined = await context?.login(email, password);
        document.cookie = `token=${res?.data.token}; path=/; secure=true; httponly=true; samesite=Lax`;
        localStorage.setItem('token', res?.data.token);
        sessionStorage.setItem('token', res?.data.token);

        if (!(res?.status === 200)) {
          throw new Error('Invalid credentials');
        }
        if (res?.status === 200) window.location.href = '/homepage';
      }
      catch (error) {
        setError(error as TypeError);
      }
    }
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
                  <form onSubmit={handleSubmit}>
                    <h2>Log In</h2>
                    <input
                      type={'text'}
                      placeholder={'email'}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <input
                      type={'password'}
                      placeholder={'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <button type={'submit'} className={'login-btn-round'}>Log In</button>
                    {error && <p>{error.message}</p>}
                  </form>
                </div>
              </div>)}
          </StyleContext.Consumer>
        );
}

export default LogIn;