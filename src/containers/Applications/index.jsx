import React from 'react';
import Fade from '@material-ui/core/Fade';
import { compose } from 'lodash/fp';
import PropTypes from 'prop-types';

import { translate } from 'react-i18next';
import { connect } from "react-redux";
import { Col, Container, Row } from 'reactstrap';
import { AddOn, Bet, CasinoWhite, Reward, Rewards, Settings, Wallet } from '../../components/Icons';
import { fromCodesToServices } from '../../controllers/services/services';
import TabsContainer from '../../shared/components/tabs/Tabs';
import HostingLink from './components/HostingLink';
import AddOnsContainer from './AddOnPage';
import CurrenciesContainer from './CurrenciesPage/CurrenciesContainer';
import CustomizationContainer from './Customization/index.js';
import GameStorePageContainer from './GameStore/index.js';
import ThirdPartiesContainer from './ThirdParties/index.js';
import GamesContainer from './components/GamesContainer';

import { CasinoCard, CasinoContainer, Icon, Link, MobileWrapper } from './styles';

class ApplicationsContainer extends React.PureComponent{
   
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
                            <Col md={4}>
                                <Row>
                                    {servicesCodes.map( key => {
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
                        <TabsContainer 
                            items={
                                this.getTabsPerPermission(permission)
                            }
                        />
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

ApplicationsContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(ApplicationsContainer);

