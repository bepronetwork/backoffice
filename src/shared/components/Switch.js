import React, { Component } from 'react';
import { CustomInput } from 'reactstrap';


class Switch extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { onChange, checked, id, type, disabled } = this.props;
        return ( 
            <CustomInput
                type="switch"
                color="primary" 
                checked={checked} 
                onChange={() => onChange({type, value : !checked})} 
                disabled={disabled}
            />
        );
    }
}

export default Switch;


