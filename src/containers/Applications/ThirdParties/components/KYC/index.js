import React, { Component } from 'react'
import EditLock from '../../../../Shared/EditLock.js';
import { connect } from "react-redux";
import { FormLabel } from '@material-ui/core';
import { Card, CardBody } from 'reactstrap';

import { Actions, InputField, CopyButton } from './styles'
import BooleanInput from '../../../../../shared/components/BooleanInput.js';

import copy from "copy-to-clipboard";

const defaultState = {
    isActive: true,
    _id: '',
    clientId: '',
    flowId: '',
    integration_type: 'kyc',
    locked: true,
    copied: false
}

const cardBodyStyle = {
    margin: 10, 
    borderRadius: "10px", 
    border: "solid 1px rgba(164, 161, 161, 0.35)", 
    backgroundColor: "#fafcff",
    boxShadow: "none"
}

const labelStyle = {
    fontFamily: "Poppins", 
    fontSize: 14, 
    color: "#646777"
}

const groupStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20
}

const mati = `${process.env.PUBLIC_URL}/img/landing/mati.png`;
const MS_MASTER_URL = process.env.REACT_APP_API_MASTER;

class KYC extends Component {
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

        const kyc = App.params.integrations.kyc;

        const { _id, isActive, clientId, flowId } = kyc;
        
        this.setState({
            _id: _id,
            isActive: isActive,
            clientId: clientId,
            flowId: flowId
        })
    }

    copyToClipboard = () => {

        copy(`${MS_MASTER_URL}/api/app/kyc_webhook`);

        this.setState({ copied: true })

        setTimeout(() => {
            this.setState({ copied: false });
        }, 5000)
    }
    
    unlockField = () => {
        this.setState({ locked: false })
    }

    lockField = () => {
        this.setState({ locked: true })
    }

    handleChangeActive = value => {
        this.setState({ isActive: value })
    }

    handleChangeClientID = value => {
        this.setState({ clientId: value })
    }

    handleChangeFlowID = value => {
        this.setState({ flowId: value })
    }

    confirmChanges = async () => {
        const { profile } = this.props;
        const { _id, isActive, clientId, flowId } = this.state;

        this.setState({ isLoading: true});
        
        await profile.getApp().editKYCIntegration({
            kyc_id: _id,
            isActive: isActive,
            clientId: clientId ? clientId : "",
            flowId: flowId ? flowId : ""
        });

        this.setState({ isLoading: false, locked: true})

        this.projectData(this.props);
    }


    render() {
        const { isLoading, locked, isActive, clientId, flowId, copied } = this.state; 

        return (
            <Card>
                <CardBody style={cardBodyStyle}>
                <EditLock 
                    isLoading={isLoading} 
                    unlockField={this.unlockField} 
                    lockField={this.lockField} 
                    confirmChanges={this.confirmChanges} 
                    type={'kyc'} 
                    locked={locked}>

                    <div>
                        <img style={{ width: 90 }} alt="mati" src={mati}></img>
                        <p className="text-small text-left" style={{ marginTop: 8 }}><a href="https://getmati.com" target="_blank">https://getmati.com</a></p>
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

                        <p>Client ID</p>
                        <InputField disabled={locked || isLoading} value={clientId} onChange={(e) => this.handleChangeClientID(e.target.value)}/>

                        <p>Flow ID</p>
                        <InputField disabled={locked || isLoading} value={flowId} onChange={(e) => this.handleChangeFlowID(e.target.value)}/>

                        <hr/>

                        <p>Copy our Webhook URL</p>
                        <div style={groupStyle}>
                            <InputField disabled={true} value={`${MS_MASTER_URL}/api/app/kyc_webhook`}/>
                            <CopyButton variant="contained" onClick={() => this.copyToClipboard()} disabled={copied || locked}>
                                {copied ? 'Copied!' : 'Copy'}
                            </CopyButton>
                        </div>
                    </Actions>
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

export default connect(mapStateToProps)(KYC);
