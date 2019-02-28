/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
const Ava = `${process.env.PUBLIC_URL}/img/astronaur.png`;

class NoDataContainer extends PureComponent {
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

    goToDeveloperTools = () => {
        this.props.history.push('/developers')
    }

    render() {
        const app = this.props.app;
        return (
            <Col md={12} lg={12} xl={12} >
                <Card>
                    <Row>
                        <Col lg={12}>
                        
                            <CardBody className="dashboard__card-widget">
                                <Row>
                                    <Col lg={4}>
                                        <img style={{width : 400, margin : 'auto'}} src={Ava} alt="avatar" />
                                    </Col>
                                    <Col lg={8}>
                                        <h4 style={{marginTop : 20, marginBottom : 20}} className={"dashboard__total-stat"}>
                                            {app.getName()} has no API Connection to Display Data
                                        </h4>
                                        <button style={{margin : 'auto',  maxWidth : 200}} className="btn btn-primary account__btn" onClick={() => this.goToDeveloperTools()} > Connect API </button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Col>
                        
                    </Row>
                </Card>
            </Col>
        );
    }
}

export default translate('common')(NoDataContainer);
