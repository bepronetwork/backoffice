/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
const Ava = `${process.env.PUBLIC_URL}/img/brand.jpg`;

const data = [
  { name: 'Page A', amt: 2400 },
  { name: 'Page B', amt: 2210 },
  { name: 'Page C', amt: 2290 },
  { name: 'Page D', amt: 2000 },
  { name: 'Page E', amt: 2181 },
  { name: 'Page F', amt: 2500 },
  { name: 'Page G', amt: 2100 },
  { name: 'Page H', amt: 2290 },
  { name: 'Page I', amt: 2000 },
  { name: 'Page J', amt: 2181 },
];

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
    const { activeIndex } = this.state;
    const activeItem = data[activeIndex];
    const app = this.props.app;
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
						<h5 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>{app.getName()}</h5>
						<p className="">
							{app.getDescription()}
						</p>
					</Col>
				</Row>
			</Card>
		</Col>
    );
  }
}

export default translate('common')(CompanyId);
