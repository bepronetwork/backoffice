import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import { StyledNavLink, TabsContainer, TabContainer } from './styles';
import classnames from 'classnames';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import LimitsWidget from '../../components/paths/LimitsWidget';
import FeesWidget from '../../components/paths/FeesWidget';
import BonusWidget from '../../components/paths/BonusWidget';
import { ButtonBase } from '@material-ui/core';
import PointsWidget from '../paths/PointsWidget';
import FreeCurrencyWidget from '../paths/FreeCurrencyWidget'

const tabs = [
    { name: "Deposit", container: (wallet) => <Deposit data={wallet}/> },
    // { name: "Withdraw", container: (wallet) => <Withdraw data={wallet}/> },
    { name: "Limits", container: (wallet) => <LimitsWidget data={wallet}/> },
    { name: "Fees", container: (wallet) => <FeesWidget data={wallet}/> },
    { name: "Bonus", container: (wallet) => <BonusWidget data={wallet}/> },
    { name: "Points", container: (wallet) => <PointsWidget data={wallet}/> },  
    { name: "Free currency", container: (wallet) => <FreeCurrencyWidget data={wallet}/> }  
]

class WalletTabs extends Component {
    constructor(props) {
        super(props);

        this.state = {};
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    projectData = (props) => {
        const { wallet } = props;
        const { activeTab } = this.state;

        this.setState({
            activeTab: activeTab ? activeTab : tabs[0].name,
            wallet: wallet
        })

    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
            activeTab: tab
            });
        }
    }

    isAdded = (AddOn) => {
        const app = this.props.profile.App;
        const appAddOns = app.params.addOn;

        return !!Object.keys(appAddOns).find(k => AddOn.toLowerCase().includes(k.toLowerCase()));
         
    }

    hasPermission = tab => {

        switch (tab) {
            case 'Fees':
                return this.isAdded('TxFee');
            case 'Bonus':
                return this.isAdded('DepositBonus');
            case 'Points':
                return this.isAdded('PointSystem');
            case 'Free currency':
                return this.isAdded('freeCurrency');
            default:
                return true;
        }
    }

    render() {
        const { wallet } = this.state;

        if (!wallet) return null

        const isAppWithFakeMoney = wallet.currency.virtual;
        const filteredTabs = !isAppWithFakeMoney ? tabs.filter(tab => this.hasPermission(tab.name)) : tabs.filter(tab => tab.name === 'Limits');

        return (
           <>
           <Nav pills style={{ justifyContent: "space-around" }}>
                {filteredTabs.map(tab => (
                    <NavItem style={{ height: 80, marginTop: "20px" }}>
                        <ButtonBase>
                            <StyledNavLink
                                className={classnames({ active: this.state.activeTab === tab.name })}
                                onClick={() => {
                                this.toggle(tab.name);
                                }}
                            >
                                <span>{`${tab.name}`}</span>
                            </StyledNavLink>
                        </ButtonBase>
                    </NavItem>
                ))}
            </Nav>
            <TabsContainer style={{ minWidth: 305 }}>
                <TabContent activeTab={this.state.activeTab}>
                    {filteredTabs.map(tab => (
                    <TabPane tabId={tab.name}>
                        {tab.container({ wallet })}
                    </TabPane>))}
                </TabContent>
            </TabsContainer>
           </>
        )
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(WalletTabs);
