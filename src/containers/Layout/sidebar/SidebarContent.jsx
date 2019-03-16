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
            wallet : true,
            affiliates : true,
            developers : true
        }
    }

    hideSidebar = () => {
        this.props.onClick();
    };

    componentWillReceiveProps(props){
        this.getData(props)
    }

    hasData = (summary) => summary && !_.isEmpty(summary.data);

    getData = (props) => {
        let newState = {
            home        : true,
            application : true,
            users       : this.hasData(props.profile.hasAppStats('users')),
            stats       : this.hasData(props.profile.hasAppStats('revenue')),
            wallet      : this.hasData(props.profile.hasAppStats('wallet')),
            affiliates  : this.hasData(props.profile.hasAppStats('affiliates')),
            transactions: this.hasData(props.profile.hasAppStats('transactions')),
            developers  : true
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
                    <SidebarLink disabled={!this.state.transactions} title="Transactions" icon="cart" route="/transactions" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.stats} title="Stats" icon="chart-bars" route="/stats" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.wallet} title="Wallet" icon="store" route="/wallet" onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.affiliates} title="Affiliates" icon="gift" route="/affiliates" onClick={this.hideSidebar} />
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