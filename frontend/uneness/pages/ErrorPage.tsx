import React from 'react';
import '../styles/error-page.css'

interface Props {
    code: number;
    message: string;
}
export default class ErrorPage extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.state = {
            code: props.code || 404,
            message: props.message || 'Page Not Found',
        }
    }
    static defaultProps = {
      code: 404,
      message: 'Page Not Found',
    };

    render() {


      return (
        <div className={'error-container'}>
          <h1 className={'error-code'}>{this.props.code}</h1>
          <p className={'error-message'}>{this.props.message}</p>
          <a href="/homepage" className={'error-link'}>Go back home</a>
        </div>
      );
    }
}

