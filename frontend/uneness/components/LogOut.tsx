import React, { Component } from 'react';

export class LoggedOut extends Component {

    // handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         const res = await fetch('user/logut/', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' }
    //         });
    //         if (!res.ok) throw new Error('Invalid credentials');
    //         localStorage.removeItem('token');
    //     }
    //     catch (err) {
    //         this.setState({ error: err.message });

    //     }
    // }
    componentDidMount(): void {
        localStorage.removeItem('token');
    }

    render() {
        // Redirect to homepage
        //TODO: add homepage
    return <h2>You have been logged out.</h2>;
  }
}
