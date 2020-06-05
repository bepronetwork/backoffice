import React, { Component } from 'react'
import { Container, Header, Content, CurrenciesTabContainer, TabsContainer, StyledNavLink, WalletContainer, WalletDetails } from './styles'
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import _ from 'lodash';
import WalletTabs from '../WalletTabs';
import { Grid } from '@material-ui/core';


const Wallet = ({ data }) => {
    const { image, currency, playBalance } = data;

    return (
        <>
        <WalletContainer>
            <img className='application__game__image' style={{ display: 'block', marginLeft: 0, marginRight: 0, height: 50, width: 50 }} src={image} alt={currency.name}/>
            <WalletDetails>
                <h3>{`${currency.name} Wallet`}</h3>
                <span>{playBalance.toFixed(2)}</span>
            </WalletDetails>
        </WalletContainer>
        </>
    )
}

class LiquidityWalletContainer extends Component {
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
        const { wallets } = props;

        if (!_.isEmpty(wallets)) {
            this.setState({
                wallets: wallets,
                activeTab: wallets[0]._id
            })
        }
    }
    
    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
            activeTab: tab
            });
        }
    }

    render() {

        const { wallets } = this.state;

        console.log(this.state);

        if (!wallets) return null;

        return (
            <>
                <Container>
                    <Header>
                        <h3>Application</h3>
                        <p>Current Liquidity</p>
                    </Header>
                    <Content>
                    <Grid container direction="row" spacing={6}>
                        <Grid item xs={3}>
                            <CurrenciesTabContainer>
                                <Nav vertical pills>
                                    {wallets.map(wallet => (
                                        <NavItem style={{ height: 80, margin: "20px 0px" }}>
                                            <StyledNavLink
                                                className={classnames({ active: this.state.activeTab === wallet._id })}
                                                onClick={() => {
                                                this.toggle(wallet._id);
                                                }}
                                            >
                                                <Wallet data={wallet}/>
                                            </StyledNavLink>
                                        </NavItem>
                                    ))}
                                </Nav>
                            </CurrenciesTabContainer>
                        </Grid>
                        <Grid item xs>
                            <TabsContainer>
                                <TabContent activeTab={this.state.activeTab}>
                                    {wallets.map(wallet => (
                                    <TabPane tabId={wallet._id}>
                                        <WalletTabs wallet={wallet}/>
                                    </TabPane>))}
                                </TabContent>
                            </TabsContainer>
                        </Grid>
                    </Grid>
                    </Content>
                </Container>
            </>
        )
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(LiquidityWalletContainer);