import { Component, type ErrorInfo} from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
// import Container ../styles/navbar.cssp/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';



export default class Navbar extends Component {
  user: boolean = false;
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(`${error}: ${errorInfo}`)
  };
  render() {
    return (
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/'>ICON</Link>
          <div className='navbar-menu'>
            {this.user ? (
            <>
              <Link to='/'>Home</Link>
              <Link to='/signup'>Body</Link>
              <Link to='/page3'>You</Link>
              <Link to='/page4'>Mind</Link>
              <Link to='/page5'>Soul</Link>
            </>) : (
            <>
              <Link to='/signup'>Signup</Link>
              <Link to='/login'>Login</Link>
            </>)
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