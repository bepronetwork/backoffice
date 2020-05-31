/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {  Col, Row } from 'reactstrap';
import { connect } from "react-redux";
import CurrencyInfo from './CurrencyInfo';
import VirtualCurrencyInfo from './VirtualCurrencyInfo';
import { LockWrapper } from '../../../shared/components/LockWrapper';
import { Grid } from '@material-ui/core';
const image = `${process.env.PUBLIC_URL}/img/dashboard/empty.png`;

class CurrenciesContainer extends PureComponent {
 
    constructor() {
        super();
        this.state = {
            currencies : []
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

        this.setState({ currencies: app.params.currencies });
    }

    isAdded = (AddOn) => {
        const app = this.props.profile.App;
        const appAddOns = app.params.addOn;

        return !!Object.keys(appAddOns).find(k => AddOn.toLowerCase().includes(k.toLowerCase()));
         
    }
    

    render() {
        const { currencies } = this.state;
        const { profile } = this.props;

        const isAppWithFakeMoney = profile.App.params.virtual;
        const hasInitialBalanceAddOn = this.isAdded('Initial Balance');
        const realCurrencies = currencies.filter(currency => currency.virtual === false);
        const virtualCurrencies = currencies.filter(currency => currency.virtual === true);
        const isSuperAdmin = profile.User.permission.super_admin;

        return (

            ((realCurrencies.length > 0 && hasInitialBalanceAddOn)||virtualCurrencies.length > 0 ) ? 
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                    {virtualCurrencies.map(currency => (
                            <Grid item style={{ margin: "0px 15px" }}>
                                <LockWrapper hasPermission={isSuperAdmin}>
                                    <VirtualCurrencyInfo data={currency} {...this.props}/>
                                </LockWrapper>
                            </Grid>                
                    ))}

                    {!isAppWithFakeMoney ? (
                        realCurrencies.map(currency => (
                            <Grid item style={{ margin: "0px 15px" }}>
                                <LockWrapper hasPermission={isSuperAdmin}>
                                    <CurrencyInfo data={currency} {...this.props}/>
                                </LockWrapper>
                            </Grid>              
                    ))
                    ) : null}
                    
                </Grid>
            : 
            <div>
                <h4>You have no Initial Balance Add-On enabled currently</h4>
                <img src={image} style={{width :'30%', marginTop : 20}}/>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile,
        isLoading: state.isLoading
    };
}

export default connect(mapStateToProps)(CurrenciesContainer);

