import React, { type ErrorInfo} from "react";

interface Props {
    src?: string ;
    alt: string ;

    elementColor?: string ;
}




export default class Oval extends React.Component<Props>{
    constructor(props: Props) {
        super(props);
        this.state = {
          src: props.src || '',
          alt: props.alt,
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
                    width: 100,
                    height: 100,
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