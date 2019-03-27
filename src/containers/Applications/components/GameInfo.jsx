/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import Numbers from '../../../services/numbers';
import game_images from './game_images';

class GameInfo extends PureComponent {
 
    constructor() {
        super();
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
        let game = this.props.game;

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget">
                        <Row>
                            <Col lg={4} >  
                                <img className='application__game__image' src={game_images[new String(game.name).toLowerCase()]}/>
                            </Col>
                            <Col lg={6} >
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-title" style={{fontSize : 25}}> {game.name} </p>
                                </div>
                            </Col>
                            <Col lg={2} >
                                <div className="dashboard__visitors-chart">
                                    <p className="application__span" >Edge <AnimationNumber number={game.edge}/> %</p>
                                </div>
                            </Col>
                        </Row>
                    
                        <hr/>
                        
                        <Row>

                            <Col lg={6} >
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-number-second" style={
                                        {color : '#646777'}
                                    }><AnimationNumber number={game.profit}/> €</p>
                                </div>
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-title"> Profit  </p>
                                </div>
                            </Col>
                            <Col lg={6} >
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-number-second" style={
                                        {color : '#646777'}
                                    }><AnimationNumber number={game.betAmount-1}/></p>
                                </div>
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-title"> Bets Amount</p>
                                </div>
                            </Col>
                           
                        </Row>
                        <p className="application__span">this week </p>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default GameInfo;
