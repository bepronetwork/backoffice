/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {  Col, Row } from 'reactstrap';
import { connect } from "react-redux";
import _ from 'lodash';
import AutoWithdraw from './AddOn/AutoWithdraw';
import Jackpot from './AddOn/Jackpot';
import { Grid } from '@material-ui/core';

class AddOnContainer extends PureComponent {
 
    constructor() {
        super();
        this.state = {
            ecosystemAddOns: [],
            appAddOns: []
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { profile } = props;

        const app = await profile.getApp();

        this.setState({ ecosystemAddOns: app.params.storeAddOn, appAddOns: app.params.addOn });
    }

    hasAddOn = (addOn) => {
        const { appAddOns } = this.state;

        if(!_.isEmpty(appAddOns)) {
            const isAdded = !!Object.keys(appAddOns).find(k => k.toLowerCase() === addOn.toLowerCase());
            const isNotEmpty = !_.isEmpty(Object.keys(appAddOns).find(k => k.toLowerCase() === addOn.toLowerCase()));

            return isAdded && isNotEmpty;

        } else {
            return false;
        }
         
    }

    getAddOnObj = (addOn) => {
        const { ecosystemAddOns, appAddOns } = this.state;

        const addOnInfo = ecosystemAddOns.find(addon => addon.name.toLowerCase().includes(addOn.toLowerCase()));
        const addOnData = appAddOns[Object.keys(appAddOns).find(k => k.toLowerCase() === addOn.toLowerCase())];

        const addOnObj = _.merge({}, addOnInfo, addOnData);

        return addOnObj;

    }

    render() {
       const { isLoading, currency, profile } = this.props;
       const { appAddOns } = this.state;
       const appUseVirtualCurrencies = profile.App.params.virtual;

        if (_.isEmpty(appAddOns)){return null}

        return (
            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                { this.hasAddOn('autoWithdraw') && !appUseVirtualCurrencies ? (
                <Grid item style={{ margin: 15, marginTop: 0 }}>
                    <AutoWithdraw autoWithdraw={this.getAddOnObj('autoWithdraw')} isLoading={isLoading} currency={currency}/>
                </Grid> 
                ) : null}

                { this.hasAddOn('jackpot') ? (
                <Grid item style={{ margin: 15, marginTop: 0 }}>
                    <Jackpot jackpot={this.getAddOnObj('jackpot')} isLoading={isLoading} currency={currency}/>
                </Grid>  
                ) : null}         
            </Grid>
        );
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile,
        isLoading: state.isLoading,
        currency: state.currency
    };
}

export default connect(mapStateToProps)(AddOnContainer);

