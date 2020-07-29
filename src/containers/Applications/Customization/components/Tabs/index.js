import React, { Component } from 'react'
import EditLock from '../../../../Shared/EditLock.js';
import { connect } from "react-redux";
import _ from 'lodash';

import './styles.css';
import { Container, TabsPreview, Text, TabsList, TabPreview, TabIcon, TabTitle } from './styles';
import AddTab from './AddTab.js';
import Tab from './Tab.js';

import { Casino, Cash } from '../../../../../components/Icons';
import { ButtonBase } from '@material-ui/core';

const tabs = [
    { title: 'Casino', icon: () => <Casino/>, active: true },
    { title: 'Exchange', icon: () => <Cash/>, active: false }
]

class Tabs extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            locked: false
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
    }



    render() {
        const { isLoading, locked } = this.state;
        
        return (
            <Container>
                <EditLock 
                isLoading={isLoading} 
                unlockField={this.unlockField} 
                lockField={this.lockField} 
                confirmChanges={this.confirmChanges} 
                locked={locked}>
                    <Text>Preview</Text>
                    <TabsPreview>
                        { tabs.map(tab => (
                            <ButtonBase>
                                <TabPreview active={tab.active}>
                                    <TabIcon>
                                        { tab.icon() }
                                    </TabIcon>
                                    <TabTitle>
                                        { tab.title }
                                    </TabTitle>
                                </TabPreview>
                            </ButtonBase>
                        ))}
                    </TabsPreview>
                    <br/>
                    <br/>
                    <TabsList>
                        <AddTab locked={locked}/>
                        { _.times(2, () => (
                            <Tab locked={locked}/>
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
