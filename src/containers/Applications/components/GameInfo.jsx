/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import Numbers from '../../../services/numbers';
import game_images from './game_images';
import store from '../../App/store';
import { setGameView } from '../../../redux/actions/game';

class GameInfo extends PureComponent {
 
    constructor() {
        super();
        this.state = {
            activeIndex: 0,
        };
    }

    goToGamePage = async () => {
        let game = this.props.game;
        await store.dispatch(setGameView(game));
        this.props.history.push('/application/game');         
    }

    render() {
        let game = this.props.game;
        let ticker = this.props.wallet.blockchain.ticker;
        let game_image = game_images[new String(game.name).toLowerCase().replace(/ /g,"_")];
        const image = game_image ? game_image : game_images.default;
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <button className='clean_button' onClick={ () => this.goToGamePage()}>
                    <Card className='game-container'>
                        <CardBody className="dashboard__card-widget">
                            <Row>
                                <Col lg={8} >
                                    <div className="dashboard__visitors-chart text-left">
                                        <p className="dashboard__visitors-chart-title text-left" style={{fontSize : 25}}> {game.name} </p>
                                    </div>
                                    <div className="dashboard__visitors-chart text-left" style={{marginTop : 10}}>
                                        <p className="application__span" >Edge</p>
                                        <h4><AnimationNumber number={game.edge}/>%</h4>
                                    </div>
                                </Col>
                                <Col lg={4} >  
                                    <img className='application__game__image' src={image}/>
                                </Col>
                            </Row>
                        
                            <hr/>
                            
                            <Row>

                                <Col lg={6} >
                                    <div className="dashboard__visitors-chart">
                                        <p className="dashboard__visitors-chart-number-second" style={
                                            {color : '#646777'}
                                        }><AnimationNumber number={game.profit}/> <span> {ticker}</span></p>
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
                </button>
            </Col>
        );
    }
}

export default GameInfo;
