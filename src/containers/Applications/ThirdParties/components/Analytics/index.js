import React, { Component } from 'react'
import EditLock from '../../../../Shared/EditLock.js';
import { connect } from "react-redux";
import { Card, CardBody } from 'reactstrap';

import { Actions, InputField } from './styles'
import { FormLabel } from '@material-ui/core';
import BooleanInput from '../../../../../shared/components/BooleanInput.js';

const defaultState = {
    _id: '',
    isActive: true,
    google_tracking_id: '',
    integration_type: 'analytics',
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

const analytics = `${process.env.PUBLIC_URL}/img/landing/google-analytics-logo.png`;

class Analytics extends Component {
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

        const analytics = App.params.analytics;

        const { _id, google_tracking_id, isActive } = analytics;
        
        this.setState({
            _id: _id,
            google_tracking_id: google_tracking_id,
            isActive: isActive
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

    handleChangeTrackingID = value => {
        this.setState({ google_tracking_id: value })
    }

    confirmChanges = async () => {
        const { profile } = this.props;
        const { _id, google_tracking_id, isActive } = this.state;

        this.setState({ isLoading: true});
        
        await profile.getApp().editAnalyticsIntegration({
            analytics_id: _id,
            google_tracking_id: google_tracking_id,
            isActive: isActive
        });

        this.setState({ isLoading: false, locked: true})

        this.projectData(this.props);
    }


    render() {
        const { isLoading, locked, google_tracking_id, isActive } = this.state; 

        return (
            <Card>
                <CardBody style={cardBodyStyle}>
                <EditLock 
                    isLoading={isLoading} 
                    unlockField={this.unlockField} 
                    lockField={this.lockField} 
                    confirmChanges={this.confirmChanges} 
                    type={'analytics'} 
                    locked={locked}>

                    <div>
                        <img style={{ width: 150 }} alt="Google Analytics" src={analytics}></img>
                        <p className="text-small text-left" style={{ marginTop: 8 }}><a href="https://analytics.google.com" target="_blank">https://analytics.google.com</a></p>
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

                        <p>Tracking ID</p>
                        <InputField disabled={locked || isLoading} value={google_tracking_id} onChange={(e) => this.handleChangeTrackingID(e.target.value)}/>
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

export default connect(mapStateToProps)(Analytics);
