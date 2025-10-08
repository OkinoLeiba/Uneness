import React, { useState, useEffect, useRef } from 'react';
import { AuthContext }  from '../services/authContextFunc';
import { Link } from 'react-router-dom';
// import { AuthContext } from '../services/authContextClass';
import { useAuth } from '../services/useAuth';
import brandLogo from '../src/assets/icons/icon-uneness2.svg';
import { RiLogoutCircleFill } from 'react-icons/ri';
import Cookies from 'js-cookie';
import NavDropDown from './NavDropDown';
import '../styles/navbar.css';

// import Container ../styles/navbar.cssp/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { getCurrentUser } from '../services/authServices';

/**
 * @typedef {Object} State
 * @description Represents the state of a user session and UI feedback in an application.
 *
 * User Information
 * @property {string} [username] - Optional username associated with the current session.
 * @property {string} [email] - Optional email address of the user.
 * @property {string} [displayName] - Optional display name shown in the UI.
 *
 * Session Status
 * @property {boolean} [isLoading] - Indicates whether a process (e.g. fetching data) is currently in progress.
 * @property {boolean} [logout] - Flag to determine if the user has logged out.
 *
 * UI Feedback
 * @property {string} [welcome] - Optional welcome message displayed to the user.
 *
 * DropDown Menu Option
 * @property {boolen} [isMenu] - Determines dropdown menu option based on screen size
 * 
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

// interface State {
//   username?: string;
//   email?: string;
//   isLoading?: boolean;
//   logout?: boolean;
//   displayName?: string;
//   welcome?: string;
//   isMenu: boolean;
// }

const NavBar: React.FC = (): React.ReactNode | null => {
    // static contextType = AuthContext;
    // const context = React.useContext(AuthContext);
    const context: typeof AuthContext = useAuth();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [logout, setLogout] = useState<boolean>(true);
    const [displayName, setDisplayName] = useState<string>('');
    const [welcome, setWelcome] = useState<string>('Hello');
    const [menu, setMenu] = useState<boolean>(false)

    const menuRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

    const activeDesktop: boolean = false;

    useEffect(() => {
        try {
            const res = context?.getCurrentUser();
            const user = res?.data;

            const name = user.user.username
                ? titleCase(user.user.username.replace('_', ' '))
                : 'Guest';

            setUsername(user.user.username);
            setEmail(user.user.email);
            setLoading(true);
            setLogout(false);

            setDisplayName(String(name))
        }
        catch (error) {
            console.error('Failed to fetch user:', error);
            setUsername('');
            setLoading(false);
            setLogout(true);
        }
        if (menuRef.current && menuRef.current.offsetWidth <= 480) setMenu(true);
    }, [context]);

    const titleCase = (str: string): string | boolean => {
       if ((str === null) || (str === ''))
         return false;
       else
         console.log(str)
       str =  str.toString();
       console.log(str)
       // First and Last Name separated by underscore
       return str.replace(/\w\S*/g, function (txt) {
         return txt.charAt(0).toUpperCase() +
           txt.substring(1).toLowerCase();
       });
    };
    
    const onLogout = (): void => {
        context?.logout();
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        // Utilizing js-cookie
        Cookies.remove('sessionid', { path: '/' });
        Cookies.remove('csrftoken', { path: '/' });
        setLogout(true);
        setWelcome(`Goodbye, ${displayName}`);
        setTimeout(() => {
        setWelcome('Hello');
        }, 5000);
    };

    return (
        <nav className='navbar'>
          <div ref={menuRef}  className='navbar-container'>
              <Link to='/homepage'><img src={brandLogo} alt='Brand Logo' width={180} height={50} loading='eager' /></Link>

              {logout ?
                    <p className={'navbar-display'}>{welcome}</p> :
                    <p className={'navbar-display'}>Welcome, {displayName}</p>}
            {menu ? (
              <NavDropDown menuItem={logout ? ['SignUp', 'Login'] : ['Body', 'Mind', 'Soul']}/>) : (
                <div className={'navbar-menu'}>
                {logout ? (
                  <div className={'navbar-menu-desktop'}>
                    <Link to='/exercise'>Body</Link>
                    <Link to='/pillars'>You</Link>
                    <Link to='/test'>Mind</Link>
                    <Link to='/journey'>Soul</Link>
                    <button
                      name={'logout-btn'}
                      title={'logout-btn'}
                      className={'logout-btn-icon'}
                      type={'submit'}
                      onClick={onLogout}><RiLogoutCircleFill /></button>
                  </div>) : (
                  <div className={'navbar-menu-desktop'}>
                    <Link to='/signup'>SignUp</Link>
                    <Link to='/login'>LogIn</Link>
                  </div>)}
              </div>)}
            </div> 
         </nav>
    )

}