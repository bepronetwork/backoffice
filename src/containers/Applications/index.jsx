import React from 'react';
import { Col, Container, Row, Card, CardBody } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import GamesContainer from './components/GamesContainer';
import DataWidget from '../DataWidget/DataWidget';
import IntegrationsContainer from './components/IntegrationsContainer';
import _ from 'lodash';
import { fromCodesToServices } from '../../controllers/services/services';
import { GamesIcon, StoreIcon, SettingsIcon, ArrowDecisionIcon, PuzzleIcon, MoneyIcon } from 'mdi-react';
import TabsContainer from '../../shared/components/tabs/Tabs';
import GameStorePageContainer from './GameStore/index.js';
import CustomizationContainer from './Customization/index.js';
import ThirdPartiesContainer from './ThirdParties/index.js';
import HostingLink from './components/HostingLink';
import AddOnsContainer from './AddOnPage';
import CurrenciesContainer from './CurrenciesPage/CurrenciesContainer';
import { Bet, Reward, Settings, Rewards, AddOn, Wallet, Casino, CasinoWhite } from '../../components/Icons';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { TabContainer } from './styles';
import EsportsPage from './EsportsPage';

const bitcoin = `${process.env.PUBLIC_URL}/img/landing/bitcoin.png`;
const back_2 = `${process.env.PUBLIC_URL}/img/landing/back-2.png`;
const casino = `${process.env.PUBLIC_URL}/img/landing/casino.png`;

const MobileWrapper = styled.section`

  @media (max-width: 768px) {
   display: none !important;
  }

`;

const CasinoCard = styled.section`
  display: flex;
  width: 100%;
  height: 40px;
  padding: 15px;
  max-height: 550px;
  margin: 15px;
  margin-top: 0px;
  background: #814c94;
  border-radius: 6px;
  transition: transform 0.2s;
  overflow: hidden;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.05);

    span {
        font-family: Poppins;
        font-size: 14px;
        color: #ffffff;
    }
`;

const CasinoContainer = styled.section`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: space-between;
`;

const Icon = styled.section`
    height: 200px;
    width: 200px;
    opacity: 0.56;
`

const Link = styled.h1`
    margin-top: -70px;
    margin-bottom: 22px;
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    color: #463e3e;
`;

class ApplicationsContainer extends React.Component{

    constructor(props){
        super(props)
    }
   
    isAdded = (AddOn) => {
        const { appAddOns } = this.props.profile.App.addOn;

        return !!Object.keys(appAddOns).find(k => AddOn.name.toLowerCase().includes(k.toLowerCase()));
         
    }

    getTabsPerPermission(permission) {

        const tabs = {
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
            }
        }

        switch (true) {
            case permission.super_admin:
                return [tabs.myGames, tabs.gameStore, tabs.customization, tabs.thirdParties, tabs.addOns, tabs.currencies];
            
            case permission.customization && permission.financials:
                return [tabs.myGames, tabs.customization, tabs.addOns, tabs.currencies];

            case permission.customization:
                return [tabs.customization];
            
            case permission.financials:
                return [tabs.myGames, tabs.addOns, tabs.currencies];
            
            default:
                return [];
            
        }
    }

    render = () => {
        let services = this.props.profile.getApp().getServices();
        let servicesCodes = fromCodesToServices(services);

        const permission = this.props.profile.User.permission;
        
        return (
            <Container className="dashboard">
                <Row>
                    <Col lg={12}>
                        <div>
                            <Row>
                                <Col md={4}>
                                    <TabContainer/>
                                    {/* <Row>
                                        {servicesCodes.map( (key) => {
                                            return widgets[key] ? widgets[key]() : null;
                                        })}
                                    </Row> */}
                                </Col>
                                <Col md={8} style={{ paddingBottom: 20, height: 70 }}>
                                    <MobileWrapper>
                                        <Link>Application link</Link>
                                    </MobileWrapper>
                                    <HostingLink/>
                                </Col>
                            </Row>
                            {/* <TabsContainer 
                                items={
                                    this.getTabsPerPermission(permission)
                                }
                            /> */}
                            <TabContainer>
                                <EsportsPage/>
                            </TabContainer>
                                
                        </div>   
                    </Col>
                </Row>
          </Container>
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
                
                {/* <button className='button-hover box-small landing__product__widget__small' style={{marginLeft : 0, backgroundColor: "#814c94" }}>
                    <div className='description'>
                        <h5 style={{margin : 0, color: "white", fontFamily: "Poppins", fontSize: "20px" }}> Casino</h5>
                    </div>
                    <img className='image_widget'src={Casino}></img>
                </button> */}
            </CasinoCard>       
        )
    }
} 


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

ApplicationsContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(ApplicationsContainer);

