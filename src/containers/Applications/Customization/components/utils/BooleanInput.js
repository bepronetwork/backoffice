import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

const PurpleSwitch = withStyles({
    switchBase: {
      color: purple[300],
      '&$checked': {
        color: purple[500],
      },
      '&$checked + $track': {
        backgroundColor: purple[500],
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


