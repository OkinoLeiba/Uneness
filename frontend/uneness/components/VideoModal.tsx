import React, { Component, MouseEventHandler } from 'react';
import '../styles/video-modal.css';

interface Props {
    videoUrl: string;
    onClose: MouseEventHandler;
}

export default class VideoModal extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            videoUrl: props.videoUrl || '',
            onClose: props.onClose,
        
        };
    }

  render() {
    return (
      <div className="video-overlay">
        <div className="video-content">
          <button className="close-btn" onClick={this.props.onClose}>×</button>
          <iframe
            width="70%"
            height="70%"
            src={this.props.videoUrl}
            title="Video Player"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    );
  }
}


