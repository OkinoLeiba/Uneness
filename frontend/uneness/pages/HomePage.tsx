import React, { type ErrorInfo } from 'react';
import Ellipse from '../components/Ellipse';
import Button from '../components/Button';
import '../styles/home-page.css';

/**
 * @typedef {Object} Props
 * @description Props for a basic image component with optional source and alt text for accessibility.
 *
 * Image Attributes
 * @property {string} [src] - Optional source URL for the image.
 * @property {string} [alt] - Optional alternative text describing the image content.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */


interface Props {
    src?: string;
    alt?: string;
}


export default class HomePage extends React.Component<Props>{
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
            <div className={'home-container'}>
                <Ellipse backgroundColor={'lightblue'} className={'home-ellipse'} />
                <div className={'home-text-container'}>
                    <h1 className={'home-text-bold'}>Discover Your Path</h1>
                    <h3 className={'home-text-blendUD'}>To</h3>
                    <h1 className={'home-text-blend'}>Wellness</h1>
                    <p className={'center-text'}>Embrace a holistic approach to well-being through the harmony of mind, body, and soul. Begin your transformative journey toward complete wellness today.</p>
                </div>
                <div className={'btn-container'}>
                    <Button
                        name={'button'}
                        form={''}
                        formTarget={''}
                        href={'/journey'}
                        value={'Start Your Journey'}
                        width={this.width}
                        height={this.height}
                        elementColor={'rgba(215, 17, 215, 1)'}
                        accessibilityLabel={'Journey button'}
                        className={'home-btn-left'}
                    />
                    <Button
                        name={'button'}
                        form={''}
                        formTarget={''}
                        href={'/pillar'}
                        value={'Learn More'}
                        width={this.width}
                        height={this.height}
                        elementColor={'rgba(215, 59, 215, 1)'}
                        accessibilityLabel={'More button'}
                        className={'home-btn-right'}
                    />
                </div>
            </div>
        )
    }
}