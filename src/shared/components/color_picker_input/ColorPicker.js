import React from 'react';
import Twitter from '../ReactColor/components/twitter/Twitter';

import './ColorPickerInput.css';

const defaultState = {
    background: '#000'
}

class ColorPicker extends React.Component {
    
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
            <Twitter
                width="600px"
                color={ this.state.background }
                onChangeComplete={this.onChange}
            />
            </div>
        );
    }
}

export default ColorPicker;



