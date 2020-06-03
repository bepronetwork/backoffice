import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import { StyledNavLink, TabsContainer, TabContainer } from './styles';
import classnames from 'classnames';
import Deposit from './Deposit';
import Withdraw from './Withdraw';

const tabs = [
    { name: "Deposit", container: (wallet) => <Deposit data={wallet}/> },
    { name: "Withdraw", container: (wallet) => <Withdraw data={wallet}/> },
    // { name: "Limits", container: (wallet) => <Deposit data={wallet}/> },
    // { name: "Fees", container: (wallet) => <Deposit data={wallet}/> },
    // { name: "Bonus", container: (wallet) => <Deposit data={wallet}/> },
    // { name: "Withdraw" },
    // { name: "Limits" }    
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

    render() {
        const { wallet } = this.state;

        if (!wallet) return null

        return (
           <>
           <Nav pills>
                {tabs.map(tab => (
                    <NavItem style={{ height: 80, margin: "0px 20px" }}>
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
                    {tabs.map(tab => (
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
