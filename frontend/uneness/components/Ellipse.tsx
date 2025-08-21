import React, { type ErrorInfo } from 'react';
// @ts-expect-error module exists
import imgEllipse from '../src/assets/images/pink-purple-flowers.jpg';

interface Props {
    backgroundColor: string;
    className: string;
}



export default class Ellipse extends React.Component<Props>{
    constructor(props: Props) {
        super(props);
        this.state = {
            backgroundColor: props.backgroundColor || '',
            className: props.className || '',
        };
    }

    width: number = 600;

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(`${error}: ${errorInfo}`)
    }


    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: this.width,
                    height: this.width-300,
                    borderRadius: this.width-100,
                    
                    backgroundColor: this.props.backgroundColor,
                }}
                className={this.props.className}
            >
                <img
                    src={imgEllipse}
                    alt={'Image of lotus garden'}
                    role='img'
                    width={this.width-200}
                    height={this.width-200}
                    style={{
                        borderRadius: '50%',
                        boxShadow: '0 0 2px 1px rgba(0, 140, 186, 0.5)'
                    }}     
                />
            </div>
        )
    }
}