import React, { Component } from 'react'
import EditLock from '../../../../Shared/EditLock.js';
import { connect } from "react-redux";

import { Actions, InputField } from './styles'
import { FormLabel } from '@material-ui/core';
import BooleanInput from '../../../../../shared/components/BooleanInput.js';

const defaultState = {
    isActive: true,
    id: '',
    name: '',
    key: '',
    integration_type: 'chat',
    locked: true
}

const labelStyle = {
    fontFamily: "Poppins", 
    fontSize: 14, 
    color: "#646777"
}

const crisp = `${process.env.PUBLIC_URL}/img/landing/crisp.png`;

class Crisp extends Component {
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
        const { profile } = props;
        const App = profile.getApp();

        const cripsr = App.params.integrations.cripsr;

        const { isActive, key, name, _id } = cripsr;

        this.setState({
            id: _id,
            name: name,
            isActive: isActive,
            key: key
        })
    }

    handleChangeActive = value => {
        this.setState({ isActive: value })
    }

    handleChangeAPIKey = value => {
        this.setState({ key: value })
    }

    unlockField = () => {
        this.setState({...this.state, locked : false})
    }

    lockField = () => {
        this.setState({...this.state, locked : true})
    }

    confirmChanges = async () => {
        const { profile } = this.props;
        const { id, key, isActive} = this.state;

        this.setState({ isLoading: true});
        
        await profile.getApp().editCrispIntegration({
            isActive: isActive,
            key: key,
            cripsr_id: id
        });

        this.setState({ isLoading: false, locked: true})
        this.projectData(this.props);
    }


    render() {
        const { isLoading, locked, key, isActive } = this.state; 

        return (
            <EditLock 
                isLoading={isLoading} 
                unlockField={this.unlockField} 
                lockField={this.lockField} 
                confirmChanges={this.confirmChanges} 
                type={'chatTab'} 
                locked={locked}
            >
                <div>
                    <img style={{width: 90}} src={crisp}></img>
                    <p className="text-small text-left" style={{marginTop: 8}}><a href="https://crisp.chat/en" target="_blank">https://crisp.chat/en</a></p>
                </div>

                <Actions>
                    <div style={{ margin: "10px 0px" }}>
                        <FormLabel component="legend" style={labelStyle}>{ isActive ? "Active" : "Inactive" }</FormLabel>
                        <BooleanInput
                            checked={isActive === true} 
                            onChange={() => this.handleChangeActive(!isActive)}
                            disabled={locked || isLoading}
                            type={'isActive'}
                            id={'isActive'}
                        />
                    </div>

                    <p className="text-left secondary-text" style={{ margin: "15px 0px" }}> Add your credentials to integrate </p>

                    <p>API Key</p>
                    <InputField disabled={locked || isLoading} value={key} onChange={(e) => this.handleChangeAPIKey(e.target.value)}/>
                </Actions>
            </EditLock>
        )
    }
}

function mapStateToProps(state){
  return {
      profile: state.profile
  };
}

export default connect(mapStateToProps)(Crisp);
