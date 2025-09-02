import React from 'react';
import '../styles/image-slider.css';

/**
 * @typedef {Object} Props
 * @description Configuration for an oval toggle slider component that switches between two images inside a circular knob.
 *
 * Track Properties
 * @property {string|number} width - Width of the slider track (e.g., '100%', 300).
 * @property {string|number} height - Height of the slider track (e.g., '50px', 50).
 * @property {string} [backgroundColor] - Optional background color of the track.
 *
 * Knob Properties
 * @property {string} [knobColor] - Optional background color of the circular knob.
 * @property {string} className - CSS class name(s) to apply to the slider container.
 *
 * Left Image Properties
 * @property {string} srcLeft - Image source URL displayed when the slider is off/left.
 * @property {string} altLeft - Alternative text for the left-state image.
 *
 * Right Image Properties
 * @property {string} srcRight - Image source URL displayed when the slider is on/right.
 * @property {string} altRight - Alternative text for the right-state image.
 *
 * Event Handler
 * @property {function(boolean): void} [onToggle] - Callback invoked after a toggle, receives the new state (true for right/on, false for left/off).
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

/**
 * @typedef {Object} State
 * @description Internal state for the toggle slider component.
 *
 * @property {boolean} isOn - Indicates whether the slider is in the on/right position.
 */

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

export default class extends React.Component<Props, State>{
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

  /*
  Took different approach and added css properties to class component 
  minimal css properties were needed and could be managed local
  */

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

    // Normalize width/height to CSS strings props declared sting and number
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


