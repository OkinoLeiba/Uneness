import React, {Component, type JSX} from 'react';
import Header from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

interface Props {
    children?: JSX.Element;

}

export interface StyleContextType {
    backgroundImage: string;
    width: number | string;
    height: number | string;
    minHeight: number | string;
    backgroundPosition: string;
    backgroundRepeat: string;
    backgroundSize: number | string;
    backgroundColor?: string;
    textColor?: string;
    padding?: number | string;
}

export const StyleContext = React.createContext<StyleContextType | null>(null);

export default class Layout extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            children: props.children || '',
        }
    }

    render() {
        const styleContextValue: StyleContextType = {
            backgroundImage: "url('../src/assets/images/soul-body-glow.png')",
            width: 'auto',
            height: '100%',
            minHeight: '100vh',

            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        };
        return (
            <StyleContext.Provider value={styleContextValue}>
                <div className={'layout-container'}>
                    <Header />
                    <Outlet />
                    {this.props.children}
                    <Footer />
                </div>
            </StyleContext.Provider>
        );
    }
}

// const Layout = ({ children }) => {
//   return (
    // <div>
      {/* <Header /> */}
      {/* {children} */}
      {/* <Footer /> */}
    {/* </div> */}
//   );
// }
// 
// export default Layout;