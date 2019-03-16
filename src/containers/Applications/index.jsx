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

const bitcoin = `${process.env.PUBLIC_URL}/img/bitcoin.png`;
const back_2 = `${process.env.PUBLIC_URL}/img/landing/back-2.png`;
const casino = `${process.env.PUBLIC_URL}/img/casino.png`;
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
                                <Card>
                                    <div> <h5 className={`widget__use__big`} style={{top : -20}}> Integrations </h5></div> 
                                    <CardBody className="dashboard__card-widget">  
                                        <Row>
                                            {servicesCodes.map( (key) => {
                                                return widgets[key] ? widgets[key]() : null;
                                            })}
                                        </Row>
                                    </CardBody>
                                </Card>
                                <DataWidget>
                                    <GamesContainer data={this.props.profile.getApp().getSummaryData('games')}/>
                                </DataWidget>
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
                    <div className='landing__product__widget__small'>
                        <div className='description'>
                            <h4> Casino </h4>
                            <p> A Casino Application from Layout, Engines & Games </p>
                        </div>
                        <h2 style={{marginTop : 30}}> 0,5% <h5>Per Transaction</h5></h2>
                        <img className='image_widget' src={casino}></img>
                    </div>
                </Card>
            </Col>        
        )
    },
    crypto : () => {
        return (
            <Col md={3}>
                <Card>    
                    <div className='landing__product__widget__small'>
                        <div className='description'>
                            <h4> CryptoCurrency</h4>
                            <p> Accept Multiple CryptoCurrencies for your Platform </p>
                        </div>
                        <h2 style={{marginTop : 30}}> 0,5% <h5>Per Transaction</h5></h2>
                        <img className='image_widget' src={bitcoin}></img>
                    </div>
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

