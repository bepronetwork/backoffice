/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { DirectionsIcon } from 'mdi-react';
import CasinoContract from '../../../../controllers/CasinoContract';
const Ava = `${process.env.PUBLIC_URL}/img/brand.jpg`;

class CompanyId extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
        activeIndex: 0,
        };
    }

    handleClick = (index) => {
        this.setState({
        activeIndex: index,
        });
    };

    render() {

        const app = this.props.app;
        let platformAddress = app.getInformation('platformAddress') || '0x';
        let platformName = app.getName();
        let platformDescription = app.getDescription();

        let contract = new CasinoContract({contractAddress : platformAddress});

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
						<p className="">{platformDescription}</p>
                        <a target={'__blank'} className='ethereum-address-a' href={'https://ropsten.etherscan.io/address/' + platformAddress}>
                           <p className="ethereum-address-name"> <DirectionsIcon className='icon-ethereum-address' />{`${platformAddress.substring(0, 6)}...${platformAddress.substring(platformAddress.length - 2)}`}</p>
                        </a>
					</Col>
				</Row>
			</Card>
		</Col>
    );
  }
}

export default translate('common')(CompanyId);
