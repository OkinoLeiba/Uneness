import React, { type ErrorInfo} from 'react';

/**
 * @typedef {Object} Props
 * @description Configuration for an image-based UI element with customizable size and styling.
 *
 * Image Properties
 * @property {string} [src] - Optional source URL for the image.
 * @property {string} alt - Alternative text for the image, used for accessibility and screen readers.
 *
 * Styling Properties
 * @property {number|string} [size] - Optional size of the image (can be a pixel value or percentage).
 * @property {string} [elementColor] - Optional color applied to the surrounding element or image tint.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

interface Props {
    src?: string;
    alt: string;
    
    size?: number | string;

    elementColor?: string ;
}




export default class Oval extends React.Component<Props>{
    constructor(props: Props) {
        super(props);
        this.state = {
          src: props.src || '',
          alt: props.alt,
          size: props.size || 100,
          backgroundColor: props.elementColor || '',
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(`${error}: ${errorInfo}`)
    }


    render() {
        return (
            <div
                style={{
                    backgroundColor:this.props.elementColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: this.props.size,
                    height: this.props.size,
                    borderRadius:'50%',
                }}
            >
                <img
                    src={this.props.src}
                    alt={this.props.alt}
                    role='img'
                    width={35}
                    height={35}
                />
            </div>
        )
    }
}