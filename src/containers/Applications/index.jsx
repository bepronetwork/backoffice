import React, { Suspense } from 'react';
import { Col, Container, Row, Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import Fade from '@material-ui/core/Fade';

import { connect } from "react-redux";
import { fromCodesToServices } from '../../controllers/services/services';
import TabsContainer from '../../shared/components/tabs/Tabs';
import HostingLink from './components/HostingLink';
import AddOnsContainer from './AddOnPage';
import CurrenciesContainer from './CurrenciesPage/CurrenciesContainer';

import { Bet, Reward, Settings, Rewards, AddOn, Wallet, CasinoWhite, EsportsWhite, SettingsWhite, Chat } from '../../components/Icons';

import styled from 'styled-components';
import { TabContainer, StyledNavLink, CasinoCard, CasinoContainer, Icon, Link, MobileWrapper } from './styles';
import classnames from 'classnames';

import CustomizationContainer from './Customization/index.js';
import GameStorePageContainer from './GameStore/index.js';
import ThirdPartiesContainer from './ThirdParties/index.js';
import GamesContainer from './components/GamesContainer';
import LanguageStorePageContainer from './LanguagesPage/'

const EsportsPage = React.lazy(() => import('./EsportsPage'));

const bitcoin = `${process.env.PUBLIC_URL}/img/landing/bitcoin.png`;
const back_2 = `${process.env.PUBLIC_URL}/img/landing/back-2.png`;
const casino = `${process.env.PUBLIC_URL}/img/landing/casino.png`;

const loading = `${process.env.PUBLIC_URL}/img/loading-betprotocol.gif`;

const EsportsIcon = styled.section`
    height: 50px;
    width: 50px;
    opacity: 0.56;
`
const PlatformIcon = styled.section`
    height: 50px;
    width: 50px;
    opacity: 0.56;
`

class ApplicationsContainer extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            activeTab: 'platform'
        }
    }
   
    isAdded = (AddOn) => {
        const { appAddOns } = this.props.profile.App.addOn;

        return !!Object.keys(appAddOns).find(k => AddOn.name.toLowerCase().includes(k.toLowerCase()));
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
            activeTab: tab
            });
        }
    }

    getTabs = () => {
        return {
            myGames: {
                title : 'My Games',
                container : (
                    <GamesContainer  data={{
                        games : this.props.profile.getApp().getSummaryData('games'),
                        wallet : this.props.profile.getApp().getSummaryData('wallet'),
                    }} {...this.props}/>
                ),
                icon : <Bet/>
            },
            gameStore: {
                title : 'Game Store',
                container : (
                    <GameStorePageContainer/>
                    
                ),
                icon : <Reward/>
            },
            customization: {
                title : 'Customization ',
                container : (
                    <CustomizationContainer/>
                    
                ),
                icon : <Settings/>
            },
            thirdParties: {
                title : 'Third-Parties ',
                container : (
                    <ThirdPartiesContainer/>
                    
                ),
                icon : <Rewards/>
            },
            addOns: {
                title : 'Add-Ons ',
                container : (
                    <AddOnsContainer/>
                    
                ),
                icon : <AddOn/>
            },
            currencies: {
                title : 'Currencies ',
                container : (
                    <CurrenciesContainer />
                    
                ),
                icon : <Wallet/>
            },
            languages: {
                title : 'Languages ',
                container : (
                    <LanguageStorePageContainer />
                    
                ),
                icon : <Chat/>
            }
        }
    }

    getCasinoTabs = permission => {

        const tabs = this.getTabs();

        switch (true) {
            case permission.super_admin:
                return [tabs.myGames, tabs.gameStore];
            
            case permission.customization && permission.financials:
                return [tabs.myGames];

            case permission.customization:
                return [];
            
            case permission.financials:
                return [tabs.myGames];
            
            default:
                return [];
            
        }
    }

    getPlatformTabs = permission => {

        const tabs = this.getTabs();

        switch (true) {
            case permission.super_admin:
                return [tabs.customization, tabs.thirdParties, tabs.addOns, tabs.currencies, tabs.languages];
            
            case permission.customization && permission.financials:
                return [tabs.customization, tabs.addOns, tabs.currencies];

            case permission.customization:
                return [tabs.customization];
            
            case permission.financials:
                return [tabs.addOns, tabs.currencies];
            
            default:
                return [];
            
        }
    }

    render = () => {
        const { profile } = this.props;
        const services = this.props.profile.getApp().getServices();
        const servicesCodes = fromCodesToServices(services);

        const permission = profile.User.permission;
        
        return (
            <Fade in timeout={{ appear: 200, enter: 200, exit: 200 }}>
                 <Container className="dashboard">
                <Row>
                    <Col lg={12}>
                        <div>
                            <Row>
                                <Col md={4} style={{ padding: 0 }}>
                                <Nav pills style={{ justifyContent: "flex-start", marginBottom: 25 }}>
                                    <NavItem style={{ height: 80, marginTop: "20px" }}>
                                            <StyledNavLink
                                                className={classnames({ active: this.state.activeTab === 'platform' })}
                                                onClick={() => {
                                                this.toggle('platform');
                                                }}
                                            >
                                                <span>Platform</span>
                                                <PlatformIcon>
                                                    <SettingsWhite isActive={this.state.activeTab === 'platform'}/>
                                                </PlatformIcon>
                                            </StyledNavLink>
                                        </NavItem>
                                        <NavItem style={{ height: 80, marginTop: "20px" }}>
                                            <StyledNavLink
                                                className={classnames({ active: this.state.activeTab === 'casino' })}
                                                onClick={() => {
                                                this.toggle('casino');
                                                }}
                                            >
                                                <span>Casino</span>
                                                <Icon>
                                                    <CasinoWhite/>
                                                </Icon>
                                            </StyledNavLink>
                                        </NavItem>
                                        <NavItem style={{ height: 80, marginTop: "20px" }}>
                                            <StyledNavLink
                                                className={classnames({ active: this.state.activeTab === 'esports' })}
                                                onClick={() => {
                                                this.toggle('esports');
                                                }}
                                            >
                                                <span>Esports</span>
                                                <EsportsIcon>
                                                    <EsportsWhite isActive={this.state.activeTab === 'esports'}/>
                                                </EsportsIcon>
                                            </StyledNavLink>
                                        </NavItem>
                                </Nav>
                                    {/* <Row>
                                        {servicesCodes.map( (key) => {
                                            return widgets[key] ? widgets[key]() : null;
                                        })}
                                    </Row> */}
                                </Col>
                                <Col md={8} style={{ height: 70 }}>
                                    <MobileWrapper>
                                        <Link>Application link</Link>
                                    </MobileWrapper>
                                    <HostingLink/>
                                </Col>
                            </Row>
                            <TabContainer>
                                <TabContent activeTab={this.state.activeTab}>
                                <Suspense fallback={<div class="load">
                                                        <div class="load__icon-wrap">
                                                        <img src={loading} alt="loading..."/>
                                                        </div>
                                                    </div>}>
                                    <TabPane tabId={'platform'} style={{ paddingTop: 30 }}>
                                        <TabsContainer 
                                            items={
                                                this.getPlatformTabs(permission)
                                            }
                                        />
                                    </TabPane>
                                    <TabPane tabId={'casino'} style={{ paddingTop: 30 }}>
                                        <TabsContainer 
                                            items={
                                                this.getCasinoTabs(permission)
                                            }
                                        />
                                    </TabPane>
                                    <TabPane tabId={'esports'} style={{ paddingTop: 30 }}>
                                        { this.state.activeTab === 'esports' && <EsportsPage/> }
                                    </TabPane>
                                </Suspense>
                                </TabContent>
                            </TabContainer>
                        </div>   
                    </Col>
                </Row>
            </Container>
            </Fade>
        )
    }

}

const widgets = {
    casino : () => {
        return (
            <CasinoCard>
                <CasinoContainer>
                    <span>Casino</span>
                    <Icon>
                        <CasinoWhite/>
                    </Icon>
                </CasinoContainer>
            </CasinoCard>       
        )
    }
} 


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(ApplicationsContainer);

