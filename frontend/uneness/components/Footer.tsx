import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';
import brandLogo from '../src/assets/icons/icon-uneness2.svg';
import instagram from '../src/assets/icons/icons8-instagram.svg';
import faceBook from '../src/assets/icons/icons8-facebook.svg';
import xT from '../src/assets/icons/icons8-twitter.svg';
import youTube from '../src/assets/icons/icons8-youtube.svg';

export default class Footer extends React.Component {
    brandText = 'The journey to holistic wellness through mind, body, and soul harmony. Discover the path to your best self.';

    render() {
        return (
            <footer>
                <div className={'footer-content-row'}>
                    <div className='brand-col-gap'>
                        <img src={brandLogo} alt='Brand Logo' className={'brand-col-gap-img'} loading='eager' />
                        <p className={'brand-col-gap-text'}>{this.brandText}</p>
                    </div>
                    <div className='qlinks-col-gap'>
                        <h3 className={'link-text'}>Quick Links</h3>
                        <Link to='/homepage'>Home</Link>
                        <Link to='/mind'>Mind</Link>
                        <Link to='/exercise'>Body</Link>
                        <Link to='/pillars'>You</Link>
                        <Link to='/journey'>Soul</Link>
                    </div>
                    <div className='support-col-gap'>
                        <h3 className={'link-text'}>Support</h3>
                        <Link to='/contact'>Contact Us</Link>
                        <Link to='/help'>Help Center</Link>
                        <Link to='/resources'>Resources</Link>
                        <Link to='/community'>Community</Link>
                    </div>
                    <div className='contact-col-gap'>
                        <h3 className={'link-text'}>Connect</h3>
                        <div>
                            <Link to='https://instagram.com'>
                                <img src={instagram} alt='Instagram icon' width={50} height={50} loading='eager' />
                            </Link>
                            <Link to='https://facebook.com'>
                                <img src={faceBook} alt='Facebook icon' width={50} height={50} loading='eager' />
                            </Link>
                            <Link to='https://twitter.com'>
                                <img src={xT} alt='X formly Twitter icon' width={50} height={50} loading='eager' />
                            </Link>
                            <Link to='https://youtube.com'>
                                <img src={youTube} alt='YouTube icon' width={50} height={50} loading='eager' />
                            </Link>
                        </div>
                        <Link to='/privacy'>Privacy Policy</Link>
                        <Link to='/terms'>Terms of Service</Link>
                    </div>
                </div>
                <p>&copy; 2025 Uneness. All rights reserved. Made with ☕ for your wellness journey.</p>
            </footer>
        );
    }
}
