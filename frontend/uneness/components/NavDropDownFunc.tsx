
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav-dropdown.css';
import { signup } from '../services/authServices';


interface Props {
    menuItem: string[];
}
    

const NavDropDown: React.FC<Props> = (props) => {
    const [open, setOpen] = useState<boolean>(false);

    const toggleMenu = (): void => {
        return open === false ? setOpen(true) : setOpen(false);
        // onClick={() => setOpen(!open)}
    }


    const slug: object = {
        signup: '/signup',
        login: '/login',
        body: '/exercise',
        mind: '/test',
        soul: '/journey'
    }
    return (
        <div className={'nav-dropdown-container'}>
            <div title={'btn-hamburger'} className={'hamburger-container'} onClick={toggleMenu}>
                <span className={'hamburger'}></span>
                <span className={'hamburger'}></span>
                <span className={'hamburger'}></span>
            </div>
            <div className={`menu-mobile-container ${open ? 'active': ''}`}>
            {open &&  (
                props.menuItem.map((m: string, i: number) => (
                    <Link to={slug[m.toLowerCase()]} className={'menu-item'} key={i} onClick={toggleMenu}>{m.toUpperCase()[0]+m.substring(1)}</Link>
                )))}
            </div>
        </div>
    );
}

export default NavDropDown;