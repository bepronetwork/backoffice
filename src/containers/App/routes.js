import UsersContainer from '../Users';
import Applications from '../Applications';
import StatsContainer from '../Stats'
import WalletContainer from '../Wallet';
import DefaultDashboard from '../Dashboards/Default';
import AffiliatesContainer from '../Affiliates';
import DepositWidget from '../Wallet/components/paths/DepositWidget';

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
        component : UsersContainer
    },
    {
        path: "/application",
        name: 'Application',
        component : Applications
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
            }
        ]
    },
    {
        path: "/affiliates",
        name: 'Affiliates',
        component : AffiliatesContainer
    },
    {
        path: "/developers",
        name: 'Developers'
    },
];