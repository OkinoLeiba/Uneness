import { Component, type ErrorInfo } from 'react';
import reactLogo from '../src/assets/icons/react.svg';
import Card from '../components/Card';
import '../styles/pillars.css';


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


    randomText = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui nesciunt unde eius possimus eveniet nemo,\
     facilis rerum molestiae temporibus alias ducimus ut officiis accusantium perferendis libero officia similique quo?Amet';
    ovalAltText = 'Oval shape with icon at the center representing either mind, body, or soul.'
    pillarText = 'Discover how mind, body, and soul work together to create everlasting well-being and personal transformation.';

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(`${error}: ${errorInfo}`)
    }


    render() {
        return (
            <div className={'pillar-container'}> 
                <h1 className={'pillar-text-bold'}>Three Pillars of Wellness</h1>
                <p className={'pillar-text'}>{this.pillarText}</p>
                <div className={'parralax-container'}>
                    <div className={'mind-container'}>
                         <Card
                            title={'Mind'}
                            text={this.randomText}
                            btnText={'Mind'}
                            backgroundColor={'rgba(7, 121, 77, 0.8)'}
                            elementColor={'rgba(8, 15, 91, 0.8)'}
                            srcOval={reactLogo}
                            altOval={this.ovalAltText}
                            accessibilityLabel={'Access Label'}
                            className={'card-mind-center'}
                        />
                    </div>
                    <div className={'body-container'}>
                        <Card
                           title={'Body'}
                           text={this.randomText}
                           btnText={'Body'}
                           backgroundColor={'rgba(82, 80, 6, 0.8)'}
                           elementColor={'rgba(88, 120, 7, 0.8)'}
                           srcOval={reactLogo}
                           altOval={this.ovalAltText}
                           accessibilityLabel={'Access Label'}
                           className={'card-body-center'}
                        />
                    </div>
                    <div className={'soul-container'}>
                        <Card
                           title={'Soul'}
                           text={this.randomText}
                           btnText={'Soul'}
                           backgroundColor={'rgba(35, 119, 204, 0.8)'}
                           elementColor={'rgba(11, 68, 85, 0.8)'}
                           srcOval={reactLogo}
                           altOval={this.ovalAltText}
                           accessibilityLabel={'Access Label'}
                           className={'card-soul-center'}
                        />
                    </div>
                </div>
            </div>
        )
    }
}