
import React from 'react';
// import Link from 'react-dom';
import '../styles/nav-dropdown.css';

interface Props {
    menuItem: string[];
}
    
interface State {
    isOpen: boolean;
}

export default class NavDropDown extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    } 

    toggleMenu = () => {
        this.setState({ isOpen: this.state.isOpen === false ? true : false })
        // onClick={() => this.setState(({isOpen}) => ({isOpen: !isOpen}))}
    }

    render() {
        return (
            <div className={'nav-dropdown-container'}>
                <div title={'btn-hamburger'} className={'hamburger-container'} onClick={this.toggleMenu}>
                    <span className={'hamburger'}></span>
                    <span className={'hamburger'}></span>
                    <span className={'hamburger'}></span>
                </div>
                <div className={`menu-mobile-container ${this.state.isOpen ? 'active': ''}`}>
                {this.state.isOpen &&  (
                    this.props.menuItem.map((m, i) => (
                        <p className='menu-item' key={i} onClick={this.toggleMenu}>{m.toUpperCase()[0]+m.substring(1)}</p>
                    )))}
                </div>
            </div>
        );
    }
}
{/* <div className='navbar-hamburger' onClick={toggleMenu} ref={hamburgerRe
            <span></span>
            <span></span>
            <span></span>
          </div>  

          <ul className={`navbar-mobile-menu ${isOpen ? 'active' : ''}`} ref={menuRef
          <Link to='/' onClick={closeMenu}>Page 1</Link>
          <Link to='/page2' onClick={closeMenu}>Page 2</Link>
          <Link to='/page3' onClick={closeMenu}>Page 3</Link>
          <Link to='/page4' onClick={closeMenu}>Page 4</Link>
          <Link to='/page5' onClick={closeMenu}>Page 5</Link>*/}