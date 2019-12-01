import React from 'react';
import { Button, ButtonToolbar, Container, Row, Col, CardBody, Card } from 'reactstrap';

import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import store from '../../../App/store';
import { AddressMarkerIcon, BitcoinIcon, Number1BoxOutlineIcon, DirectionsIcon } from 'mdi-react';
import { AddressConcat } from '../../../../lib/string';
import _ from 'lodash';
import { setAppCreationInfo } from '../../../../redux/actions/appCreation';
import appCreationConfig from '../../../../config/appCreation';
import { ETHEREUM_NET_DEFAULT } from '../../../../config/apiConfig';

class WizardFormTwo extends React.Component{
    constructor(props){super(props); this.state = {}}

    setWidget = ({key, value}) => {
        store.dispatch(setAppCreationInfo({key, value}));
    }

  

    currencyBox = (object) => {
        const { type, ticker, image, address, decimals } = object;
        const { appCreation } = this.props;
        let isSet = (appCreation[`${type.toLowerCase()}`] && (appCreation[`${type.toLowerCase()}`].ticker == ticker));

        return (
            <button className='clean_button' onClick={ () => this.setWidget({key : `${type.toLowerCase()}`, value : object})}>
                <Card>
                    {isSet ? <div> <h5 className={`widget__use__big`} style={{marginTop : -40}}> Integrate </h5></div> : null}
                    <div className='landing__product__widget__small'>
                        <div className='description'>
                            <h4> {type}</h4>
                            <p> {ticker} </p>
                            <a target={'__blank'} className='ethereum-address-a' href={`https://${ETHEREUM_NET_DEFAULT}.etherscan.io/token/${address}`}>
                                <p className="ethereum-address-name"> <DirectionsIcon className='icon-ethereum-address'/>
                                    {AddressConcat(address)}
                                </p>
                            </a>
                            <span> {decimals} Decimals </span>
                        </div>
                        <img className='image_widget' src={image}></img>
                    </div>
                </Card>
            </button>
        )
    }

    blockchainBox = (object) => {
        const { type, ticker, image, name } = object;
        const { appCreation } = this.props;
        let isSet = (appCreation[`${type.toLowerCase()}`] && (appCreation[`${type.toLowerCase()}`].ticker == ticker));

        return (
            <button className='clean_button' onClick={ () => this.setWidget({key : `${type.toLowerCase()}`, value : object})}>
                <Card>
                    {isSet ? <div> <h5 className={`widget__use__big`} style={{marginTop : -40}}> Integrate </h5></div> : null}
                    <div className='landing__product__widget__small'>
                        <div className='description'>
                            <h4> {type}</h4>
                            <p> {name} </p>
                        </div>
                        <img className='image_widget' src={image}></img>
                    </div>
                </Card>
            </button>
        )
    }


    render = () => {
        const { blockchains, currencies } = this.props;

        return(
            <div style={{width : '80%'}}>
                <Row>                            
                    <Col md={12} xl={12} lg={12} xs={12}>
                        <Card>
                            <Container>   
                                <h4>
                                    Blockchain Platform
                                </h4>
                                <Row>
                                    {blockchains.map( (token) => {
                                        let image = appCreationConfig['blockchains'][new String(token.ticker).toLowerCase()].image;
                                        if(!image){return null}
                                        return (
                                            <Col lg={4}>
                                                {this.blockchainBox({type : 'Blockchain', ticker : token.ticker, name : token.name, image : image})}
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </Container>
                        </Card>
                    </Col>                
                </Row>
                <Row>                            
                    <Col md={12} xl={12} lg={12} xs={12}>
                        <Card>
                            <Container>   
                                <h4>
                                    Currency
                                </h4>
                                <Row>
                                    {currencies.map( (token) => {
                                        return (
                                            <Col lg={4}>
                                                {this.currencyBox({type : 'Currency', ticker : token.ticker, address : token.address, decimals : token.decimals, image : token.image})}
                                            </Col>
                                        )
                                    })}
                                    
                                </Row>
                            </Container>
                        </Card>
                    </Col>                
                </Row>
                <ButtonToolbar style={{margin : 'auto'}} className="form__button-toolbar wizard__toolbar">
                    <Button style={{margin : 'auto'}} color="primary" type="button" className="previous" onClick={ () => this.props.previousPage()}>Back</Button>
                    <Button style={{margin : 'auto'}} color="primary" type="submit" className="next"  onClick={ () => this.props.onSubmit()}>Next</Button>
                </ButtonToolbar>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile,
        appCreation: state.appCreation
    };
}


export default compose(reduxForm({
	form: 'wizard', //                 <------ same form name
}),  connect(mapStateToProps))(WizardFormTwo);
