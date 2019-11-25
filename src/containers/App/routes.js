import UsersContainer from '../Users';
import Applications from '../Applications';
import StatsContainer from '../Stats'
import WalletContainer from '../Wallet';
import DefaultDashboard from '../Dashboards/Default';
import AffiliatesContainer from '../Affiliates';
import SettingsContainer from '../Settings';
import DepositWidget from '../Wallet/components/paths/DepositWidget';
import WithdrawWidget from '../Wallet/components/paths/WithdrawWidget';
import GamePage from '../Applications/GamePage';
import UserPage from '../Users/UserPage';

export default [
    {
        path: "/home",
        name: 'Home',
        component : DefaultDashboard
    },
    {
        path: "/initial",
        name: 'Initial'
    },
    {
        path: "/users",
        name: 'Users',
        component : UsersContainer,
        children : [
            {
                path : "/user",
                name : 'User View',
                component : UserPage
            }
        ]
    },
    {
        path: "/application",
        name: 'Application',
        component : Applications,
        children : [
            {
                path : "/game",
                name : 'Game',
                component : GamePage
            }
        ]
    },
    {
        path: "/stats",
        name: 'Financial Stats',
        component : StatsContainer
    },
    {
        path: "/transactions",
        name: 'Transactions'
    },
    {
        path: "/wallet",
        name: 'Operator Wallet',
        component : WalletContainer,
        children : [
            {
                path : "/deposit",
                name : 'Deposit',
                component : DepositWidget
            },
            {
                path : "/withdraw",
                name : 'Withdraw',
                component : WithdrawWidget
            }
        ]
    },
    {
        path: "/affiliates",
        name: 'Affiliates',
        component : AffiliatesContainer
    },
    {
        path: "/settings",
        name: 'Settings',
        component : SettingsContainer
    },
    {
        path: "/account-settings",
        name: 'Account Settings',
        component : SettingsContainer
    },
    {
        path: "/developers",
        name: 'Developers'
    },
];