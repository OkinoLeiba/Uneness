import React from 'react';
import '../styles/select-dropdown.css'; // We'll define styles here
import { FaPlus, FaHeart } from 'react-icons/fa'; // Example icons
import { MdOndemandVideo, MdOutlineTextSnippet } from 'react-icons/md';

/**
 * @typedef {Object} Props
 * @description Props for a dropdown component that optionally includes a video and triggers an open action.
 *
 * Display Content
 * @property {string} name - Label or identifier for the dropdown trigger.
 * @property {string} dropdownText - Text content displayed within the dropdown.
 *
 * Optional Media
 * @property {string} [videoUrl] - Optional URL to a video resource embedded in the dropdown.
 *
 * Interaction
 * @property {function(): void} onOpen - Callback function triggered when the dropdown is opened.
 *
 * @author Okino
 * @version 1.0
 * @since 2025-08-21
 */

/**
 * @typedef {Object} State
 * @description Internal state for managing dropdown visibility.
 *
 * @property {boolean} isOpen - Indicates whether the dropdown is currently expanded.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

interface Props {
 name: string;
 dropdownText: string;
 videoUrl?: string;
 onOpen: () => void;
}

interface State {
  isOpen: boolean;
}

export default class OvalDropdown extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleDropdown = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  };

  render() {
    return (
      <div className={'dropdown-container'}>
        <button name={'dropdown-btn'} type={'button'} className={'dropdown-btn'} onClick={this.toggleDropdown}>
          <FaPlus className={'icon-left'} />
          <span className={'dropdown-label'}>{this.props.name}</span>
        </button>

        {this.state.isOpen && (
            <div className={'dropdown-content'}>
                <div className={'dropdown-icons'}>
                  <button
                  name={'exercise-video-btn'}
                  title={'exercise-video-btn'}
                  type={'button'}
                  onClick={this.props.onOpen}
                  className={'icon-btn'}
                  ><MdOndemandVideo className={'dropdown-icon'} />
                  </button>
                  <button
                  name={'fav-video-btn'}
                  title={'fav-video-btn'}
                  type={'button'}
                  className={'icon-btn'}
                  ><FaHeart className={'dropdown-icon'} />
                  </button>
                  <button
                  name={'instruction-video-btn'}
                  title={'instruction-video-btn'}
                  type={'button'}
                  className={'icon-btn'}
                  ><MdOutlineTextSnippet className={'dropdown-icon'} />
                  </button>
                </div>
                <div className={'dropdown-box'}>
              <p className={'dropdown-text'}>{this.props.dropdownText}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
