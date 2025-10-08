
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav-dropdown.css';
import { signup } from '../services/authServices';

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

    toggleMenu = (): void => {
        this.setState({ isOpen: this.state.isOpen === false ? true : false })
        // onClick={() => this.setState(({isOpen}) => ({isOpen: !isOpen}))}
    }
    slug: object = {
        signup: '/signup',
        login: '/login',
        body: '/exercise',
        mind: '/test',
        soul: '/journey'

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
                    this.props.menuItem.map((m: string, i: number) => (
                        <Link to={this.slug[m.toLowerCase()]} className={'menu-item'} key={i} onClick={this.toggleMenu}>{m.toUpperCase()[0]+m.substring(1)}</Link>
                    )))}
                </div>
            </div>
        );
    }
}







