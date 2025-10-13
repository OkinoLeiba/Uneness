import React, { createRef } from 'react';
// import { PasswordChangeDone } from '../components/PasswordChangeDone';
// import { PasswordChangeDone } from '../components/PasswordChangeDoneFunc';
// import { PasswordChangeForm } from '../components/PasswordChangeForm';
// import PasswordChangeForm  from '../components/PasswordChangeFormFunc';
import { PasswordResetConfirm } from '../components/PasswordResetConfirm';
// import { PasswordResetConfirm } from '../components/PasswordResetConfirm';
// import reactLogo from '../src/assets/icons/react.svg';
// import Navbar from '../components/NavBar';
// import Oval from '../components/Oval';
// import Oval from '../components/OvalFunc';
// import Button from '../components/Button';
// import Button from '../components/ButtonFunc';
// import Card from '../components/Card'
// import Card from '../components/CardFunc';
// import Footer from '../components/Footer';
// import Footer from '../components/FooterFunc.tsx';
// import Ellipse from '../components/Ellipse.tsx';
// import Ellipse from '../components/EllipseFunc';
// import SelectDropdown from '../components/SelectDropdown';
// import ChatWidget from '../components/ChatWidget';
// import ChatWidget from '../components/ChatWidgetFunc';
// import VideoModal from '../components/VideoModal';
// import ImageSlider from '../components/ImageSlider';
// import ImageSlider from '../components/ImageSliderFunc';
// import yogaImage from '../src/assets/images/group-yoga-exercise.jpg';
// import reactLogo from '../src/assets/icons/react.svg';
// import NavDropDown from '../components/NavDropDown';
// import NavDropDown from '../components/NavDropDownFunc';
// import Dashboard from '../components/DashBoard';
// import Dashboard from '../components/DashBoardFunc';
// import LogIn from '../components/LogIn.tsx';
// import LogIn from '../components/LogInFunc.tsx';
// import SignUp from '../components/SignUp.tsx';
// import SignUp from '../components/SignUpFunc'



export default class Test extends React.Component {
    
    
    boxRef: React.RefObject<HTMLDivElement | null> = createRef<HTMLDivElement>();

    state = {
        width: 100,
        modalOpen: false,
    }

     openModal = (url: string) => {
    this.setState({ modalOpen: true, videoUrl: url })
    };
    closeModal = () => {
    this.setState({ modalOpen: false });
    };
    
    componentDidMount() {
        //console.log(this.boxRef.current)
        if (this.boxRef.current) {
        // console.log(this.boxRef.current.offsetWidth)
            this.setState({ width: this.boxRef.current.offsetWidth })
        }
    }
    randomText: string = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui nesciunt unde eius possimus eveniet nemo, facilis rerum molestiae temporibus alias ducimus ut officiis accusantium perferendis libero officia similique quo?Amet';
    menuItem: string[] = ['test', 'test', 'test'];
    render() {
        return (
            <div> 
                <h2>Test!</h2>
                {/* <Navbar /> */}
                {/*<Oval
                    src={reactLogo}
                    alt='test'
                    size={100}
                    elementColor={'rgba(255, 0, 0, 0.8)'}
                    /> */}
                    {/*<Button
                    name={`button`}
                    form={''}
                    formTarget={''}
                    href={''}
                    value={'Test'}
                    width={this.state.width}
                    height={this.state.width - 50}
                    elementColor= 'red'
                    accessibilityLabel='accessibilityLabel'
                    className='className'
                    /> */}
                    
                {/*<Card
                    title={'BODY'}
                    text={this.randomText}
                    btnText={'Body Button'}
                    backgroundColor={'rgba(246, 152, 152, 0.8)'}
                    elementColor={'rgba(255, 0, 0, 0.8)'}
                    srcOval={reactLogo}
                    altOval={'Oval alt'}
                    accessibilityLabel={'Access Label'}
                    className={'test-card'}
                /> */}
                {/* <Footer /> */}
                {/* <SelectDropdown name={'Muscle Beach'} dropdownText={''} onOpen={() => ''} /> */}
                {/* <ChatWidget />  */}
                {/* <VideoModal videoUrl={'https://www.youtube.com/embed/dQw4w9WgXcQ?si=l9Vf1De3sL3AR4DI'} open={false} /> */}
                {/* <ImageSlider width={170} height={100} srcLeft={'../src/assets/images/group-yoga-exercise.jpg'} altLeft={'image-slider'} srcRight={'../src/assets/images/pink-purple-flowers.jpg'} altRight={'image-slider'} backgroundColor='red' className={'journey-ellipse'} /> */}
                {/* <NavDropDown menuItem={this.menuItem} /> */}
                {/* <Dashboard  /> */}
                {/* <Ellipse 
                    backgroundColor={'rgba(100, 100, 100, 1)'}
                    className={'test'}
                />*/}
                {/* <LogIn /> */}
                {/* <PasswordChangeDone /> */}
                {/* <PasswordChangeForm />  */}
                <PasswordResetConfirm />
            </div>
        )
        
  }
}
// <Button
// name={`button`}
// form={''}
// formTarget={''}
// href={''}
// value={'Test'}
// width={this.state.width}
// height={this.state.width}
// backgroundColor='red'
// accessibilityLabel='accessibilityLabel'
// className='className'
// /> 