import React, { Component } from 'react';
import '../styles/select-dropdown.css'; // We'll define styles here
import { FaPlus, FaStar, FaHeart, FaCog } from 'react-icons/fa'; // Example icons

interface Props {
  label: string;
}

interface State {
  isOpen: boolean;
}

export default class OvalDropdown extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleDropdown = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  };

  render() {
    return (
      <div className="dropdown-container">
        <button className="dropdown-button" onClick={this.toggleDropdown}>
          <FaPlus className="icon-left" />
          <span className="dropdown-label">{this.props.label}</span>
        </button>

        {this.state.isOpen && (
            <div className="dropdown-content">
                <div className="dropdown-icons">
                    <FaStar className="dropdown-icon" />
                    <FaHeart className="dropdown-icon" />
                    <FaCog className="dropdown-icon" />
                 </div>
                <div className="dropdown-box">
              <p className="dropdown-text">Choose an action:</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
