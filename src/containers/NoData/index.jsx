/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row, Button, Progress } from 'reactstrap';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Ava = `${process.env.PUBLIC_URL}/img/astronaur.png`;

class NoDataContainer extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
        };
    }


    goToDeveloperTools = () => {
        this.props.history.push('/developers')
    }

    getProgress(...args){
        return (args.filter(v => v).length)/args.length*100;
    }

    componentWillReceiveProps(props){

        const app = props.app;

        let 
        hasBearerToken =  !_.isUndefined(app.getBearerToken()),
        isConnected     =  !_.isUndefined(app.isConnected());

        let progress = this.getProgress(hasBearerToken, isConnected)
        this.setState({...this.state, progress, hasBearerToken, isConnected});
    }

    render() {



        return (
            <Col md={12} lg={12} xl={12} >
                <Card>
                    <Row>
                        <Col lg={12}>
                        
                            <CardBody className="dashboard__card-widget">
                                <Row>
                                    <Col lg={4}>
                                        <img style={{width : '80%', margin : 'auto'}} src={Ava} alt="avatar" />
                                    </Col>
                                    <Col lg={8}>
                                            <h6 style={{marginTop : 20, marginBottom : 40}} className={"dashboard__total-stat"}>
                                                {this.state.progress}% Progress Until Starting your Betting Application!
                                            </h6>

                                            <div className="progress-wrap">
                                                <Progress value={this.state.progress} style={{width : 100}} />
                                            </div>                                        
                                        <Row>
                                            <Col lg={12}>
                                                <button disabled={this.state.hasBearerToken} style={{margin : 'auto', marginBottom  : 30,  maxWidth : 300}} className="btn btn-primary account__btn" onClick={() => this.goToDeveloperTools()} > 
                                                    Create an API Token for Integration
                                                </button>
                                            </Col>
                                            <Col lg={12}>
                                                <button disabled={this.state.isConnected} style={{margin : 'auto', marginBottom  : 30,  maxWidth : 300}} className="btn btn-primary account__btn" onClick={() => this.goToDeveloperTools()} > 
                                                    Connect your Platform
                                                </button>
                                            </Col>
                                        </Row>
                                    
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
