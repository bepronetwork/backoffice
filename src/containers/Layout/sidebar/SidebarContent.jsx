import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import { connect, useSelector } from "react-redux";
import { compose } from 'lodash/fp';
import _ from 'lodash';
import { Casino, Wallet, Phone, User, Arrow, Confirmed, Bet, Hand, Settings, Reward, LogOut } from '../../../components/Icons';

const SidebarContent = ({ onClick }) => {
    const profile = useSelector(state => state.profile);
    
    const [links, setLinks] = useState({
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
    })

    useEffect(() => {
        getData();
    }, [profile])

    function hideSidebar(){
        onClick();
    };

    const hasData = (summary) => summary && !_.isEmpty(summary.data);

    const hasInfo = data => data ? true : false ;

    function getData() {
        const profile = useSelector(state => state.profile);
        const User = profile.User;

        let newState = {
            home        : User.permission.super_admin || User.permission.financials,
            application : User.permission.super_admin || User.permission.customization || User.permission.financials,
            users       : hasData(profile.hasAppStats('usersInfoSummary')) && 
                          (User.permission.super_admin || User.permission.financials),
            stats       : hasData(profile.hasAppStats('revenue')) &&
                          (User.permission.super_admin || User.permission.financials),
            wallet      : User.permission.super_admin || User.permission.financials || 
                          User.permission.withdraw,
            settings    : User.permission.super_admin,//this.hasInfo(getApp().isDeployed()),
            affiliates  : hasData(profile.hasAppStats('affiliates')) && User.permission.super_admin,
            transactions: hasData(profile.hasAppStats('withdraws')) && (User.permission.super_admin || 
                          User.permission.financials || User.permission.user_withdraw),
            bets        : User.permission.super_admin || User.permission.financials,
            developers  : User.permission.super_admin
        }
        setLinks({...links, ...newState})
    }

    return (
        <div className="sidebar__content">
            <ul className="sidebar__block">
                <SidebarLink disabled={!links.home} title="Home" icon={<Casino/>} route="/home" onClick={() => hideSidebar()} />
                <SidebarLink disabled={!links.application} title="Application" icon={<Phone/>} route="/application" onClick={() => hideSidebar()} />
                <SidebarLink disabled={!links.users} title="Users" icon={<User/>} route="/users" onClick={() => hideSidebar()} />
                <SidebarLink disabled={!links.bets} title="Bets" icon={<Bet/>} route="/bets" onClick={() => hideSidebar()} />
                <SidebarLink disabled={!links.transactions} title="Transactions" icon={<Arrow/>} route="/transactions" onClick={() => hideSidebar()} />
                <SidebarLink disabled={!links.stats} title="Stats" icon={<Confirmed/>} route="/stats" onClick={() => hideSidebar()} />
                <SidebarLink disabled={!links.wallet} title="Wallet" icon={<Wallet/>} route="/wallet" onClick={() => hideSidebar()} />
                <SidebarLink disabled={!links.affiliates} title="Affiliates" icon={<Hand/>} route="/affiliates" onClick={() => hideSidebar()} />
                <SidebarLink disabled={!links.settings} title="Settings" icon={<Settings/>} route="/settings" onClick={() => hideSidebar()} />
                <SidebarLink disabled={!links.developers} title="Developers" icon={<Reward/>} route="/developers" onClick={() => hideSidebar()} />
                {/* <SidebarLink title="Log Out" icon={<LogOut/>} route="/login" /> */}
            </ul>
        </div>
    );
}

export default SidebarContent;