import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import AddOnStoreContainer from "./AddOn";
import { LockWrapper } from "../../../../shared/components/LockWrapper";
import { Grid } from '@material-ui/core';

import _ from 'lodash';

class AddOnStorePageContainer extends React.Component{

    constructor(props){
        super(props)
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

    projectData = (props) => {
        const { profile } = props;
        const { params } = profile.App;

        const currencies = profile.getApp().getEcosystemCurrencies();

        this.setState({ ecosystemAddOns: params.storeAddOn, appAddOns: params.addOn, currencies: currencies });
    }

    addAddOn = async (url) => {
        const { profile } = this.props;

        await profile.getApp().addAddOn({ url: url });
        await profile.getApp().updateAppInfoAsync();
        await profile.update();
    }

    isAdded = (AddOn) => {
        const { appAddOns } = this.state;

        return !!Object.keys(appAddOns).find(k => AddOn.name.toLowerCase().replace(/\s+/g, '').includes(k.toLowerCase()));
    }

    hasRestriction = (addOn, appUseVirtualCurrencies) => {
        return addOn.name.toLowerCase().includes('autowithdraw') && appUseVirtualCurrencies;
    }

    hasCurrenciesInstalled = () => {
        const { profile } = this.props;
        const { currencies } = this.state;

        const wallet = profile.App.params.wallet;

        return !_.isEmpty(currencies) || !_.isEmpty(wallet);
    }

    render() {
        const { ecosystemAddOns } = this.state;
        const { App, User } = this.props.profile;

        const appUseVirtualCurrencies = App.params.virtual;
        const addOns = ecosystemAddOns.filter(addOn => !this.hasRestriction(addOn, appUseVirtualCurrencies));
        const isSuperAdmin = User.permission.super_admin;

        return (
            <div>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                    {addOns.map(addOn => {
                        return (
                            <Grid item style={{ margin: 15, marginTop: 0 }}>
                                <LockWrapper hasPermission={isSuperAdmin && this.hasCurrenciesInstalled()}>
                                    <AddOnStoreContainer
                                        addOn={addOn}
                                        isAdded={this.isAdded(addOn)}
                                        addAddOn={this.addAddOn}
                                    />
                                </LockWrapper>
                               
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

AddOnStorePageContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(AddOnStorePageContainer);

