import React from 'react';
import '../styles/error-page.css'

/**
 * @typedef {Object} Props
 * @description Props for a status or alert component that displays a code and corresponding message.
 *
 * Status Details
 * @property {number} code - Numeric status code (e.g., HTTP code or internal identifier).
 * @property {string} message - Descriptive message associated with the status code.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

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
          <a href='/homepage' className={'error-link'}>Go back home</a>
        </div>
      );
    }
}

