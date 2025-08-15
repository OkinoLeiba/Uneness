import { Component, type ErrorInfo } from 'react';
import reactLogo from '../src/assets/icons/react.svg';
import Oval from '../components/Oval';
import Ellipse from '../components/Ellipse';
import '../styles/journey.css';


interface Props {
    random?: string;
}




export default class HomePage extends Component<Props>{
    constructor(props: Props) {
        super(props);
        this.state = {
            random: props.random || ''
        };
    }


    journeyTet = 'Experience personalized guidance tailored to your unique needs and goals.\
     Our holistic approach ensures every aspect of your well-being is nutured.';
    ovalAltText = 'Oval shape with icon at the center representing either mind, body, or soul.'
    pillarText = 'Discover how mind, body, and soul work together to create everlasting well-being and personal transformation.';

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(`${error}: ${errorInfo}`)
    }


    render() {
        return (
            <div className={'journey-container'}> 
                <div className={'prom-section-text'}>
                    <h1 className={'journey-text-bold'}>Your Personal Wellness Journey</h1>
                    <p className={'journey-text'}>{this.journeyTet}</p>
                    <div className={'section-container'}>
                        <Oval
                            src={reactLogo}
                            alt={this.ovalAltText}
                            elementColor={'rgba(255, 0, 0, 0.8)'}
                        />
                        <div className={'section-text-container'}>
                            <h3>Personalized Programs</h3>
                            <p>Customized wellness plans designed specifically to your lifestyle and goals.</p>
                        </div>
                    </div>
                </div>

                <div className={'ellipse-image'}>
                    <Ellipse backgroundColor={'lightblue'} className={'journey-ellipse'} />
                     <Oval
                        src={reactLogo}
                        alt={this.ovalAltText}
                        elementColor={'rgba(255, 0, 0, 0.8)'}
                    />
                </div>
            </div>
        )
    }
}