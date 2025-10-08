import React, {useState, useEffect} from 'react';
// import { AuthContext } from '../services/authContextClass';
import { useAuth } from '../services/useAuth';


/**
 * @typedef {Object} State
 * @description State object for managing the dashboard form inputs and feedback.
 *
 * User Identification
 * @property {string} username - The unique username for the account.
 * @property {string} first_name - The user's first name.
 * @property {string} last_name - The user's last name.
 *
 * Contact Information
 * @property {string} email - The user's email address.
 *
 * Authentication Fields
 * @property {string} password - The user's password entry.
 * @property {string} confirmPassword - Confirmation entry for the user's password.
 *
 * Feedback Message
 * @property {string} message - Informational or error message to display on the dashboard.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

interface State {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    oldPassword: string;
    password: string;
    confirmPassword: string;
}


const Dashboard: React.FC<State> = (state): React.ReactNode | null => {
    // static contextType = AuthContext;
    // const context = React.useContext(AuthContext);
    const context = useAuth();
    const { user, loading } = context;
    const { first_name, last_name, email, oldPassword, password, confirmPassword } = state;

    const [message, setMessage] = useState<string>('');


    // will I need to initialize context and state within the useEffect
    // make dependency 
    // useEffect(() => {
        // if (user) {
            // const { username, email } = user;
        // }
    // }, [user])

    const handleLogout = async () => {
        try {
            await context.logout();
        }
        catch (error) {
            setMessage(`Logout Failed - ${error}`)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.name = e.target.value 
    }

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        const { first_name, last_name, email } = state;
        const username = first_name + '_' + last_name;
        try {
            context?.updateProfile({ username, first_name, last_name, email });
            setMessage('Profile updated successfully!');
        }
        catch (error) {
            setMessage(`Failed to update profile - ${error}`);
        }
    }

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        const { password, confirmPassword } = state;

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
        }

        try {
            context?.changePassword(oldPassword, confirmPassword);
            setMessage('Password changed successfully!');
            
        }
        catch (error) {
            setMessage(`Failed to change password - ${error}`);
        }
    }

    if (!user) return <div>You are not logged in.</div>;
    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '600px' }}>
        <h1>Dashboard</h1>
        <p><strong>Logged in as:</strong> {user.username}</p>
        <button name={'dashboard-btn'} type={'button'} onClick={handleLogout}>Logout</button>
        <hr />
        <h2>Edit Profile</h2>
        <form onSubmit={handleProfileUpdate}>
            <label>
            First Name:
            <input type={'text'} name={'first_name'} value={first_name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Last Name:
            <input type={'text'} name={'last_name'} value={last_name} onChange={handleChange} />
            </label>
            <br />
            <label>
            Email:
            <input type={'email'} name={'email'} value={email} onChange={handleChange} />
            </label>
            <br />
            <button name={'profile-btn'}  type={'submit'}>Update Profile</button>
        </form>
        <hr />
        <h2>Change Password</h2>
            <form onSubmit={handlePasswordChange}>
            <label>
            Old Password
            <input type={'password'} name={'oldPassword'} value={oldPassword} onChange={handleChange} />
            <br />
            </label>
            <label>
            New Password:
            <input type={'password'} name={'password'} value={password} onChange={handleChange} />
            </label>
            <br />
            <label>
            Confirm Password:
            <input type={'password'} name={'confirmPassword'} value={confirmPassword} onChange={handleChange} />
            </label>
            <br />
            <button type={'submit'}>Change Password</button>
        </form>
        {message && <div><p>Dashboard Error</p> <p style={{ color: 'green' }}>{message}</p></div>}
        </div>
    )
}

export default Dashboard;