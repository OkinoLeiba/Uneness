import React, { type ErrorInfo} from "react";


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