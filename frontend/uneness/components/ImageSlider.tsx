import React from 'react';
import '../styles/image-slider.css';

interface Props {
  width: string | number;
  height: string | number;
  srcLeft: string;
  altLeft: string;
  srcRight: string;
  altRight: string;
  backgroundColor?: string;
  knobColor?: string;
  className: string;
  onToggle?: (isOn: boolean) => void;
}

interface State {
  isOn: boolean;
}

export default class  extends React.Component<Props, State>{
  state: State = {
    isOn: false,
  };

  toggle = () => {
    this.setState(
      prev => ({ isOn: !prev.isOn }),
      () => {
        if (this.props.onToggle) {
          this.props.onToggle(this.state.isOn);
        }
      }
    );
  };

  render() {
    const {
      width,
      height,
      srcLeft,
      altLeft,
      srcRight,
      altRight,
      backgroundColor = '#bd0b0bff',
      knobColor = '#13084eff',
    } = this.props;
    const { isOn } = this.state;

    // Normalize width/height to CSS strings
    const widthValue =
      typeof width === 'number' ? `${width}px` : width;
    const heightValue =
      typeof height === 'number' ? `${height}px` : height;

    // Style for the oval track
    const trackStyle: React.CSSProperties = {
      width: widthValue,
      height: heightValue,
      backgroundColor,
      borderRadius: `calc(${heightValue} / 2)`,
      position: 'relative',
      cursor: 'pointer',
      userSelect: 'none',
      overflow: 'hidden',
    };

    // The knob is a circle whose diameter equals the track height
    const knobStyle: React.CSSProperties = {
      width: heightValue,
      height: heightValue,
      backgroundColor: knobColor,
      borderRadius: '50%',
      position: 'absolute',
      top: 0,
      left: isOn
        ? `calc(100% - ${heightValue})`
        : 0,
      transition: 'left 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    // Image inside the knob—scaled to fit
    const imageStyle: React.CSSProperties = {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'fill',

      width: '100%',
      height: '100%',
      borderRadius: '50%',

    };

    return (
      <div style={trackStyle} onClick={this.toggle}>
        <div style={knobStyle}>
          <img
            src={isOn ? srcRight : srcLeft}
            alt={isOn ? altRight : altLeft}
            style={imageStyle}
          />
        </div>
        {/*<label className={'switch'}>
  Label
  <input
  type={'checkbox'}
  name={'img-slider-checkbox'}
  required
  className={'img-slider-checkbox'} />
  <span className={'slider round'}></span>
</label> */}
      </div>
    );
  }
}


