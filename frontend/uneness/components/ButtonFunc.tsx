import React from 'react';
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
    form?: string;
    formTarget?: string;
    // type: typeof Button;
    name: string;
    value: string;
    href: string;

    width?: number | string;
    height?: number | string; 
    elementColor?: string;
    textColor?: string;

    accessibilityLabel: string;

    className: string;
}

const Button: React.FC<Props> = (props) => {
    return (
        <Link
            to={props.href}
        >
            <button
                form={props.form}
                formTarget={props.formTarget}
                name={props.name}
                type={'button'}
                style={{
                    // Height and Width are important to button roundness or shape
                    width:props.width,
                    height: props.height,
                    borderRadius: '120px',
                    fontSize: '1em',
                    backgroundColor: props.elementColor,
                
                }}
                className={props.className}
            >
                {props.value}
            </button>
        </Link>
    )
}

export default Button;