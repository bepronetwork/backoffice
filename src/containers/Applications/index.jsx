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

const bitcoin = `${process.env.PUBLIC_URL}/img/landing/bitcoin.png`;
const back_2 = `${process.env.PUBLIC_URL}/img/landing/back-2.png`;
const casino = `${process.env.PUBLIC_URL}/img/landing/casino.png`;

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
                icon : <GamesIcon/>
            },
            gameStore: {
                title : 'Game Store',
                container : (
                    <GameStorePageContainer/>
                    
                ),
                icon : <StoreIcon/>
            },
            customization: {
                title : 'Customization ',
                container : (
                    <CustomizationContainer/>
                    
                ),
                icon : <SettingsIcon/>
            },
            thirdParties: {
                title : 'Third-Parties ',
                container : (
                    <ThirdPartiesContainer/>
                    
                ),
                icon : <ArrowDecisionIcon/>
            },
            addOns: {
                title : 'Add-Ons ',
                container : (
                    <AddOnsContainer/>
                    
                ),
                icon : <PuzzleIcon/>
            },
            currencies: {
                title : 'Currencies ',
                container : (
                    <CurrenciesContainer />
                    
                ),
                icon : <MoneyIcon/>
            }
        }

        switch (true) {
            case permission.super_admin:
                return [tabs.myGames, tabs.gameStore, tabs.customization, tabs.thirdParties, tabs.addOns, tabs.currencies];
            
            case permission.customization && permission.financials:
                return [tabs.myGames, tabs.customization];

            case permission.customization:
                return [tabs.customization];
            
            case permission.financials:
                return [tabs.myGames];
            
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
                                <Col md={8}>
                                    <Row>
                                        {servicesCodes.map( (key) => {
                                            return widgets[key] ? widgets[key]() : null;
                                        })}
                                    </Row>
                                </Col>
                                <Col md={4}>
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
        )
    }

}

const widgets = {
    casino : () => {
        return (
            <Col md={3}>
                <Card>
                    <button className='button-hover box-small landing__product__widget__small' style={{marginLeft : 0}}>
                        <div className='description'>
                            <h5 style={{margin : 0}}> Casino</h5>
                        </div>
                        <img className='image_widget'src={casino}></img>
                    </button>
                </Card>
            </Col>        
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

