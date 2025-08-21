import React, {createRef} from 'react';
// import Navbar from '../components/NavBar';
import Oval from '../components/Oval';
// import Button from '../components/button';
// import Card from '../components/Card'
// import Footer from '../components/Footer';
// import SelectDropdown from '../components/SelectDropdown';
// import ChatWidget from '../components/ChatWidget';
// import VideoModal from '../components/VideoModal';
import ImageSlider from '../components/ImageSlider';
// import yogaImage from '../src/assets/images/group-yoga-exercise.jpg';
import reactLogo  from '../src/assets/icons/react.svg';



export default class Test extends React.Component {
    
    
    boxRef = createRef<HTMLDivElement>();

    state = {
        width: 0,
        modalOpen: false,
    }

     openModal = (url: string) => {
    this.setState({ modalOpen: true, videoUrl: url })
    };
    closeModal = () => {
    this.setState({ modalOpen: false });
    };
    
    componentDidMount() {
        console.log(this.boxRef.current)
        if (this.boxRef.current) {
        // console.log(this.boxRef.current.offsetWidth)
            this.setState({ width: this.boxRef.current.offsetWidth })
        }
    }
    randomText = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui nesciunt unde eius possimus eveniet nemo, facilis rerum molestiae temporibus alias ducimus ut officiis accusantium perferendis libero officia similique quo?Amet';
    render() {
        return (
            <div> 
                <h2>Test!</h2>
                {/* <Navbar /> */}
                 <Oval
                    src={reactLogo}
                    alt='test'
                    elementColor={'rgba(255, 0, 0, 0.8)'}
                />
                    
                {/* <Card
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
                {/* <ChatWidget /> */}
                {/* <VideoModal videoUrl={'https://www.youtube.com/embed/dQw4w9WgXcQ?si=l9Vf1De3sL3AR4DI'} open={false} /> */}
                <ImageSlider width={170} height={100} srcLeft={'../src/assets/images/group-yoga-exercise.jpg'} altLeft={'image-slider'}  srcRight={'../src/assets/images/pink-purple-flowers.jpg'} altRight={'image-slider'} backgroundColor='red' className={'journey-ellipse'} />
            </div>
        )
        
  }
}
// <Button
    // 
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
{/* /> */}