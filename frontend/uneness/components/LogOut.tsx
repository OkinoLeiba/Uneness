import React from 'react';

export class LogOut extends React.Component {

    // handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         const res = await fetch('user/logout/', {
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
      window.location.href = '/homepage';
    }
    
    render() {
        // Redirect to homepage before return 
      return <h2>You have been logged out.</h2>;
      
  }
}
