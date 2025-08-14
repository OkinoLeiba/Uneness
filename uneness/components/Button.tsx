import { Component, type ErrorInfo } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

/**
 * @typedef {Object} Props
 * @description Props for the Button component, used to configure appearance, behavior, and accessibility.
 * @property {string} [form] - The ID of the form the button is associated with.
 * @property {string} [formTarget] - Specifies where to display the response after submitting the form.
 * @property {string} name - The name attribute of the button, used for form submission.
 * @property {string} value - The visible label or value of the button.
 * @property {string} href - The navigation target when the button is clicked.
 * @property {number|string} [width] - Width of the button (can be a number or CSS string).
 * @property {number|string} [height] - Height of the button (can be a number or CSS string).
 * @property {string} [elementColor] - Background color of the button.
 * @property {string} [textColor] - Text color of the button.
 * @property {string} accessibilityLabel - ARIA label for screen readers.
 * @property {string} className - CSS class name(s) for styling the button.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-11
 */

interface Props {
    form?: string ;
    formTarget?: string ;
    // type: typeof Button;
    name: string ;
    value: string ;
    href: string ;

    width?: number | string;
    height?: number | string; 
    elementColor?: string;
    textColor?: string;

    accessibilityLabel: string ;

    className: string ;
}

export default class Button extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            form: props.form || '',
            formTarget: props.formTarget || '',

            name: props.name || '',
            value: props.value || '',
            width: props.width || '' || 0,
            height: props.height || '' || 0,
            elementColor: props.elementColor || '',

            accessibilityLabel: props.accessibilityLabel || '',
            textColor: props.textColor || 'white',
            className: props.className || '',  
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(`${error}: ${errorInfo}`)
    };
    
    render() {
        return (
            <Link
                to={this.props.href}
            >
                
                <button
                    form={this.props.form}
                    formTarget={this.props.formTarget}
                    name={this.props.name}
                    style={{
                        width:this.props.width,
                        height: this.props.height,
                        borderRadius: '120px',
                        fontSize: '1em',
                        backgroundColor: this.props.elementColor,
                    
                    }}
                    className={this.props.className}
                >
    
                    {this.props.value}
                </button>
            </Link>
        )
    }
}