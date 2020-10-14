import React, { Component } from 'react'
import EditLock from '../../../../Shared/EditLock.js';
import { connect } from "react-redux";
import _ from 'lodash';

import './styles.css';
import { Container, Header, Content, SubSectionsList, CreateNewSubSection } from './styles';


import { Select, Checkbox } from 'antd';

import SubSection from './SubSection';
import AddSection from './AddSection';
import EditSubSection from './EditSubSection';
import { PlusIcon } from 'mdi-react';

import styled from 'styled-components'
import { FormLabel } from '@material-ui/core';

const { Option } = Select;

const labelStyle = {
    fontFamily: "Poppins", 
    fontSize: 16, 
    color: "#646777",
    padding: 10
}

const Text = styled.span`
    font-family: Poppins;
    font-size: 13px;
`;

class SubSections extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            locked: true,
            open: false,
            openNewSubSection: false,
            editedSubSection: null,
            language: 'EN'
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { language } = this.state;

        await this.fetchLanguageData(language)
    }
    
    fetchLanguageData = async (language) => {
        const { profile } = this.props;

        const customization = await profile.getApp().getCustomization();

        const { subSections } = customization;

        const languages = subSections.languages.map(l => l.language);
        const sections = subSections.languages.find(l => l.language.prefix === language);

        const { ids, useStandardLanguage } = sections;

        this.setState({ 
            language,
            languages,
            useStandardLanguage,
            subSections: !_.isEmpty(ids) ? ids : [] 
        })
    }

    getLanguageImage = language => (
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <img src={language.logo} alt={language.logo} style={{ height: 20, width: 20, margin: "0px 5px" }}/>
            <Text>{language.name}</Text>
        </div>
    )

    setSubSections = ({ newSubSections }) => {
        this.setState({ subSections: newSubSections })
    }

    confirmChanges = async () => {
        const { subSections, language, languages, useStandardLanguage } = this.state;
        const { profile } = this.props;

        const filteredSubsections = subSections.map(({_id, ...rest}) => rest);
        
        this.setState({ isLoading: true })

        const lang = languages.find(l => l.prefix === language)

        await profile.getApp().editSubsectionsCustomization({ subSections: filteredSubsections, language: lang._id, useStandardLanguage });

        await profile.getApp().updateAppInfoAsync();
        await profile.update();

        this.setState({ isLoading: false, locked: true })
    }

    unlockField = () => {
        this.setState({ locked: false })
    }

    lockField = () => {
        this.setState({ locked: true })
    }

    onChange = ({ type, value }) => {
        this.setState({ [type]: value })
    }

    onChangeLanguage = async (value) => {
        this.setState({
            language: value ? value : ""
        })

        await this.fetchLanguageData(value)
    }

    handleOpen = ({ id }) => {
        const { subSections } = this.state;

        const editedSubSection = subSections.find(subSection => subSection._id === id);

        this.setState({ editedSubSection: editedSubSection, open: true })
    }

    handleClose = () => {
        this.setState({ editedSubSection: null, open: false, openNewSubSection: false })
    }

    handleOpenNewSubSection = () => {
        this.setState({ openNewSubSection: true });
    }

    render() {
        const { isLoading, locked, subSections, editedSubSection, open, openNewSubSection, languages, useStandardLanguage, language } = this.state;
        
        return (
            <Container>
                <EditLock 
                isLoading={isLoading} 
                unlockField={this.unlockField} 
                lockField={this.lockField} 
                confirmChanges={this.confirmChanges} 
                locked={locked}>
                    <FormLabel component="legend" style={labelStyle}>Language</FormLabel>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", margin: "5px 0px", marginTop: 20, padding: "0px 10px" }}>
                            <Select
                            defaultValue="EN"
                            style={{ minWidth: 130 }}    
                            placeholder="Language"
                            onChange={this.onChangeLanguage}
                            disabled={isLoading || locked}
                            >
                                { languages && languages.filter(language => language.isActivated).map(language => (
                                    <Option key={language.prefix}>{this.getLanguageImage(language)}</Option>
                                ))}
                            </Select>
                            { language !== 'EN' && (
                                <Checkbox style={{ marginLeft: 10 }} disabled={isLoading || locked} checked={useStandardLanguage} onChange={() => this.setState({ useStandardLanguage: !useStandardLanguage})}>Use the English Language Setup</Checkbox>
                            )}
                        </div>
                        <br/>
                    <Header>
                        <h1>You can create a new subsection or edit existing ones</h1>
                        <br/>
                        <CreateNewSubSection onClick={() => this.handleOpenNewSubSection()} disabled={locked}>
                            <PlusIcon/> Create a new Subsection
                        </CreateNewSubSection>
                    </Header>
                    <Content>
                        <AddSection setSubSections={this.setSubSections} subSections={subSections} locked={locked} open={openNewSubSection} setClose={this.handleClose}/>

                        { !_.isEmpty(subSections) && (
                            <>
                                <h1>Subsections</h1>

                                <EditSubSection subSections={subSections} setSubSections={this.setSubSections} subSection={editedSubSection} open={open} setClose={this.handleClose}/>
                                <SubSectionsList>
                                    { !_.isEmpty(subSections) && subSections.map(subSection => (
                                        <SubSection setSubSections={this.setSubSections} subSection={subSection} subSections={subSections} setOpen={this.handleOpen} locked={locked}/>
                                    ))}
                                </SubSectionsList>
                            </>
                        )}
                    </Content>
                </EditLock>
            </Container>
        )
    }   
}

function mapStateToProps(state){
  return {
      profile: state.profile
  };
}

export default connect(mapStateToProps)(SubSections);
