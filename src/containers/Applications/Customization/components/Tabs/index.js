import React, { Component } from 'react'
import EditLock from '../../../../Shared/EditLock.js';
import { connect } from "react-redux";
import _ from 'lodash';

import './styles.css';
import { Container, TabsPreview, Text, TabsList, TabPreview, TabIcon, TabTitle } from './styles';
import AddTab from './AddTab.js';
import Tab from './Tab.js';

import { ButtonBase, FormLabel } from '@material-ui/core';
import BooleanInput from '../../../../../shared/components/BooleanInput.js';

const labelStyle = {
    fontFamily: "Poppins", 
    fontSize: 16, 
    color: "#646777"
}

class Tabs extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            locked: true,
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

        const { topTab } = customization;

        const tab = topTab.languages.find(l => l.language.prefix === language);

        const { ids, isTransparent } = tab;

        this.setState({
            tabs: !_.isEmpty(ids) ? ids : [],
            isTransparent: isTransparent
        })
    }

    setTabs = ({ newTabs }) => {
        this.setState({
            tabs: newTabs
        })
    }

    
    renderImage = (src) => {
        if(!src.includes("https")){
            src = "data:image;base64," + src;
        }

        return src;
    }

    confirmChanges = async () => {
        const { tabs, isTransparent } = this.state;
        const { profile } = this.props;

        const filteredTabs = tabs.map(({_id, ...rest}) => rest);
        
        this.setState({
            isLoading: true
        })

        await profile.getApp().editTopTabCustomization({ topTabParams: filteredTabs, isTransparent: isTransparent });

        await profile.getApp().updateAppInfoAsync();
        await profile.update();

        this.setState({
            isLoading: false,
            locked: true
        })
    }

    unlockField = () => {
        this.setState({
            locked: false
        })
    }

    lockField = () => {
        this.setState({
            locked: true
        })
    }

    onChange = ({ type, value }) => {
        this.setState({ [type]: value })
    }

    render() {
        const { isLoading, locked, tabs, isTransparent } = this.state;
        
        return (
            <Container>
                <EditLock 
                isLoading={isLoading} 
                unlockField={this.unlockField} 
                lockField={this.lockField} 
                confirmChanges={this.confirmChanges} 
                locked={locked}>
                    <div style={{ margin: "10px 0px" }}>
                        <FormLabel component="legend" style={labelStyle}>{ `Style (${isTransparent ? "Transparent" : "Normal"})` }</FormLabel>
                        <BooleanInput
                            checked={isTransparent === true} 
                            onChange={this.onChange}
                            disabled={locked}
                            type={'isTransparent'}
                            id={'istransparent'}
                        />
                    </div>
                    <Text>Preview</Text>
                    <TabsPreview hasTabs={!_.isEmpty(tabs)} locked={locked}>
                        { !_.isEmpty(tabs) ? tabs.map(tab => (
                            <ButtonBase>
                                <TabPreview target="_blank" href={tab.link_url}>
                                    <TabIcon>
                                        { !_.isEmpty(tab.icon) ? <img src={this.renderImage(tab.icon)} alt="icon" /> : null }
                                    </TabIcon>
                                    <TabTitle>
                                        { tab.name }
                                    </TabTitle>
                                </TabPreview>
                            </ButtonBase>
                        )) : <span>First, add a tab to show preview</span>}
                    </TabsPreview>
                    <br/>
                    <br/>
                    <TabsList>
                        <AddTab tabs={tabs} setTabs={this.setTabs} locked={locked}/>
                        { !_.isEmpty(tabs) && tabs.map(tab => (
                            <Tab tabs={tabs} tab={tab} setTabs={this.setTabs} locked={locked}/>
                        ))}
                    </TabsList>
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

export default connect(mapStateToProps)(Tabs);
