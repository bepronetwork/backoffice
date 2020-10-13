import React, { Component } from 'react'
import EditLock from '../../../../Shared/EditLock.js';
import { connect } from "react-redux";
import _ from 'lodash';

import './styles.css';
import { Container, Header, Content, SubSectionsList, CreateNewSubSection } from './styles';

import SubSection from './SubSection';
import AddSection from './AddSection';
import EditSubSection from './EditSubSection';
import { PlusIcon } from 'mdi-react';

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
        const { profile } = props;

        const customization = await profile.getApp().getCustomization();

        const { subSections } = customization;

        const sections = subSections.languages.find(l => l.language.prefix === language);

        const { ids } = sections;

        this.setState({ subSections: !_.isEmpty(ids) ? ids : [] })
    }

    setSubSections = ({ newSubSections }) => {
        this.setState({ subSections: newSubSections })
    }

    confirmChanges = async () => {
        const { subSections } = this.state;
        const { profile } = this.props;

        const filteredSubsections = subSections.map(({_id, ...rest}) => rest);
        
        this.setState({ isLoading: true })

        await profile.getApp().editSubsectionsCustomization({ subSections: filteredSubsections });

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
        const { isLoading, locked, subSections, editedSubSection, open, openNewSubSection } = this.state;
        
        return (
            <Container>
                <EditLock 
                isLoading={isLoading} 
                unlockField={this.unlockField} 
                lockField={this.lockField} 
                confirmChanges={this.confirmChanges} 
                locked={locked}>
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
