import React, { type ErrorInfo } from 'react';
import { StyleContext, type StyleContextType } from '../components/LayOut';
import Oval from '../components/Oval';
//import Ellipse from '../components/Ellipse';
import ImageSlider from '../components/ImageSlider';
// @ts-expect-error module exists
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

    size: number = 50;

    journeyText: string = 'Experience personalized guidance tailored to your unique needs and goals.\
     Our holistic approach ensures every aspect of your well-being is nutured.';
    ovalAltText: string = 'Oval shape with icon at the center representing either mind, body, or soul.'
    pillarText: string = 'Discover how mind, body, and soul work together to create everlasting well-being and personal transformation.';

    checkDouble: string = '../src/assets/icons/double-tick-indicator-2.png';
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(`${error}: ${errorInfo}`)
    }


    render() {
        return (
            <StyleContext.Consumer>
                {(styles: StyleContextType | null) => (
                    <div
                        style={{
                          backgroundImage: styles!.backgroundImage,
                          backgroundPosition: styles!.backgroundPosition,
                          backgroundRepeat: styles!.backgroundRepeat,
                          backgroundSize: styles!.backgroundSize,
                          width: styles!.width,
                          height: styles!.height,
                          minHeight: styles!.minHeight,
                          padding: styles!.padding
                        }}
                        className={'journey-container'}>
                        <div className={'prom-section-text'}>
                            <h1 className={'journey-text-bold'}>Your Personal Wellness Journey</h1>
                            <p className={'journey-text'}>{this.journeyText}</p>
                            <div className={'section-container'}>
                                <Oval
                                    src={this.checkDouble}
                                    alt={this.ovalAltText}
                                    size={this.size}
                                    elementColor={'rgba(191, 200, 147, 0.8)'}
                                />
                                <div className={'section-text-container'}>
                                    <h3>Personalized Programs</h3>
                                    <p>Customized wellness plans designed specifically to your lifestyle and goals.</p>
                                </div>
                            </div>
                            <div className={'section-container'}>
                                <Oval
                                    src={this.checkDouble}
                                    alt={this.ovalAltText}
                                    size={this.size}
                                    elementColor={'rgba(89, 91, 118, 0.8)'}
                                />
                                <div className={'section-text-container'}>
                                    <h3>Expert Guidance</h3>
                                    <p>Learn from certified wellness professionals and experience practitioners.</p>
                                </div>
                            </div>
                            <div className={'section-container'}>
                                <Oval
                                    src={this.checkDouble}
                                    alt={this.ovalAltText}
                                    size={this.size}
                                    elementColor={'rgba(181, 132, 132, 0.8)'}
                                />
                                <div className={'section-text-container'}>
                                    <h3>Community Support</h3>
                                    <p>Connect with like-minded individuals on similar wellness journeys.</p>
                                </div>
                            </div>
                        </div>

                        <div className={'ellipse-image'}>
                            <ImageSlider width={460} height={390} srcLeft={yogaImage} altLeft={'image-yoga-slider'} srcRight={'../src/assets/images/pink-purple-flowers.jpg'} altRight={'image-flower-slider'} backgroundColor={'rgba(100, 134, 80, 0.2)'} className={'journey-ellipse'} />
                            <Oval
                                src={this.checkDouble}
                                alt={this.ovalAltText}
                                size={this.size}
                                elementColor={'rgba(83, 66, 109, 0.8)'}
                            />
                        </div>
                    </div>)}
        </StyleContext.Consumer>
        )
    }
}