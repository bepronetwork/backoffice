import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import TextInput from '../../../../shared/components/TextInput';
import BooleanInput from '../../../../shared/components/BooleanInput';
import { Col, Row, Card, CardBody, CustomInput, Form } from 'reactstrap';
import { connect } from "react-redux";
import { FormControlLabel } from '@material-ui/core';
import ColorPicker from '../../../../shared/components/color_picker_input/ColorPicker.js';
import { TextField, Label } from './styles';
import Switch from '../../../../shared/components/Switch.js';

const defaultState = {
    isActive: false,
    backgroundColor: '#000',
    textColor: '#000',
    text: '',
    locked: true,
    isLoading: false
}

class AnnouncementTab extends Component {
    constructor(props){
        super(props);
        this.state = defaultState;
    }


    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        const { locked } = this.state;

        if (locked) {
            this.projectData(props);
        }
    }

    projectData = async (props) => {
        const { topBar } = props.profile.getApp().getCustomization();
        const { isActive, backgroundColor, textColor, text } = topBar;
        this.setState({...this.state, 
            isActive,
            backgroundColor,
            textColor,
            text
        })
    }

    onChangeText = (value) => {
        this.setState({
            text: value ? value : ""
        })
    }

    onChange = ({type, value}) => {
        this.setState({...this.state, [type] : value })
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
        await profile.getApp().editTopBarCustomization(this.state);
        this.setState({...this.state, isLoading : false, locked: true})
        this.projectData(this.props);
    }


    render() {
        const { isLoading, locked, isActive, textColor, backgroundColor, text } = this.state; 

        return (
            <Card>
                <CardBody style={{ margin: 10, borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                    <Row>
                        <Col md={12}>
                            <EditLock 
                                isLoading={isLoading} 
                                unlockField={this.unlockField} 
                                lockField={this.lockField} 
                                confirmChanges={this.confirmChanges} 
                                type={'announcementTab'} 
                                locked={locked}
                            >
                                {/* <TextInput
                                    label={'Announcement Text'}
                                    name={'text'}
                                    type={'text'} 
                                    value={text}
                                    defaultValue={text}
                                    disabled={locked}
                                    changeContent={(type, value) => this.onChange({type, value})}
                                /> */}
                                <Label>Announcement Text</Label>
                                <TextField placeholder="Type here" disabled={locked} value={text} onChange={(e) => this.onChangeText(e.target.value)}/>
                                <ColorPicker 
                                    label={'Text Color'}
                                    name={'textColor'}
                                    color={textColor}
                                    disabled={locked}
                                    onChange={this.onChange}
                                />
                                <ColorPicker
                                    label={'Background Color'}
                                    name={'backgroundColor'}
                                    color={backgroundColor}
                                    disabled={locked}
                                    onChange={this.onChange}
                                />
                                <FormControlLabel
                                style={{margin: 0, padding: 0}}
                                control={
                                    <BooleanInput
                                        checked={isActive} 
                                        onChange={this.onChange}
                                        disabled={locked}
                                        type={'isActive'}
                                        id={'check-active-101'}
                                    />
                                }
                                label={isActive ? <h4 style={{fontSize: 16}}>Active</h4> 
                                : <h4 style={{ fontSize: 16}}>Inactive</h4>}
                                labelPlacement="top"
                                />  
                            </EditLock>
                        </Col>
                    </Row>
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

export default connect(mapStateToProps)(AnnouncementTab);
