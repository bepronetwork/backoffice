/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';


class CurrencyInfo extends PureComponent {
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
  
    return (
		<Col md={12} lg={12} xl={12} >
			<Card>
                <Row>
                    <Col lg={6}>
                        <h3 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>Deposit</h3>
                        <p className="">
                            Choose which Currency you want to Deposit 
                        </p>
                    </Col>
                </Row>
			</Card>
		</Col>
    );
  }
}

export default translate('common')(CurrencyInfo);
