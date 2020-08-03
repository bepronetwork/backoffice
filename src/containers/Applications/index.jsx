import React, { lazy, Suspense } from 'react';
import Fade from '@material-ui/core/Fade';
import { compose } from 'lodash/fp';
import PropTypes from 'prop-types';

import { translate } from 'react-i18next';
import { connect } from "react-redux";
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import { AddOn, Bet, CasinoWhite, Reward, Rewards, Settings, Wallet } from '../../components/Icons';
import { fromCodesToServices } from '../../controllers/services/services';
import TabsContainer from '../../shared/components/tabs/Tabs';
import HostingLink from './components/HostingLink';
const AddOnsContainer = lazy(() => import('./AddOnPage'));
const CurrenciesContainer = lazy(() => import('./CurrenciesPage/CurrenciesContainer'));
const CustomizationContainer = lazy(() => import('./Customization/index.js'));
const GameStorePageContainer = lazy(() => import('./GameStore/index.js'));
const ThirdPartiesContainer = lazy(() => import('./ThirdParties/index.js'));
const GamesContainer  = lazy(() => import('./components/GamesContainer'));

const bitcoin = `${process.env.PUBLIC_URL}/img/landing/bitcoin.png`;
const back_2 = `${process.env.PUBLIC_URL}/img/landing/back-2.png`;
const casino = `${process.env.PUBLIC_URL}/img/landing/casino.png`;

const loadingBetprotocol = `${process.env.PUBLIC_URL}/img/loading-betprotocol.gif`;

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
            <Fade in timeout={{ appear: 200, enter: 200, exit: 200 }}>
                 <Container className="dashboard">
                <Row>
                <Col lg={12}>
                    <div>
                        <Row>
                            <Col md={4}>
                                <Row>
                                    {servicesCodes.map( (key) => {
                                        return widgets[key] ? widgets[key]() : null;
                                    })}
                                </Row>
                            </Col>
                            <Col md={8} style={{ paddingBottom: 20, height: 70 }}>
                                <MobileWrapper>
                                    <Link>Application link</Link>
                                </MobileWrapper>
                                <HostingLink/>
                            </Col>
                        </Row>
                        <Suspense fallback={
                            <div>					
                                <div className={"load "}>
                                    <div class="load__icon-wrap">
                                        <img src={loadingBetprotocol} alt="loading..."/>
                                    </div>
                                </div>
                            </div> }>
                        <TabsContainer 
                            items={
                                this.getTabsPerPermission(permission)
                            }
                        />
                        </Suspense> 
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

