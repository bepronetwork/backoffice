import React from 'react';
import { CompactPicker } from 'react-color';

import './ColorPickerInput.css';

class ColorPickerInput extends React.Component {
  state = {
    background: this.props.color,
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
    this.props.changeContent(this.props.name, this.state.background)
  };

  render() {
    console.log(this.state)
    return (
        <div disabled={this.props.disabled} className='colorContainer' >
          <h4 className='title'>{this.props.label}</h4>
          <CompactPicker
            color={ this.state.background }
            onChangeComplete={this.handleChangeComplete}
          />
        </div>
    );
  }
}

export default ColorPickerInput;



