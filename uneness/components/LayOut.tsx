import React, {Component, type JSX} from 'react';
import Header from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import HomePage from '../pages/HomePage';

interface Props {
    children?: JSX.Element;

}

export default class Layout extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            children: props.children || '',
        }
    }

    render() {
        return (
            <>
                <Header />
                {/* <HomePage /> */}
                <Outlet />
                {/* {this.props.children} */}
                <Footer />
            </>
        );
    }
}

// const Layout = ({ children }) => {
//   return (
    // <>
      {/* <Header /> */}
      {/* {children} */}
      {/* <Footer /> */}
    {/* </> */}
//   );
// }
// 
// export default Layout;