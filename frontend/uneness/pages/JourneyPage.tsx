import React, { type ErrorInfo } from 'react';
import { StyleContext, type StyleContextType } from '../components/LayOut';
import reactLogo from '../src/assets/icons/react.svg';
import Oval from '../components/Oval';
//import Ellipse from '../components/Ellipse';
import ImageSlider from '../components/ImageSlider';
import yogaImage from '../src/assets/images/group-yoga-exercise.jpg';
import '../styles/journey.css';


interface Props {
    random?: string;
}




export default class HomePage extends React.Component<object, Props>{
    constructor(props: Props) {
        super(props);
        this.state = {
            random: props.random || ''
        };
    }


    journeyText = 'Experience personalized guidance tailored to your unique needs and goals.\
     Our holistic approach ensures every aspect of your well-being is nutured.';
    ovalAltText = 'Oval shape with icon at the center representing either mind, body, or soul.'
    pillarText = 'Discover how mind, body, and soul work together to create everlasting well-being and personal transformation.';

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(`${error}: ${errorInfo}`)
    }


    render() {
        return (
            <StyleContext.Consumer>
                {(styles: StyleContextType) => (
                    <div
                        style={{
                          backgroundImage: styles.backgroundImage,
                          backgroundPosition: styles.backgroundPosition,
                          backgroundRepeat: styles.backgroundRepeat,
                          backgroundSize: styles.backgroundSize,
                          width: styles.width,
                          height: styles.height,
                          minHeight: styles.minHeight,
                          padding: styles.padding
                        }}
                        className={'journey-container'}>
                        <div className={'prom-section-text'}>
                            <h1 className={'journey-text-bold'}>Your Personal Wellness Journey</h1>
                            <p className={'journey-text'}>{this.journeyText}</p>
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
                            <ImageSlider width={170} height={100} srcLeft={yogaImage} altLeft={'image-yoga-slider'}  srcRight={'../src/assets/images/pink-purple-flowers.jpg'} altRight={'image-flower-slider'} backgroundColor='red' className={'journey-ellipse'} />
                            <Oval
                                src={reactLogo}
                                alt={this.ovalAltText}
                                elementColor={'rgba(255, 0, 0, 0.8)'}
                            />
                        </div>
                    </div>)}
        </StyleContext.Consumer>
        )
    }
}