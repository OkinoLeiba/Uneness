import { useEffect } from 'react';


const LogOut = (): void => {
    useEffect(() => {
        localStorage.removeItem('token');
        window.location.href = '/homepage';
    })
}

export default LogOut;