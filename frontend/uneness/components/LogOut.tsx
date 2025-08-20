import React from 'react';


// TODO: consider creating cookie.ts
export function deleteCookie(
  name: string,
  path: string = '/',
  domain?: string
): void {
  const data = new Date().toUTCString();
  let cookieStr = `${name}=; Path=${path}; Expires=${data};`
  if (domain) {
    cookieStr += ` Domain=${domain};`
  }
  document.cookie = cookieStr
}

// Remove all token; if exists
export function clearAllCookies(): void {
  document.cookie
    .split(';')
    .forEach(cookie => {
        const name = cookie.split('=')[0].trim();
        const data = new Date().toUTCString();
      document.cookie = `${name}=; Path=/; Expires=${data};`;
    });
}

export class LoggedOut extends React.Component {

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
