import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';

class BooleanInput extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { onChange, checked, id, type, disabled } = this.props;
        return (
            <Switch 
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


