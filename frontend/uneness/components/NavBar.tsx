import React, { type ErrorInfo} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../services/authContextClass';
// @ts-expect-error module exists
import brandLogo from '../src/assets/icons/icon-uneness2.svg';
import { RiLogoutCircleFill } from 'react-icons/ri';
import Cookies from 'js-cookie';
import '../styles/navbar.css';
// import Container ../styles/navbar.cssp/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

interface State {
  username?: string;
  email?: string;
  isLoading?: boolean;
  logout?: boolean;
  displayName?: string;
  welcome?:string;
}

export default class Navbar extends React.Component<object, State> {
  static contextType = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;

  state: State = {
    username: '',
    email: '',
    isLoading: true,
    logout: false,
    displayName: '',
    welcome: 'Hello',
  };

  async componentDidMount(): Promise<void> {
    try {
      const res = await this.context?.getCurrentUser();
      const user = res?.data;
      const displayName = user.user.username 
      ? this.titleCase(user.user.username.replace('_', ' '))
      : 'Guest';
      this.setState({
        username: user.username,
        email: user.email,
        isLoading: false,
        logout: true,
        displayName: String(displayName),
      });

      //console.log(user); // Safe to log here
      //console.log(this.state.isLoading)
      //console.log(this.context.user); // If context is updated separately
    } catch (error) {
      console.error('Failed to fetch user:', error);
      this.setState({ username: '', logout: false, isLoading: false });
    }
  }
  
  // componentDidMount(): void {
    // this.context.getCurrentUser()
      // .then(res => {
        // const user = res.data;
        // console.log(user)
        // const userName = user.username && this.titleCase(user.username.replace('_', ' '));
        // 
        // this.setState({
          // user,
          // userName,
          // isLoading: false,
          // logout: true,
        // });
        // 
        // console.log(user);
        // console.log(this.context.user);
        // console.log(userName);
      // })
      // .catch(error => {
        // console.error('Error fetching user:', error);
        // this.setState({
          // user: null,
          // userName: '',
          // isLoading: false,
          // logout: false,
        // });
      // });
  // }

  titleCase = (str: string): string | boolean => {
    if ((str === null) || (str === ''))
      return false;
    else
      console.log(str)
    str = str.toString();
    console.log(str)
    // First and Last Name separated by underscore
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() +
        txt.substring(1).toLowerCase();
    });
  };

  onLogout = (): void => {
    // TODO: consider moving line 103 to line 106 to LogOut.tsx
    this.context?.logout();
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    // Utilizing js-cookie
    Cookies.remove('sessionid', { path: '/' });
    Cookies.remove('csrftoken', { path: '/' });
    this.setState({ logout: false });
    this.setState({ welcome: `Goodbye, ${this.state.displayName}` });
    setTimeout(() => {
      this.setState({ welcome: 'Hello'});
    }, 5000);
  };
 
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(`${error}: ${errorInfo}`)
  };

  render() {
    // const { user } = this.state.user
      return (
        <nav className='navbar'>
          <div className='navbar-container'>
            <Link to='/homepage'><img src={brandLogo} alt='Brand Logo' width={180} height={50} loading='eager' /></Link>
            {this.state.logout ?
              <p className={'navbar-display'}>Welcome, {this.state.displayName}</p> :
              <p className={'navbar-display'} >{this.state.welcome}</p>}
            <div className='navbar-menu'>
              {this.state.logout ? (
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
                  onClick={this.onLogout}><RiLogoutCircleFill /></button>
              </div>) : (
              <div className={'navbar-menu-desktop'}>
                <Link to='/signup'>SignUp</Link>
                <Link to='/login'>LogIn</Link>
              </div>)
              }
            </div>  

          </div>
        </nav>
      ) 

          {/* <div className='navbar-hamburger' onClick={toggleMenu} ref={hamburgerRef}>
            <span></span>
            <span></span>
            <span></span>
          </div>  

          <ul className={`navbar-mobile-menu ${isOpen ? 'active' : ''}`} ref={menuRef}>
          <Link to='/' onClick={closeMenu}>Page 1</Link>
          <Link to='/page2' onClick={closeMenu}>Page 2</Link>
          <Link to='/page3' onClick={closeMenu}>Page 3</Link>
          <Link to='/page4' onClick={closeMenu}>Page 4</Link>
          <Link to='/page5' onClick={closeMenu}>Page 5</Link>

              <a 
                href='https://jamesbuckhouse.substack.com/'
                target='_blank'
                rel='noopener noreferrer'
                onClick={closeMenu}
              >
              </a>

          </ul>
        </div> */}
          
      {/* <div className='navbar-action'> */}
    {/* <a */}
      // className='test-link'
      // href=''
      // target='_blank'
      // rel='noopener noreferrer'>Link 
    {/* </a> */}
  {/* </div> */}
          
    }
  }


  // return <Navbar expand='lg' className='bg-body-tertiary'>
    //   <Container>
    //     <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
    //     <Navbar.Toggle aria-controls='basic-navbar-nav' />
    //     <Navbar.Collapse id='basic-navbar-nav'>
    //       <Nav className='me-auto'>
    //         <Nav.Link href='#home'>Home</Nav.Link>
    //         <Nav.Link href='#link'>Link</Nav.Link>
    //         <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
    //           <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
    //           <NavDropdown.Item href='#action/3.2'>
    //             Another action
    //           </NavDropdown.Item>
    //           <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
    //           <NavDropdown.Divider />
    //           <NavDropdown.Item href='#action/3.4'>
    //             Separated link
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
      // </Navbar>