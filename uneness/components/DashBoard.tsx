import React, { Component, ChangeEvent, FormEvent } from 'react';
import { AuthContext } from '../services/authContextClass';

/**
 * @typedef {Object} DashboardState
 * @description Represents the internal state of the Dashboard component.
 * Used to manage form inputs and feedback messages. 
 *
 * @property {string} username - The user's current or updated username.
 * @property {string} email - The user's current or updated email address.
 * @property {string} password - The new password entered by the user.
 * @property {string} confirmPassword - Confirmation of the new password for validation.
 * @property {string} message - A message string used to display feedback to the user.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-11
 */

interface DashboardState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  message: string;
}

export default class Dashboard extends Component<object, DashboardState> {
  static contextType = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;

  constructor(props: DashboardState) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      message: '',
    };
  }
  
  componentDidMount() {
    const { user } = this.context;
    if (user) {
      this.setState({
        username: user.username,
        email: user.email,
      });
    }
  }

  handleLogout = async () => {
    try {
      await this.context.logout();
    } catch (error) {
      this.setState({ message: `Logout failed - ${error}` });
    }
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<DashboardState, keyof DashboardState>);
  };

  handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();
    const { username, email } = this.state;
    try {
      await this.context.updateProfile({ username, email });
      this.setState({ message: 'Profile updated successfully!' });
    } catch (error) {
      this.setState({ message: `Failed to update profile - ${error}` });
    }
  };

  handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({ message: 'Passwords do not match.' });
      return;
    }
    try {
      await this.context.changePassword(password);
      this.setState({ message: 'Password changed successfully!', password: '', confirmPassword: '' });
    } catch (error) {
      this.setState({ message: `Failed to change password - ${error}` });
    }
  };

  render() {
    const { user, loading } = this.context;
    const { username, email, password, confirmPassword, message } = this.state;

    if (loading) return <div>Loading dashboard...</div>;
    if (!user) return <div>You are not logged in.</div>;

    return (
      <div style={{ padding: '2rem', maxWidth: '600px' }}>
        <h1>Dashboard</h1>
        <p><strong>Logged in as:</strong> {user.username}</p>
        <button onClick={this.handleLogout}>Logout</button>

        <hr />

        <h2>Edit Profile</h2>
        <form onSubmit={this.handleProfileUpdate}>
          <label>
            Username:
            <input type="text" name="username" value={username} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={email} onChange={this.handleChange} />
          </label>
          <br />
          <button type="submit">Update Profile</button>
        </form>

        <hr />

        <h2>Change Password</h2>
        <form onSubmit={this.handlePasswordChange}>
          <label>
            New Password:
            <input type="password" name="password" value={password} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Confirm Password:
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} />
          </label>
          <br />
          <button type="submit">Change Password</button>
        </form>

        {message && <><p>Dashboard Error</p> <p style={{ color: 'green' }}>{message}</p></>}
      </div>
    );
  }
}

