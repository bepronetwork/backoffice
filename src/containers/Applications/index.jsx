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
import { GamesIcon, StoreIcon, SettingsIcon } from 'mdi-react';
import TabsContainer from '../../shared/components/tabs/Tabs';
import GameStorePageContainer from './GameStore/index.js';
import CustomizationContainer from './Customization/index.js';
import HostingLink from './components/HostingLink';

const bitcoin = `${process.env.PUBLIC_URL}/img/landing/bitcoin.png`;
const back_2 = `${process.env.PUBLIC_URL}/img/landing/back-2.png`;
const casino = `${process.env.PUBLIC_URL}/img/landing/casino.png`;

class ApplicationsContainer extends React.Component{

    constructor(props){
        super(props)
    }
   
    

    render = () => {
        let services = this.props.profile.getApp().getServices();
        let servicesCodes = fromCodesToServices(services);
    
        return (
            <Container className="dashboard">
                <Row>
                    <Col lg={12}>
                        {_.isEmpty(services)
                          ?  <IntegrationsContainer/>
                        :   
                            <div>
                                <Row>
                                    <Col md={9}>
                                        <Row>
                                            {servicesCodes.map( (key) => {
                                                return widgets[key] ? widgets[key]() : null;
                                            })}
                                        </Row>
                                    </Col>
                                    <Col md={3}>
                                        <HostingLink/>
                                    </Col>
                                </Row>
                                <TabsContainer 
                                    items={
                                        [
                                            {
                                                title : 'My Games',
                                                container : (
                                                    <DataWidget>
                                                        <GamesContainer  data={{
                                                            games : this.props.profile.getApp().getSummaryData('games'),
                                                            wallet : this.props.profile.getApp().getSummaryData('wallet'),
                                                        }} {...this.props}/>
                                                    </DataWidget>
                                                ),
                                                icon : <GamesIcon/>
                                            },
                                            {
                                                title : 'Game Store',
                                                container : (
                                                    <GameStorePageContainer/>
                                                    
                                                ),
                                                icon : <StoreIcon/>
                                            },
                                            {
                                                title : 'Customization ',
                                                container : (
                                                    <CustomizationContainer/>
                                                    
                                                ),
                                                icon : <SettingsIcon/>
                                            },

                                        ]
                                    }
                                />
                                   
                            </div>   
                        }
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

