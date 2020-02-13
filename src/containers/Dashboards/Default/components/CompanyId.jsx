/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { DirectionsIcon } from 'mdi-react';
import { ETHEREUM_NET_DEFAULT } from '../../../../config/apiConfig';
import { emptyObject } from '../../../../lib/misc';
import { compareIDS } from '../../../../lib/string';
const Ava = `${process.env.PUBLIC_URL}/img/dashboard/brand.jpg`;


const defaultProps = {
    platformAddress : '',
    platformName : 'N/A',
    platformId : 'N/A',
    platformDescription : 'N/A',
    ticker : 'No Currency Chosen',
    platformAddressLink : 'N/A'
}

class CompanyId extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
    };


    constructor(props) {
        super(props);
        this.state = { ...defaultProps};
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = async (props) => {
        let app = props.app;
        const { currency } = props;

        if(emptyObject(currency)){return null};

        if(!props.data.wallet.data.wallet){return null}
        let wallets = props.data.wallet.data.wallet;
        const wallet = wallets.find( w => compareIDS(w.currency, currency._id));
        const bank_address = wallet ? wallet.bank_address : null;

        this.setState({...this.state, 
            platformAddress : bank_address ? `${bank_address.substring(0, 6)}...${bank_address.substring(bank_address.length - 2)}` : defaultProps.platformAddress,
            platformId  : app.getId(),
            ticker : currency.ticker ? currency.ticker : defaultProps.ticker,
            platformDescription  :app.getDescription() ? app.getDescription() : defaultProps.platformDescription,
            platformAddressLink : `https://${ETHEREUM_NET_DEFAULT}.etherscan.io/address/` + bank_address,
        })
    }


    render() {
        let { app } = this.props;
        let { platformName } = this.state;
        const { ticker, platformAddressLink, platformAddress } = this.state;

        platformName =  app.getName() ? app.getName() : platformName;

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
                            <h5 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>{platformName}</h5>
                            <p className="" style={{marginTop : 10}} >{new String(ticker).toUpperCase()}</p>
                            <a target={'__blank'} className='ethereum-address-a' href={platformAddressLink}>
                                <p className="ethereum-address-name"> <DirectionsIcon className='icon-ethereum-address' />{platformAddress}</p>
                            </a>
                        </Col>
                    </Row>
                </Card>
            </Col>
        );
    }
}

export default translate('common')(CompanyId);
