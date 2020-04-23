import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import { connect } from "react-redux";
import { compose } from 'lodash/fp';
import _ from 'lodash';

class SidebarContent extends Component {
    static propTypes = {
        changeToDark: PropTypes.func.isRequired,
        changeToLight: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props)
        this.state = {
            home : true,
            application : true,
            users : true,
            stats : true,
            transactions : true,
            bets: true,
            wallet : true,
            affiliates : true,
            settings : true,
            developers : true
        }
    }

    componentDidMount(){
        this.getData(this.props);
    }

    hideSidebar = () => {
        this.props.onClick();
    };

    componentWillReceiveProps(props){
        this.getData(props);
    }

    hasData = (summary) => summary && !_.isEmpty(summary.data);

    hasInfo = data => data ? true : false ;

    getData = (props) => {
        const User = props.profile.User;

        let newState = {
            home        : User.permission.super_admin || User.permission.financials,
            application : User.permission.super_admin || User.permission.customization,
            users       : this.hasData(props.profile.hasAppStats('usersInfoSummary')) && 
                          (User.permission.super_admin || User.permission.financials),
            stats       : this.hasData(props.profile.hasAppStats('revenue')) &&
                          (User.permission.super_admin || User.permission.financials),
            wallet      : User.permission.super_admin || User.permission.financials || 
                          User.permission.withdraw,
            settings    : User.permission.super_admin,//this.hasInfo(getApp().isDeployed()),
            affiliates  : this.hasData(props.profile.hasAppStats('affiliates')) && User.permission.super_admin,
            transactions: this.hasData(props.profile.hasAppStats('withdraws')) && (User.permission.super_admin || 
                          User.permission.financials || User.permission.user_withdraw),
            bets        : User.permission.super_admin || User.permission.financials,
            developers  : User.permission.super_admin
        }
        this.setState({...this.state, ...newState})
    }

    render() {
        return (
            <div className="sidebar__content">
                <ul className="sidebar__block">
                    <SidebarLink disabled={!this.state.home} title="Home" icon="home" route="/home" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.application} title="Application" icon="laptop-phone" route="/application" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.users} title="Users" icon="users" route="/users" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.bets} title="Bets" icon="list" route="/bets" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.transactions} title="Transactions" icon="cart" route="/transactions" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.stats} title="Stats" icon="chart-bars" route="/stats" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.wallet} title="Wallet" icon="store" route="/wallet" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.affiliates} title="Affiliates" icon="gift" route="/affiliates" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.settings} title="Settings" icon="cog" route="/settings" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.developers} title="Developers" icon="code" route="/developers" onClick={this.hideSidebar} />
                </ul>
                <ul className="sidebar__block">
                    <SidebarLink title="Log Out" icon="exit" route="/login" />
                </ul>
            
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default compose(
    connect(mapStateToProps)
)(SidebarContent);