/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {  Col, Row } from 'reactstrap';
import GameInfo from './GameInfo';
import { connect } from "react-redux";
import store from '../../App/store';
const image = `${process.env.PUBLIC_URL}/img/dashboard/empty.png`;

class GamesContainer extends PureComponent {
 
    constructor() {
        super();
        this.state = {
            activeIndex : 0,
            games : [],
            wallet : {}
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {

            const gamesInfo = await props.profile.getApp().getSummaryData('gamesInfo').data.data.message;
            const games = await getAllGames(props.data.games.data, gamesInfo);
            const wallet = props.data.wallet.data;

            this.setState({...this.state, 
                wallet,
                games
            })
    }

    hasRestriction(game) {
        if (game.name.toLowerCase().includes('jackpot')) {
            return true;
        } else {
            return false;
        }
    }

    render() {
       const { wallet, games } = this.state;
       const { isLoading } = this.props;

       const myGames = games.filter(game => !this.hasRestriction(game));
        
        return (
            (myGames.length > 0) ? 
                <Row md={12} xl={12} lg={12} xs={12}>
                    {myGames.map(game => {
                        return (
                            <Col lg={4} style={{ minWidth: 290 }}>
                                <GameInfo game={game} isLoading={isLoading} wallet={wallet} {...this.props}/>
                            </Col>

                        )                  
                    })}
                </Row>
            : 
            <div style={{ margin: 10 }}>
                <h4>You have no Games and/or Currencies enabled currently</h4>
                <img src={image} style={{width :'30%', marginTop : 20}}/>
            </div>
        );
    }
}

function getAllGames(data, gamesInfo){
    let allGames = [];

    const gamesOnPeriodicity = data.map(index => index.games);
    const concatGames = [].concat(...gamesOnPeriodicity);

    const games = Object.values([...concatGames].reduce((acc, { _id, name, edge, betsAmount, betAmount, profit, fees }) => {
    acc[_id] = { _id, name, 
        edge: (acc[_id] ? acc[_id].edge : 0) + edge,
        betsAmount: (acc[_id] ? acc[_id].betsAmount : 0) + betsAmount,
        betAmount: (acc[_id] ? acc[_id].betAmount : 0) + betAmount,
        profit: (acc[_id] ? acc[_id].profit : 0) + profit,
        fees: (acc[_id] ? acc[_id].fees : 0) + fees };
    return acc;
    }, {}));

    gamesInfo.filter(game => games.map(g => g._id).includes(game._id)).map(game => {
        games.filter(g => g._id === game._id).map(g => allGames.push({...g, ...game}));
    })

    gamesInfo.filter(game => !games.map(g => g._id).includes(game._id)).map(game => {
        allGames.push({edge: 0, betsAmount: 0, betAmount: 1, profit: 0, fees: 0, ...game });
    });

    return allGames;
}

function mapStateToProps(state){
    return {
        profile: state.profile,
        isLoading: state.isLoading
    };
}

export default connect(mapStateToProps)(GamesContainer);

