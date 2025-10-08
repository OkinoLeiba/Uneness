import React  from 'react';
import imgEllipse from '../src/assets/images/pink-purple-flowers.jpg';


/**
 * @typedef {Object} Props
 * @description Configuration for a styled UI component container.
 *
 * Styling Properties
 * @property {string} backgroundColor - Background color of the component.
 * @property {string} className - CSS class name(s) applied to the component.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

interface Props {
    backgroundColor: string;
    className: string;
}

const Ellipse: React.FC<Props> = (props): React.ReactNode | null => {
    const width: number = 600;

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: width,
                height: width-300,
                borderRadius: width-100,
            
                backgroundColor: props.backgroundColor,
            }}
            className={props.className}
        >
            <img
                src={imgEllipse}
                alt={'Image of lotus garden'}
                role='img'
                width={width-200}
                height={width-200}
                style={{
                borderRadius: '50%',
                boxShadow: '0 0 2px 1px rgba(0, 140, 186, 0.5)'
                }}     
            />
        </div>
    )
}

export default Ellipse;
