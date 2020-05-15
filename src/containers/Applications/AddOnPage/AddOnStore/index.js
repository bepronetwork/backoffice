import React from 'react';
import { Col, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import AddOnStoreContainer from "./AddOn";
import { LockWrapper } from "../../../../shared/components/LockWrapper";

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
        const { params } = props.profile.App;

        this.setState({ ecosystemAddOns: params.storeAddOn, appAddOns: params.addOn });
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

        if (addOn.name.toLowerCase().includes('autowithdraw') && appUseVirtualCurrencies) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { ecosystemAddOns } = this.state;
        const { App, User } = this.props.profile;

        const appUseVirtualCurrencies = App.params.virtual;
        const addOns = ecosystemAddOns.filter(addOn => !this.hasRestriction(addOn, appUseVirtualCurrencies));
        const isSuperAdmin = User.permission.super_admin;

        return (
            <div>
                <Row md={12} xl={12} lg={12} xs={12}>
                    {addOns.map(addOn => {
                        return (
                            <Col lg={5}>
                                <LockWrapper hasPermission={isSuperAdmin}>
                                    <AddOnStoreContainer
                                        addOn={addOn}
                                        isAdded={this.isAdded(addOn)}
                                        addAddOn={this.addAddOn}
                                    />
                                </LockWrapper>
                               
                            </Col>
                        )
                    })}
                </Row>
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

