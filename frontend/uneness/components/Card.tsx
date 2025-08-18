import { Component, createRef, type ErrorInfo } from "react";
import Oval from './Oval';
import Button from './Button';

/**
 * @typedef {Object} Props
 * @description Configuration object for a card-like UI component with optional image and button.
 *
 * @property {string} title - The main heading or title displayed on the card.
 * @property {string} text - Descriptive or supporting text content.
 * @property {string} [backgroundColor] - Optional background color of the card.
 *
 * Oval Properties 
 * @property {string} [srcOval] - Optional image source for the oval graphic.
 * @property {string} altOval - Alternative text for the oval image, used for accessibility.
 * Button Properties 
 * @property {string} accessibilityLabel - ARIA label for screen readers to describe the button.
 * @property {string} className - CSS class name(s) for styling the button.
 * @property {string} btnText - Text displayed inside the button.
 * @property {string} [elementColor] - Color of the button element; also used for other elements with lighter alpha for the card.
 *
 * @property {number} [width] - Optional width of the card component in pixels.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-11
 */


interface Props {
    title: string;
    text: string;
    backgroundColor?: string;

    // Oval Properties //
    srcOval?: string;
    altOval: string;

    // Button Properties //
    accessibilityLabel: string;
    className: string;
    btnText: string;
    // Element Color will be same as Button
    // and [alpha] lighter than Card
    elementColor?: string;

    width?: number;
}


export default class Card extends Component<Props> {
     constructor(props: Props) {
     super(props);
        this.state = {
            title: props.title || '',
            text: props.text || '',
            backgroundColor: props.backgroundColor || '',
            elementColor: props.elementColor || '',
            srcOval: props.srcOval || '',
            altOval: props.altOval || '',
            accessibilityLabel: props.accessibilityLabel || '',
            className: props.className || '',
            btnText: props.btnText || '',
             // Default value width of window and not component
             width: props.width || window.innerWidth || '',
        };
     }
    
    boxRef = createRef<HTMLDivElement>();

    componentDidMount() {
        if (this.boxRef.current) {
            console.log(this.boxRef.current.offsetWidth)
            this.setState({ width: this.boxRef.current.offsetWidth });
            console.log(this.props.title)
      }
    };
    //TODO: may need for exercise list and dropdown
    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<Props>): boolean {
        if (this.state !== nextState || this.props !== nextProps) return false;
        return true;
    };
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(`${error}: ${errorInfo}`)
    };
    

    render() {
        return (
            <div 
                ref={this.boxRef}
                style={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',

                        border: '2px solid #ccc',
                        borderRadius: '50%', /* Makes it a circle */
                        width: '400px',      /* Equal width and height important for round circle */
                        height: '400px',

                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', /* Optional: card-like shadow */
                        backgroundColor: this.props.backgroundColor,
                        opacity: '0.8',
                        
                        transition: 'transform 0.3s ease'
                        //transition&:hover 'transform: scale(1.05)'
                    }
                }
            >
                <Oval
                    src={this.props.srcOval}
                    alt={this.props.altOval}
                    elementColor={this.props.elementColor}
                />
                <h3
                    style={{
                        margin: '4px 0 4px 0',
                    }}
                >{this.props.title}</h3>
                <p
                    style={{
                        margin: '4px 8% 8px 8%',
                        fontSize: '0.8em',
                        wordWrap: 'break-word',

                    }}
                >{this.props.text}</p>
                <Button
                    name={'card-btn'}
                    form={''}
                    formTarget={''}
                    href={''}
                    value={this.props.btnText}
                    // @ts-expect-error width type ReadOnly object and has state and needs immutability 
                    width={this.state.width ? this.state.width / 2 : window.innerWidth / 6}
                    // @ts-expect-error width type ReadOnly object and has state and needs immutability
                    height={this.state.width ? this.state.width / 9 : window.innerWidth / 28}
                    elementColor={this.props.elementColor}
                    accessibilityLabel={this.props.accessibilityLabel}
                    className={this.props.className}
                />
            </div>
        )
    }
}




