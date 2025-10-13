import React, {useState} from 'react';
import { StyleContext, type StyleContextType } from './LayOut';
import { useAuth } from '../services/useAuth';
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

// interface State {
    // email: string;
    // first_name: string;
    // last_name: string;
    // password: string;
    // password2: string;
    // error: string;
// }


const SignUp: React.FC = (): React.ReactNode | null => {
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [error, setError] = useState<TypeError | string>('');
    const [validate, setValidate] = useState<boolean>(false);

    // FOR DEBUG
    //const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    
    // FOR PRODUCTIONS-maybe
    // Other Option same as DEBUG wih env.production
    // const login_url = window.location.origin + '/uneness/login';

    const context = useAuth();

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
       e.preventDefault();
       validation();
       if (validate) {
         try {
           setValidate(false);
           const res = await context?.signup(email, firstName, lastName, password, password2)
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
           setError(error.message);
         }
       }
     }
    const validation = () => {
      if (password === password2) { setValidate(true) }
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
              minHeight: styles!.minHeight
            }}
            className={'signup-container'}
          >
            <div className={'signup-form-input'}>
              <img src={brandLogo} alt={'Brand Logo'} width={180} height={80} loading={'eager'} />
              <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <input
                  type={'text'}
                  placeholder={'first name'}
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
                <input
                  type={'text'}
                  placeholder={'last name'}
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
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
                <input
                  type={'password'}
                  placeholder={'confirm password'}
                  value={password2}
                  onChange={e => setPassword2(e.target.value)}
                />
                <button name={'signup-btn'} type={'submit'} className={'signup-btn-round'}>Sign Up</button>
                {validate ? <p>Password does not match!</p> : ''}
                 {error && <p>{error.toString()}</p>}
              </form>
            </div>
          </div>)
        }
      </StyleContext.Consumer>
    );
}

export default SignUp;