import React from 'react';
import Button from './Button';
import '../styles/transfrom.css';



export default class Transform extends React.Component {
    width: number = 150;
    height: number = this.width - 100;
    

    render() {
        return (
            <div className={'transform-container'}>
                <h3>Ready to Transform Your Life?</h3>
                <p>Joins thousands who have discover the power of wholistic wellness. Your journey to complete well-being starts here.</p>
                <Button
                    name={'start-button'}
                    form={''}
                    formTarget={''}
                    href={'/pillar'}
                    value={'Get Started Today'}
                    width={this.width}
                    height={this.height}
                    elementColor={'rgba(148, 141, 189,1)'}
                    accessibilityLabel={'More button'}
                    className={'transform-btn-left'}
                />
                <Button
                    name={'learn-button'}
                    form={''}
                    formTarget={''}
                    href={'/journey'}
                    value={'Learn More'}
                    width={this.width}
                    height={this.height}
                    elementColor={'rgba(148, 141, 189,1)'}
                    accessibilityLabel={'More button'}
                    className={'transform-btn-right'}
                />

            </div>
        )
    }
}