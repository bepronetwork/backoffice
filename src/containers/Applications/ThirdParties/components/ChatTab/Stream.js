import React, { Component } from 'react'
import EditLock from '../../../../Shared/EditLock.js';
import { connect } from "react-redux";
import BooleanInput from '../../../../../shared/components/BooleanInput.js';
import { FormLabel } from '@material-ui/core';

import { Actions, InputField } from './styles'

const defaultState = {
    isActive: true,
    integration_id: '',
    publicKey: '',
    privateKey: '',
    integration_type: 'live_chat',
    locked: true
}

const labelStyle = {
    fontFamily: "Poppins", 
    fontSize: 14, 
    color: "#646777"
}

const stream = `${process.env.PUBLIC_URL}/img/landing/stream.png`;

class Stream extends Component {
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
        const chat = props.profile.getApp().getChatIntegration();

        const { isActive, privateKey, publicKey } = chat;
        this.setState({...this.state, 
            integration_id : chat._id,
            isActive,
            privateKey,
            publicKey
        })
    }

    handleChangeActive = value => {
        this.setState({ isActive: value })
    }

    handleChangePublicKey = value => {
        this.setState({ publicKey: value })
    }

    handleChangePrivateKey = value => {
        this.setState({ privateKey: value })
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
        await profile.getApp().editIntegration(this.state);
        this.setState({...this.state, isLoading : false, locked: true})
        this.projectData(this.props);
    }

    render() {
        const { isLoading, locked, isActive, publicKey, privateKey } = this.state; 

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
                    <img style={{width : 70}} src={stream}></img>
                    <p className="text-small text-left" style={{marginTop : 0}}><a href="https://getstream.io" target="_blank">https://getstream.io</a></p>
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

                    <p>Public Key</p>
                    <InputField disabled={locked || isLoading} value={publicKey} onChange={(e) => this.handleChangePublicKey(e.target.value)}/>

                    <p>Private Key</p>
                    <InputField disabled={locked || isLoading} value={privateKey} onChange={(e) => this.handleChangePrivateKey(e.target.value)}/>
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

export default connect(mapStateToProps)(Stream);
