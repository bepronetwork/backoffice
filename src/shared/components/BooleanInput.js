import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

const PurpleSwitch = withStyles({
    switchBase: {
      color: '#805294',
      '&$checked': {
        color: '#805294',
      },
      '&$checked + $track': {
        backgroundColor: '#805294',
      },
    },
    checked: {},
    track: {},
  })(Switch);

class BooleanInput extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { onChange, checked, id, type, disabled } = this.props;
        return (
            <PurpleSwitch 
                color="primary" 
                checked={checked} 
                onChange={() => onChange({type, value : !checked})} 
                value={id} 
                disabled={disabled}
                inputProps={{ 'aria-label': 'primary checkbox' }} 
            />
        );
    }
}

export default BooleanInput;


