import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import Slider from './components/Slider';
import Numbers from '../../../services/numbers';
import game_images from '../components/game_images';
import { ArrowExpandRightIcon, LockIcon, BankIcon } from 'mdi-react';
import TextInput from '../../../shared/components/TextInput';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
const edge = `${process.env.PUBLIC_URL}/img/edge.png`;
const tableLimit = `${process.env.PUBLIC_URL}/img/tableLimit.png`;


const defaultState = {
    name : 'N/A',
    edge : 0,
    tableLimit : 0,
    new_tableLimit : 0,
    currencyTicker : 'N/A',
    new_edge : 0,
    id : 'N/A',
    locks : {
        tableLimit : true,
        edge : true

    }
}

class GamePageContainer extends React.Component{

    constructor(props){
        super(props)
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        let reduxGame = props.game;
        this.updateGameView({game : reduxGame});
    }
    
    projectData = (props) => {
        let { edge, name, profit, _id, betsAmount, betAmount, fees, tableLimit } = props.game;
        let currencyTicker = this.props.profile.getApp().getCurrencyTicker();
        this.setState({...this.state, 
            edge,
            tableLimit,
            currencyTicker,
            name,
            profit : Numbers.toFloat(profit),
            id : _id,
            betsAmount : Numbers.toFloat(betsAmount),
            turnover : Numbers.toFloat(betAmount), 
            fees : Numbers.toFloat(fees)
        })
    }

    onChange = ({type, value}) => {
        this.setState({...this.state, [`new_${type}`] : value })
    }

    unlockField = ({field}) => {
        this.state.locks[field] = false; 
    }

    lockField = ({field}) => {
        this.state.locks[field] = true; 
    }

    confirmChanges = async ({field}) => {
        var { profile } = this.props;
        switch(field){
            case 'edge' : {
                // Change Edge
                await profile.getApp().editEdge({game : this.state.id, edge : this.state[`new_${field}`]});
                break;
            };
            case 'tableLimit' : {
                // Change Table Limit
                let res = await profile.getApp().editTableLimit({game : this.state.id, tableLimit : this.state[`new_${field}`]});
                console.log(res);
                break;
            }
        }
        this.state.locks[field] = true; 
        let reduxGame = this.props.game;
        this.updateGameView({game : reduxGame});
    }

    updateGameView = async ({game}) => {
        let reduxGame = game;
        let res = await this.props.profile.getApp().getGames();
        let games = res.data.message;
        game = games.map( item => {
            if(item._id == reduxGame._id){
                return item;
            }
        }).filter(el => el != null)[0];
        this.projectData({ game : {...reduxGame, edge : game.edge, tableLimit : game.tableLimit}});
    }

    render = () => {

        return (
            <Container className="dashboard">
                <Row>
                    <Col lg={4}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col lg={4}>
                                        <img className='application__game__image' src={game_images[new String(this.state.name).toLowerCase().replace(/ /g,"_")]}/>
                                    </Col>
                                    <Col lg={8}>
                                        <h5 className="">Game Name</h5>
                                        <h3 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>{this.state.name}</h3>
                                        <p style={{marginTop : 10}} className={"dashboard__total-stat"}>#{this.state.id}</p>
                                    </Col>
                                </Row>
                               
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={8}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md={4}>
                                        <h5 className="">Bets Amount</h5>
                                        <p className="dashboard__visitors-chart-number-second">
                                            <AnimationNumber number={this.state.betsAmount}/> 
                                        </p>
                                    </Col>
                                    <Col md={4}>
                                        <h5 className="">Turnover</h5>
                                        <p className="dashboard__visitors-chart-number-second">
                                            <AnimationNumber number={this.state.turnover}/> 
                                            <span> {this.state.currencyTicker} </span> 
                                        </p>
                                    </Col>
                                    <Col md={4}>
                                        <h5 className="">Profit</h5>
                                        <p className="dashboard__visitors-chart-number-second">
                                            <AnimationNumber number={this.state.profit}/> 
                                            <span> {this.state.currencyTicker} </span> 
                                        </p>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
                <Row>
                    <Col lg={4}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md={4}>
                                        <img className='application__game__image' src={edge}/>
                                        <hr></hr>
                                        <h5 className="">Edge</h5>
                                        <h3 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>{this.state.edge}%</h3>
                                    </Col>
                                    <Col md={8}>
                                        <EditLock unlockField={this.unlockField} lockField={this.lockField} confirmChanges={this.confirmChanges} type={'edge'} locked={this.state.locks.edge}>
                                            <h6 className="">New Edge </h6>
                                            <h5 className={"bold-text dashboard__total-stat"}>{this.state.new_edge}%</h5>
                                            <Slider disabled={this.state.locks.edge} value={this.state.edge} onChange={this.onChange}/>
                                        </EditLock>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md={4}>
                                        <img className='application__game__image' src={tableLimit}/>
                                        <hr></hr>
                                        <h5 className="">Table Limit ({this.state.currencyTicker})</h5>
                                        <h3 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>{this.state.tableLimit}</h3>
                                    </Col>
                                    <Col md={8}>
                                        <EditLock unlockField={this.unlockField} lockField={this.lockField} confirmChanges={this.confirmChanges} type={'tableLimit'} locked={this.state.locks.tableLimit}>
                                            <h6 className="">New Table Limit </h6>
                                            <h5 className={"bold-text dashboard__total-stat"}>{this.state.new_tableLimit} {this.state.currencyTicker} </h5>
                                            <TextInput
                                                icon={BankIcon}
                                                name="tableLimit"
                                                label="Table Limit"
                                                type="number"
                                                disabled={this.state.locks.tableLimit}
                                                changeContent={ (type, value) => this.onChange({type, value})}
                                            />
                                        </EditLock>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={4}>
                      
                    </Col>
                </Row>
          </Container>
        )
    }
} 


const EditLock = (props) => {
    return(
        <div className={`${props.locked ? 'locker-container' : null}`}>
            {props.children}
            <div style={{marginTop : 20}}>
                {props.locked ?
                    <Button onClick={() => props.unlockField({field : props.type})} className="icon" outline>
                        <p><LockIcon className="deposit-icon"/> Unlock</p>
                    </Button>
                :        
                    <div>
                        <Button onClick={() => props.lockField({field : props.type})} className="icon" outline>
                            <p><LockIcon className="deposit-icon"/> Lock </p>
                        </Button>
                        <Button onClick={() => props.confirmChanges({field : props.type})} className="icon" outline>
                            <p><ArrowExpandRightIcon className="deposit-icon"/> Confirm </p>
                        </Button>
                    </div>        
                }
            </div>
        </div>
    )
}
   

function mapStateToProps(state){
    
    return {
        profile: state.profile,
        game : state.game
    };
}

GamePageContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(GamePageContainer);

