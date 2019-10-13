import React from 'react';
import { CompactPicker } from 'react-color';

import './ColorPickerInput.css';

const defaultState = {
    background: '#000'
}

class ColorPickerInput extends React.Component {
    
    constructor(props){
        super(props);
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { color } = props;
        this.setState({ background : color })
    }

    onChange = (color) => {
        this.props.onChange({type : this.props.name, value : color.hex});
    };

    render() {
        return (
            <div disabled={this.props.disabled} className='colorContainer' >
            <h4 className='title'>{this.props.label}</h4>
            <CompactPicker
                color={ this.state.background }
                onChangeComplete={this.onChange}
            />
            </div>
        );
    }
}

export default ColorPickerInput;



