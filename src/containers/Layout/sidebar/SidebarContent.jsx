import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import { connect } from "react-redux";
import { compose } from 'lodash/fp';
import _ from 'lodash';
import { Casino, Wallet, Phone, User, Arrow, Confirmed, Bet, Hand, Settings, Reward, LogOut } from '../../../components/Icons';

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
            application : User.permission.super_admin || User.permission.customization || User.permission.financials,
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
                    <SidebarLink disabled={!this.state.home} title="Home" icon={<Casino/>} route="/home" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.application} title="Application" icon={<Phone/>} route="/application" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.users} title="Users" icon={<User/>} route="/users" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.bets} title="Bets" icon={<Bet/>} route="/bets" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.transactions} title="Transactions" icon={<Arrow/>} route="/transactions" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.stats} title="Stats" icon={<Confirmed/>} route="/stats" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.wallet} title="Wallet" icon={<Wallet/>} route="/wallet" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.affiliates} title="Affiliates" icon={<Hand/>} route="/affiliates" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.settings} title="Settings" icon={<Settings/>} route="/settings" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.developers} title="Developers" icon={<Reward/>} route="/developers" onClick={this.hideSidebar} />
                    <SidebarLink title="Log Out" icon={<LogOut/>} route="/login" />
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