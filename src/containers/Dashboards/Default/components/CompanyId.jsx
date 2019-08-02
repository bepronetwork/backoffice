/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { DirectionsIcon } from 'mdi-react';
import { ETHEREUM_NET_DEFAULT } from '../../../../config/apiConfig';
const Ava = `${process.env.PUBLIC_URL}/img/brand.jpg`;


const defaultProps = {
    platformAddress : 'N/A',
    platformBlockchain : 'N/A',
    platformName : 'N/A',
    platformId : 'N/A',
    platformDescription : 'N/A',
    platformAddressLink : 'N/A'
}

class CompanyId extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
    };


    constructor(props) {
        super(props);
        this.state = { ...defaultProps};

        this.projectData(props);
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = (props) => {
        let app = props.app;

        this.setState({...this.state, 
            platformAddress : app.getInformation('platformAddress') ? 
            `${app.getInformation('platformAddress').substring(0, 6)}...${app.getInformation('platformAddress').substring(app.getInformation('platformAddress').length - 2)}` : 
            defaultProps.platformAddress,
            platformId  : app.getId(),
            platformBlockchain : app.getInformation('platformBlockchain') ? app.getInformation('platformBlockchain') : defaultProps.platformBlockchain,
            platformName : app.getName() ? app.getName() : defaultProps.platformName,
            platformDescription  :app.getDescription() ? app.getDescription() : defaultProps.platformDescription,
            platformAddressLink : `https://${ETHEREUM_NET_DEFAULT}.etherscan.io/address/` + app.getInformation('platformAddress'),
        })
    }


    render() {

        return (
            <Col md={12} lg={12} xl={12} >
                <Card>
                    <Row>
                        <Col lg={6}>
                            <CardBody className="dashboard__card-widget">
                                <img className="company-logo-card" src={Ava} alt="avatar" />
                            </CardBody>
                        </Col>
                        <Col lg={6}>
                            <h5 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>{this.state.platformName}</h5>
                            <p className="" style={{marginTop : 10}} >{new String(this.state.platformBlockchain).toUpperCase()}</p>
                            <a target={'__blank'} className='ethereum-address-a' href={this.state.platformAddressLink}>
                                <p className="ethereum-address-name"> <DirectionsIcon className='icon-ethereum-address' />{this.state.platformAddress}</p>
                            </a>
                        </Col>
                    </Row>
                </Card>
            </Col>
        );
    }
}

export default translate('common')(CompanyId);
