import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import TextInput from '../../../../shared/components/TextInput';
import BooleanInput from '../../../../shared/components/BooleanInput';
import ColorPickerInput from '../../../../shared/components/color_picker_input/ColorPickerInput';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";


const defaultState = {
    locked: true,
    colors : [],
    isLoading: false
}

class Colors extends Component {
    constructor(props){
        super(props);
        this.state = defaultState;
    }


    componentDidMount(){
        this.projectData(this.props)
    }

    projectData = async (props) => {
        const { colors } = props.profile.getApp().getCustomization();
        this.setState({...this.state, 
            colors,
        })
    }

    onChange = ({type, value}) => {
        let colors = this.state.colors;
        let changedColorIndex = colors.findIndex(c => c.type == type);
        colors[changedColorIndex].hex = value;
        this.setState({...this.state, colors})
    }

    unlockField = () => {
        this.setState({...this.state, locked : false})
    }

    lockField = () => {
        this.setState({...this.state, locked : true})
    }

    confirmChanges = async () => {
        var { profile } = this.props;
        this.setState({...this.state, isLoading : true});
        const { colors } = this.state;
        await profile.getApp().editColorsCustomization({colors});
        this.setState({...this.state, isLoading : false, locked: true})
        this.projectData(this.props);
    }

    renderColor = ({hex, type, locked}) => {
        return (
            <>
                <p>{type}</p>
                <ColorPickerInput 
                    label={type}
                    name={type}
                    color={hex}
                    disabled={locked}
                    onChange={this.onChange}
                />
            </>
        )
    }


    render() {
        const { isLoading, locked, colors } = this.state; 

        return (
            <Card>
                <CardBody>
                    <EditLock 
                        isLoading={isLoading} 
                        unlockField={this.unlockField} 
                        lockField={this.lockField} 
                        confirmChanges={this.confirmChanges} 
                        type={'color'} 
                        locked={locked}
                    >
                        <Row>
                            {colors.map ( c => { 
                                return (
                                    <Col md={4}>
                                        {this.renderColor({type : c.type, hex : c.hex, locked})}
                                    </Col>
                                )
                            })}
                        </Row>
                    </EditLock>
                </CardBody>
            </Card>
            )
        }
}

function mapStateToProps(state){
  return {
      profile: state.profile
  };
}

export default connect(mapStateToProps)(Colors);
