/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Skeleton from "@material-ui/lab/Skeleton";
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import Numbers from '../../../services/numbers';
import game_images from './game_images';
import store from '../../App/store';
import { setGameView } from '../../../redux/actions/game';
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';

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
        const { currency, isLoading } = this.props;
        let game = this.props.game;
        let ticker = currency.ticker;
        let game_image = game_images[new String(game.name).toLowerCase().replace(/ /g,"_")];
        const image = game_image ? game_image : game_images.default;
        return (
            <Col md={12} xl={12} lg={12} xs={12} style={{height: `100%`, minWidth: 290 }}>
                {isLoading ? (
                <>
                <Card className='game-container'>
                    <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                        <Grid container direction='row' spacing={1}>
                            <Grid item xs={9}>
                                <Skeleton variant="rect" width={120} height={29} style={{ marginTop: 10, marginBottom: 10 }}/>
                            </Grid>
                            <Grid item xs={3}>
                                <Skeleton variant="circle" width={50} height={50} style={{ marginBottom: 10, marginLeft: 'auto', marginRight: 0 }}/>
                            </Grid>           
                        </Grid>
                        <Skeleton variant="rect" width={120} height={29} style={{ marginBottom: 10 }}/>
                        <Skeleton variant="rect" height={130} style={{ marginBottom: 10 }}/>
                    </CardBody>
                </Card>
                </>   
                ) : (
                <button className='clean_button' onClick={ () => this.goToGamePage()} style={{width: `100%`, height: `100%` }}>
                    <Card className='game-container'>
                        <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                            <Row>
                                <Col lg={8} >
                                    <div className="dashboard__visitors-chart text-left">
                                        <p className="dashboard__visitors-chart-title text-left" style={{fontSize : 20}}> {game.name} </p>
                                    </div>
                                    <div className="dashboard__visitors-chart text-left" style={{marginTop : 10}}>
                                        <p className="application__span" >Edge</p>
                                        <h4><AnimationNumber number={game.edge}/>%</h4>
                                    </div>
                                </Col>
                                <Col lg={4} >
                                    <img className='application__game__image' style={{width: `50px`}} src={image}/>
                                </Col>
                            </Row>
                        
                            <hr/>
                            
                            <Row>

                                <Col lg={6} >
                                    <div className="dashboard__visitors-chart">
                                        <p className="dashboard__visitors-chart-title"> Profit  </p>
                                    </div>
                                    <div className="dashboard__visitors-chart">
                                        <p className="dashboard__visitors-chart-number-second" style={
                                            {color : '#646777'}
                                        }><AnimationNumber decimals={6} number={game.profit}/> <span> {ticker}</span></p>
                                    </div>
                                </Col>
                               
                                <Col lg={6} >
                                    <div className="dashboard__visitors-chart">
                                            <p className="dashboard__visitors-chart-title"> Bets Amount</p>
                                    </div>
                                    <div className="dashboard__visitors-chart">
                                        <p className="dashboard__visitors-chart-number-second" style={
                                            {color : '#646777'}
                                        }><AnimationNumber decimals={0} number={game.betAmount-1}/></p>
                                    </div>
                                </Col>
                            
                            </Row>
                            <p className="application__span">this week </p>
                        </CardBody>
                    </Card>
                </button>
                )}
            </Col>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile,
        currency : state.currency
    };
}

export default connect(mapStateToProps)(GameInfo);

