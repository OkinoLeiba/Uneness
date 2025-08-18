import React, { Component, type MouseEventHandler } from 'react';
import '../styles/video-modal.css';

interface Props {
    videoUrl: string;
    close?: boolean;
}

export default class VideoModal extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            videoUrl: props.videoUrl || '',
            close: props.close || true,
        
        };
    } 

    onClose = () => {
        this.setState(close, () => false);
    }

  render() {
    return (
        <div className="video-overlay">
            {close ? (
                <div className="video-content">
                  <button className="close-btn" onClick={this.onClose}>×</button>
                        {/* <iframe 
                    // width="100%"
                    // height="100%"
                    // src={this.props.videoUrl}
                    // title="Video Player"
                    // frameBorder="0"
                    // allowFullScreen
                    // /> */}
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=OGOP4KUpldhsN8mA"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>
            ): null} 
        </div> 
    );
  }
}


