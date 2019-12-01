import React from 'react';
import { Button, ButtonToolbar, Container, Row, Col, CardBody, Card } from 'reactstrap';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import { Progress } from 'reactstrap';
import { ETHEREUM_NET_DEFAULT } from '../../../../config/apiConfig';
import { AddressConcat } from '../../../../lib/string';
import TextInput from '../../../../shared/components/TextInput';
import { DirectionsIcon } from 'mdi-react';
import appCreationConfig from '../../../../config/appCreation';
const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;

const defaultProps = {
    metamaskAddress : 'N/A',
    progress : 0
}

class WizardFormThree extends React.Component{
    constructor(props){super(props); this.state = defaultProps}
  
    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = async (props) => {
        let user = !_.isEmpty(props.profile) ? props.profile : null ;
        let metamaskAddress = user ? await user.getMetamaskAddress() : defaultProps.userMetamaskAddress;        
        if(user){
            this.setState({...this.state, 
                userMetamaskAddress : user ? metamaskAddress : defaultProps.userMetamaskAddress,
            })
        }
    }



    currencyBox = (object) => {
        const { type, ticker, image, address, decimals } = object;
        const { appCreation } = this.props;
        let isSet = (appCreation[`${type.toLowerCase()}`] && (appCreation[`${type.toLowerCase()}`].ticker == ticker));
        if(!isSet){return null};

        return (
                <Card>
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
        )
    }

    blockchainBox = (object) => {
        const { type, ticker, image, name } = object;
        const { appCreation } = this.props;
        let isSet = (appCreation[`${type.toLowerCase()}`] && (appCreation[`${type.toLowerCase()}`].ticker == ticker));

        if(!isSet){return null};

        return (
                <Card>
                    <div className='landing__product__widget__small'>
                        <div className='description'>
                            <h4> {type}</h4>
                            <p> {name} </p>
                        </div>
                        <img className='image_widget' src={image}></img>
                    </div>
                </Card>
        )
    }

    render = () => {
        const { isLoading, deployApp, blockchains, currencies, authorizedAddress, deploymentState, progress } = this.props;
        
        return(
            <div style={{width : '80%'}}>
                <div className="dashboard__visitors-chart" >
                    <h3 className="dashboard__visitors-chart-title" style={{marginTop : 30, textAlign : 'center'}}> Complete </h3>
                    <h5  style={{marginTop : 30, marginBottom : 20, textAlign : 'center'}}> A metamask prompt will appear to create and deploy your smart-contract </h5>
                </div>
                <Row>                            
                    <Col md={6}>
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
                    <Col md={6}>
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
                <Row>                            
                    <Col md={6}>
                        <Card>
                            <Container>   
                                <h4>
                                    App Management Address
                                </h4>
                                <Row>
                                    <Col lg={4}>
                                        <Card>
                                            <div className='landing__product__widget__small'>
                                                <div className='description'>
                                                    <h5> {this.state.userMetamaskAddress} </h5>
                                                    <p> This Address will have all control of the platform </p>
                                                </div>
                                            </div>
                                        <h6> To change the Address use Metamask or your Extension Installed </h6>
                                        </Card>
                                    </Col>
                                </Row>
                                
                            </Container>
                        </Card>
                    </Col>         
                    <Col md={6}>
                        <Card>
                            <Container>   
                                <h4>
                                    Platform Authorized Croupier
                                </h4>
                                <Row>
                                    <Col lg={4}>
                                        <Card>
                                            <div className='landing__product__widget__small'>
                                                <div className='description'>
                                                    <h5> {authorizedAddress} </h5>
                                                    <p> This Address will manage your App via @BetProtocol </p>
                                                </div>
                                            </div>
                                            <h6> You can change this Address later </h6>
                                        </Card>
                                    </Col>
                                </Row>
                                
                            </Container>
                        </Card>
                    </Col>                
                </Row>
                <div>
                   
                    <h4 style={{marginTop : 20, marginBottom : 40}} className={"dashboard__total-stat"}>
                        {parseInt(progress)}% {deploymentState}
                    </h4>
                    <div className="progress-wrap">
                        <Progress value={progress} style={{width : 100}} />
                    </div>  
                </div>
                <ButtonToolbar style={{margin : 'auto'}} className="form__button-toolbar wizard__toolbar">
                    <Button style={{margin : 'auto'}} color="secondary" type="button" className="previous" onClick={ () => this.props.previousPage()}>Back</Button>
                    <Button disabled={isLoading} style={{margin : 'auto'}} color="primary" type="submit" className="next"  onClick={ () => deployApp()}> 
                        { !isLoading ? 'Create Application' : <img src={loading} className={'loading_gif'}></img> } 
                    </Button>
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
}),  connect(mapStateToProps))(WizardFormThree);
