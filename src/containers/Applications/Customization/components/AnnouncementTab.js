import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import BooleanInput from '../../../../shared/components/BooleanInput';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import { FormLabel } from '@material-ui/core';
import ColorPicker from '../../../../shared/components/color_picker_input/ColorPicker.js';
import { TextField } from './styles';

import './styles.css';

const defaultState = {
    isActive: false,
    backgroundColor: '#000',
    textColor: '#000',
    text: '',
    locked: true,
    isLoading: false
}

const labelStyle = {
    fontFamily: "Poppins", 
    fontSize: 16, 
    color: "#646777"
}

const cardStyle = {
    margin: 10, 
    borderRadius: "10px", 
    border: "solid 1px rgba(164, 161, 161, 0.35)", 
    backgroundColor: "#fafcff", 
    boxShadow: "none"
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
        const { profile } = props;

        const customization = profile.getApp().getCustomization();

        const { topBar } = customization;
        const { isActive, backgroundColor, textColor, text } = topBar;

        this.setState({ 
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

    onChange = ({ type, value }) => {
        this.setState({ [type]: value })
    }

    unlockField = () => {
        this.setState({ locked: false})
    }

    lockField = () => {
        this.setState({ locked: true})
    }

    confirmChanges = async () => {
        const { profile } = this.props;

        this.setState({ isLoading: true });

        await profile.getApp().editTopBarCustomization(this.state);

        this.setState({ isLoading: false, locked: true });

        this.projectData(this.props);
    }

    render() {
        const { isLoading, locked, isActive, textColor, backgroundColor, text } = this.state; 

        return (
            <Card>
                <CardBody style={cardStyle}>
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
                                <div style={{ marginBottom: 10 }}>
                                    <FormLabel component="legend" style={labelStyle}>{ isActive ? "Active" : "Inactive" }</FormLabel>
                                    <BooleanInput
                                        checked={isActive} 
                                        onChange={this.onChange}
                                        disabled={locked}
                                        type={'isActive'}
                                        id={'isactive'}
                                    />
                                </div>
                                <FormLabel component="legend" style={labelStyle}>Announcement Text</FormLabel>
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
