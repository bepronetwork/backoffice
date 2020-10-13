import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import BooleanInput from '../../../../shared/components/BooleanInput';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import { FormLabel } from '@material-ui/core';
import ColorPicker from '../../../../shared/components/color_picker_input/ColorPicker.js';
import { TextField } from './styles';

import styled from 'styled-components'

import { Select, Checkbox } from 'antd';

import './styles.css';

const { Option } = Select;

const defaultState = {
    isActive: false,
    backgroundColor: '#000',
    textColor: '#000',
    text: '',
    locked: true,
    isLoading: false,
    language: 'EN'
}

const labelStyle = {
    fontFamily: "Poppins", 
    fontSize: 16, 
    color: "#646777",
    marginBottom: 10
}

const cardStyle = {
    margin: 10, 
    borderRadius: "10px", 
    border: "solid 1px rgba(164, 161, 161, 0.35)", 
    backgroundColor: "#fafcff", 
    boxShadow: "none"
}

const Text = styled.span`
    font-family: Poppins;
    font-size: 13px;
`;

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
        const { language } = this.state;
        const { profile } = props;

        const customization = profile.getApp().getCustomization();

        const { topBar } = customization;

        const languages = topBar.languages.map(l => l.language);
        const bar = topBar.languages.find(l => l.language.prefix === language);

        const { isActive, backgroundColor, textColor, text, useStandardLanguage } = bar;

        this.setState({ 
            languages: languages,
            useStandardLanguage: useStandardLanguage,
            isActive,
            backgroundColor,
            textColor,
            text
        })
    }

    getLanguageImage = language => (
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <img src={language.logo} alt={language.logo} style={{ height: 20, width: 20, margin: "0px 5px" }}/>
            <Text>{language.name}</Text>
        </div>
    )

    onChangeText = (value) => {
        this.setState({
            text: value ? value : ""
        })
    }

    onChangeLanguage = (value) => {
        this.setState({
            language: value ? value : ""
        })

        this.projectData(this.props)
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
        const { textColor, backgroundColor, text, isActive, language, useStandardLanguage, languages } = this.state;

        const lang = languages.find(l => l.prefix === language)

        this.setState({ isLoading: true });

        await profile.getApp().editTopBarCustomization({ textColor, backgroundColor, text, isActive, language: lang._id, useStandardLanguage });

        this.setState({ isLoading: false, locked: true });

        this.projectData(this.props);
    }

    render() {
        const { isLoading, locked, isActive, textColor, backgroundColor, text, languages, useStandardLanguage } = this.state;

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
                            >   <FormLabel component="legend" style={labelStyle}>Language</FormLabel>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", margin: "5px 0px", marginTop: 20 }}>
                                    <Select
                                    defaultValue="EN"
                                    style={{ minWidth: 130 }}    
                                    placeholder="Language"
                                    onChange={this.onChangeLanguage}
                                    disabled={isLoading || locked}
                                    >
                                        { languages && languages.map(language => (
                                            <Option key={language.prefix}>{this.getLanguageImage(language)}</Option>
                                        ))}
                                    </Select>
                                    <Checkbox style={{ marginLeft: 10 }} disabled={isLoading || locked} checked={useStandardLanguage} onChange={() => this.setState({ useStandardLanguage: !useStandardLanguage})}>Use default language</Checkbox>
                                </div>
                                <br/>
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
