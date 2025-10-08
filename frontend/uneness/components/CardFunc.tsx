import React, { useRef, useEffect} from 'react';
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
    href?: string;

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

    width?: number | string;
    
}

const Card: React.FC<Props> = (props): React.ReactNode | null => {
    const boxRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
    const buttonWidth: React.RefObject<number> = useRef<number>(800);

    useEffect(() => {
        if (boxRef.current) buttonWidth.current = boxRef.current.offsetWidth;
    }, [])
    
    return (
         <div 
             ref={boxRef}
             style={
                 {
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: '8px',
                     border: '2px solid #ccc',
                     borderRadius: '50%', /* Makes it a circle */
                     width: props.width,      /* Equal width and height important for round circle */
                     height:  props.width,
                     boxShadow: '0 4px 8px rgba(0,0,0,0.1)', /* Card-like shadow */
                     backgroundColor: props.backgroundColor,
                     opacity: '0.8',
                     maxWidth: '405px',
                     maxHeight: '405px',
                     minWidth: '405px',
                     minHeight: '405px',

                     transition: 'transform 0.3s ease'
                     //transition:hover 'transform: scale(1.05)'
                 }
             }
         >
             <Oval
                 src={props.srcOval}
                 alt={props.altOval}
                 size={100}
                 elementColor={props.elementColor}
             />
             <h3
                 style={{
                     margin: '4px 0 4px 0',
                     fontSize: '1em',
                     wordWrap: 'break-word',
                     lineHeight: '1em',
                     color: 'rgba(232, 223, 223, 1)',
                 }}
             >{props.title}</h3>
             <p
                 style={{
                     margin: '4px 8% 8px 8%',
                     fontSize: '1em',
                     wordWrap: 'break-word',
                     lineHeight: '1em',
                     color: 'rgba(249, 242, 242, 1)',
                 }}
             >{props.text}</p>
             <Button
                 name={'card-btn'}
                 form={''}
                 formTarget={''}
                 href={props.href || ''}
                 value={props.btnText}
                 width={buttonWidth ? buttonWidth.current / 6 : window.innerWidth - 432 / 6}
                 height={buttonWidth ? buttonWidth.current / 24 : window.innerWidth - 432 / 28}
                 elementColor={props.elementColor}
                 accessibilityLabel={props.accessibilityLabel}
                 className={props.className}
             />
         </div>
    )
}

export default Card;