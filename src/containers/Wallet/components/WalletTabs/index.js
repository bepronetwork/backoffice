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

const tabs = [
    { name: "Deposit", container: (wallet) => <Deposit data={wallet}/> },
    { name: "Withdraw", container: (wallet) => <Withdraw data={wallet}/> },
    { name: "Limits", container: (wallet) => <LimitsWidget data={wallet}/> },
    { name: "Fees", container: (wallet) => <FeesWidget data={wallet}/> },
    { name: "Bonus", container: (wallet) => <BonusWidget data={wallet}/> }  
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

        this.setState({
            activeTab: tabs[0].name,
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
            default:
                return true;
        }
    }

    render() {
        const { wallet } = this.state;

        if (!wallet) return null

        const isAppWithFakeMoney = wallet.currency.name === 'Gold';
        const filteredTabs = !isAppWithFakeMoney ? tabs.filter(tab => this.hasPermission(tab.name)) : tabs.filter(tab => tab.name === 'Limits');

        return (
           <>
           <Nav pills style={{ justifyContent: "space-around" }}>
                {filteredTabs.map(tab => (
                    <NavItem style={{ height: 80, marginTop: "20px" }}>
                        <StyledNavLink
                            className={classnames({ active: this.state.activeTab === tab.name })}
                            onClick={() => {
                            this.toggle(tab.name);
                            }}
                        >
                            <span>{`${tab.name}`}</span>
                        </StyledNavLink>
                    </NavItem>
                ))}
            </Nav>
            <TabsContainer>
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
