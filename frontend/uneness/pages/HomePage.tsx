import { Component, type ErrorInfo } from 'react';
import Ellipse from '../components/Ellipse';
import Button from '../components/Button';
import Layout from '../components/Layout';
import '../styles/home-page.css';


interface Props {
    src?: string;
    alt?: string;
}


export default class HomePage extends Component<Props>{
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }

    width: number = 250;
    height: number = this.width - 200;

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(`${error}: ${errorInfo}`)
    }


    render() {
        return (
            <Layout>
            <div className={'home-container'}>
                <Ellipse backgroundColor={'lightblue'} className={'home-ellipse'} />
                <div className={'home-text-container'}>
                    <h1 className={'home-text-bold'}>Discover Your Path</h1>
                    <h3 className={'home-text-blendUD'}>To</h3>
                    <h1 className={'home-text-blend'}>Wellness</h1>
                    <p className={'center-text'}>Embrace a holistic approach to well-being through the harmony of mind, body, and soul. Begin your transformative journey toward complete wellness today.</p>
                </div>
                <div className={'button-container'}>
                    <Button
                        name={'button'}
                        form={''}
                        formTarget={''}
                        href={''}
                        value={'Start Your Journey'}
                        width={this.width}
                        height={this.height}
                        elementColor={'rgba(215, 17, 215, 1)'}
                        accessibilityLabel={'Journey button'}
                        className={'home-button-left'}
                    />
                    <Button
                        name={'button'}
                        form={''}
                        formTarget={''}
                        href={''}
                        value={'Learn More'}
                        width={this.width}
                        height={this.height}
                        elementColor={'rgb(215, 59, 215)'}
                        accessibilityLabel={'More button'}
                        className={'home-button-right'}
                    />
                </div>
                </div>
            </Layout>
        )
    }
}