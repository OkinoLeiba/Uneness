import React, { Component } from 'react';
import '../styles/select-dropdown.css'; // We'll define styles here
import { FaPlus, FaHeart } from 'react-icons/fa'; // Example icons
import { MdOndemandVideo, MdOutlineTextSnippet } from "react-icons/md";

interface Props {
 name: string;
 dropdownText: string;
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
        <button className="dropdown-btn" onClick={this.toggleDropdown}>
          <FaPlus className="icon-left" />
          <span className="dropdown-label">{this.props.name}</span>
        </button>

        {this.state.isOpen && (
            <div className="dropdown-content">
                <div className="dropdown-icons">
                    <MdOndemandVideo className="dropdown-icon" />
                    <FaHeart className="dropdown-icon" />
                    <MdOutlineTextSnippet className="dropdown-icon" />
                 </div>
                <div className="dropdown-box">
              <p className="dropdown-text">{this.props.dropdownText}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
