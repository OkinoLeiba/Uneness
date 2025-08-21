import React from 'react';
import '../styles/video-modal.css';

interface Props {
    videoUrl?: string;
    onClose?: () => void;
    open: boolean;
}

// interface State {
    // 
// }

export default class VideoModal extends React.Component<Props, object> {
    constructor(props: Props) {
        super(props);
        this.state = {
            open: props.open || false,  
        };
    } 

    handleClose = () => {
        // Invoke the parent’s method
        this.props.onClose?.();
    }
    // onClose = () => {
        // this.setState(open, () => false);
    // }

  render() {
    return (
        <div>
        {
        this.props.open ? (
            <div className='video-overlay'>
                <div className='video-content'>
                  <button name={'close-video-btn'} type={'button'} className='close-btn' onClick={this.handleClose}>×</button>
                        {/* <iframe 
                    // width='100%'
                    // height='100%'
                    // src={this.props.videoUrl}
                    // title='Video Player'
                    // frameBorder='0'
                    // allowFullScreen
                    // /> */}
                    <iframe
                        width='100%'
                        height='100%'
                        src={this.props.videoUrl}
                        title='YouTube video player'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        referrerPolicy='strict-origin-when-cross-origin'
                        allowFullScreen
                    />
                </div>
            </div> 
            ): null} 
       </div>
    );
  }
}


