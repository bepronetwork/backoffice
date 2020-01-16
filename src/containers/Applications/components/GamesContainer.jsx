/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {  Col, Row } from 'reactstrap';
import GameInfo from './GameInfo';
import { connect } from "react-redux";
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

    async projectData(props){
        console.log(props.data);
        if(props.data.games.data && props.data.games.data[0]){
            const gamesInfo = props.profile.getApp().getSummaryData('gamesInfo').data.data.message;
            const games = getAllGames(props.data.games.data, gamesInfo);
            const wallet = props.data.wallet.data;
            this.setState({...this.state, 
                wallet,
                games
            })
        }
    }

    render() {
       const { wallet, games } = this.state;
        
        return (
            (games.length > 0) ? 
                <Row md={12} xl={12} lg={12} xs={12}>
                    {Object.keys(games).map( key => {
                        return (
                        <Col lg={4}>
                            <GameInfo game={games[key]} wallet={wallet} {...this.props}/>
                        </Col>
                        )
                    })}
                </Row>
            : 
            <div>
                <h4>You have no Games and/or Currencies enabled currently</h4>
                <img src={image} style={{width :'30%', marginTop : 20}}/>
            </div>
        );
    }
}


function getAllGames(data, gamesInfo){
    let games = [];
    for(var i = 0; i < data.length; i++) {
        for(var k = 0; k < data[i].games.length; k++) {
            let exists = false;
            for(var j = 0; j < games.length; j++){
                if(new String(games[j]._id).toLowerCase() == new String(data[i].games[k]._id).toLowerCase()){
                    exists = true;
                }     
            }
            if(!exists){
                let gameAdditionalInfo = gamesInfo.map( item => {
                    if(new String(item._id).toLowerCase() == new String(data[i].games[k]._id).toLowerCase()){
                        return item;
                    }
                }).filter(el => el != null)[0];
                games.push({...data[i].games[k], ...gameAdditionalInfo})
            }
        }
    }

    return games;
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(GamesContainer);

