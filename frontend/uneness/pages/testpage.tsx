import { Component, createRef} from 'react';
import Navbar from '../components/NavBar';
import Oval from '../components/Oval';
// import Button from '../components/button';
import Card from '../components/Card'
import Footer from '../components/Footer';
import SelectDropdown from '../components/SelectDropdown'
import reactLogo  from '../src/assets/icons/react.svg';



export default class Test extends Component {
    
    
    boxRef = createRef<HTMLDivElement>();

    state = {
        width: 0
    }
    
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
                <Navbar />
                 <Oval
                    src={reactLogo}
                    alt='test'
                    elementColor={'rgba(255, 0, 0, 0.8)'}
                />
                    
                <Card
                    title={'BODY'}
                    text={this.randomText}
                    buttonText={'Body-Button'}
                    backgroundColor={'rgba(246, 152, 152, 0.8)'}
                    elementColor={'rgba(255, 0, 0, 0.8)'}
                    srcOval={reactLogo}
                    altOval={'Oval alt'}
                    accessibilityLabel={'Access Label'}
                    className={'test-card'}
                />
                <Footer />
                <SelectDropdown name={'Muscle Beach'} dropdownText={''} />
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