import React from 'react';
import { AuthContext } from '../services/authContextClass';

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
  password: string;
  confirmPassword: string;
  message: string;
}

export default class Dashboard extends React.Component<object, State> {
  static contextType = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;

  constructor(state: State) {
    super(state);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      message: '',
    };
  }
  
  componentDidMount() {
    // TODO: test and review
    const user =  {username: 'testuser', email: 'testuser@email.com' }
    //const user = this.context && this.context.user ? this.context.user : undefined;
    if (user) {
      this.setState({
        username: user.username,
        email: user.email,
      });
    }
    console.log(this.state.username);
  }

  handleLogout = async () => {
    try {
      await this.context?.logout();
    } catch (error) {
      this.setState({ message: `Logout failed - ${error}`});
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<State, keyof State>);
  };

  handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { first_name, last_name, email } = this.state;
    const username = first_name + '_' + last_name;
    try {
      await this.context?.updateProfile({ username, first_name, last_name, email });
      this.setState({ message: 'Profile updated successfully!' });
    } catch (error) {
      this.setState({ message: `Failed to update profile - ${error}`});
    }
  };

  handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({ message: 'Passwords do not match.'});
      return;
    }
    try {
      await this.context?.changePassword(password, confirmPassword);
      this.setState({ message: 'Password changed successfully!', password: '', confirmPassword: '' });
    } catch (error) {
      this.setState({ message: `Failed to change password - ${error}`});
    }
  };

  render() {
    const user =  {username: 'testuser', email: 'testuser@email.com' }
    // const user = this.context && this.context.user ? this.context.user : undefined;
    const loading = this.context?.loading ?? undefined;
    const { first_name, last_name, email, password, confirmPassword, message } = this.state;

    if (loading) return <div>Loading dashboard...</div>;
    // if (!user) return <div>You are not logged in.</div>;

    return (
      <div style={{

        padding: '1rem',
        margin: '0.5rem',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '30%',
        width: '100vw',
        backgroundColor: 'rgba(113, 197, 151, 0.305)',
      }}>
        <h1>Dashboard</h1>
        <p><strong>Logged in as:</strong> {user.username}</p>
        <button name={'dashboard-btn'} type={'button'} onClick={this.handleLogout}>Logout</button>

        <hr />

        <h2>Edit Profile</h2>
        <form onSubmit={this.handleProfileUpdate}>
          <label>
            First Name:
            <input type={'text'} name={'first_name'} value={first_name} onChange={this.handleChange} />
          </label>
          <br />
           <label>
             Last Name:
            <input type={'text'} name={'last_name'} value={last_name} onChange={this.handleChange} />
           </label>
           <br />
          <label>
            Email:
            <input type={'email'} name={'email'} value={email} onChange={this.handleChange} />
          </label>
          <br />
          <button name={'profile-btn'}  type={'submit'}>Update Profile</button>
        </form>

        <hr />

        <h2>Change Password</h2>
        <form onSubmit={this.handlePasswordChange}>
          <label>
            New Password: 
            <input type={'password'} name={'password'} value={password} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Confirm Password:
            <input type={'password'} name={'confirmPassword'} value={confirmPassword} onChange={this.handleChange} />
          </label>
          <br />
          <button type={'submit'}>Change Password</button>
        </form>

        {message && <div><p>Dashboard Error</p> <p style={{ color: 'green' }}>{message}</p></div>}
      </div>
    );
  }
}

