import React, { Component } from 'react'
import EditLock from '../../../../Shared/EditLock.js';
import { connect } from "react-redux";
import { FormLabel } from '@material-ui/core';
import { Card, CardBody } from 'reactstrap';

import { Actions, InputField } from './styles'
import BooleanInput from '../../../../../shared/components/BooleanInput.js';

const defaultState = {
    isActive: true,
    _id: '',
    key: '',
    integration_type: 'payment',
    locked: true
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

const moonpay = `${process.env.PUBLIC_URL}/img/landing/moonpay.png`;

class PaymentTab extends Component {
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

        const moonpay = App.params.integrations.moonpay;

        const { _id, isActive, key, link } = moonpay;
        
        this.setState({
            _id: _id,
            isActive: isActive,
            key: key,
            link: link
        })
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

    handleChangeAPIkey = value => {
        this.setState({ key: value })
    }

    confirmChanges = async () => {
        const { profile } = this.props;
        const { _id, isActive, key } = this.state;

        this.setState({ isLoading: true});
        
        await profile.getApp().editMoonPayIntegration({
            moonpay_id: _id,
            isActive: isActive,
            key: key ? key : ""
        });

        this.setState({ isLoading: false, locked: true})

        this.projectData(this.props);
    }


    render() {
        const { isLoading, locked, isActive, key, link } = this.state; 

        return (
            <Card>
                <CardBody style={cardBodyStyle}>
                <EditLock 
                    isLoading={isLoading} 
                    unlockField={this.unlockField} 
                    lockField={this.lockField} 
                    confirmChanges={this.confirmChanges} 
                    type={'moonpay'} 
                    locked={locked}>

                    <div>
                        <img style={{ width: 120 }} alt="MoonPay" src={moonpay}></img>
                        <p className="text-small text-left" style={{ marginTop: 8 }}><a href={link} target="_blank">{link}</a></p>
                    </div>

                    <Actions>
                        <div style={{ margin: "10px 0px" }}>
                            <FormLabel component="legend" style={labelStyle}>{ isActive ? "Active" : "Inactive" }</FormLabel>
                            <BooleanInput
                                checked={isActive} 
                                onChange={() => this.handleChangeActive(!isActive)}
                                disabled={locked || isLoading}
                                type={'isActive'}
                                id={'isActive'}
                            />
                        </div>

                        <p className="text-left secondary-text" style={{ margin: "15px 0px" }}> Add your credentials to integrate </p>

                        <p>API Key</p>
                        <InputField disabled={locked || isLoading} value={key} onChange={(e) => this.handleChangeAPIkey(e.target.value)}/>
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

export default connect(mapStateToProps)(PaymentTab);
