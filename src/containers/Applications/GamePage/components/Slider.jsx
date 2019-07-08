import React from 'react';
import Slider from '../../../../shared/components/range_slider/Range';

class SliderContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value : null
        }
    }   

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = (props) => {
        let { value } = props;
        this.setState({value : value})
    }

    onChange = (value) => {
        this.props.onChange({
            type : 'edge',
            value
        })
    }


    render = () => {
        return (
            <Slider disabled={this.props.disabled} min={0} max={20} value={this.props.value ? [this.props.value] : null} onChange={this.onChange}/>
        )
    }
};

export default SliderContainer;
