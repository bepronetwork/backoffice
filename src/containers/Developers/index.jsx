import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import DocsContainer from './components/DocsContainer';
import BearerTokenTableApiKeys from './components/BearerTokenTableApiKeys';
import TableKey from './components/TableKey';

const defaultProps = {
    platformAddress : 'N/A',
    platformId : 'N/A',
    tokenAddress : 'N/A',
    apiKey : 'N/A',
    croupierAddress : 'N/A',
    ownerAddress : 'N/A'
}

class DevelopersContainer extends React.Component{

    constructor(props){
        super(props)
        this.state = defaultProps;
    }


    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = (props) => {
        let { profile } = props;
        let app = profile.getApp();
        
        this.setState({...this.state, 
            platformAddress : app.getInformation('platformAddress') ? app.getInformation('platformAddress') : defaultProps.platformAddress,
            platformId  : app.getId(),
            ownerAddress :  app.getInformation('ownerAddress') ? app.getInformation('ownerAddress') : defaultProps.ownerAddress,
            croupierAddress :  app.getInformation('croupierAddress') ? app.getInformation('croupierAddress') : defaultProps.croupierAddress,
            tokenAddress :  app.getInformation('platformTokenAddress') ? app.getInformation('platformTokenAddress') : defaultProps.tokenAddress,
            apiKey : app.getBearerToken()
        })
    }

    render = () => {
        const { platformId, platformAddress, apiKey, tokenAddress, ownerAddress, croupierAddress} = this.state;

        return (
            
            <Container className="dashboard">
                <Row>
                    <Col lg={12}>
                        <DocsContainer/>           
                    </Col>  
                </Row>
                <Row>
                    <Col lg={12}>
                        <BearerTokenTableApiKeys data={apiKey}/>    
                        <Row>
                            <Col lg={4}>
                                <TableKey type={'Platform Id'} value={platformId}/>                                  
                            </Col>  
                            <Col lg={4}>
                                <TableKey type={'Platform Address'} value={platformAddress}/>  
                            </Col>
                            <Col lg={4}>
                                <TableKey type={'Token Address'} value={tokenAddress}/>  
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <TableKey type={'Croupier Authorized Address'} value={croupierAddress}/>  
                            </Col>
                            <Col lg={6}>
                                <TableKey type={'Owner Authorized Address'} value={ownerAddress}/>  
                            </Col>
                        </Row>
                    </Col>
                </Row>
          </Container>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

DevelopersContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(DevelopersContainer);

