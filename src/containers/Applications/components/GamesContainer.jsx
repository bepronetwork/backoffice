/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import GameInfo from './GameInfo';
import Numbers from '../../../services/numbers';

class GamesContainer extends PureComponent {
 
    constructor() {
        super();
        this.state = {
            activeIndex: 0,
        };
    }

    render() {
        let games = [];
        var wallet = {};

        if(this.props.data.games.data[0]){
            games = getAllGames(this.props.data.games.data);
            wallet = this.props.data.wallet.data;
        }
        
        return (
            <Row md={12} xl={12} lg={12} xs={12}>
                {Object.keys(games).map( key => {
                    return (
                    <Col lg={4}>
                        <GameInfo game={games[key]} wallet={wallet} {...this.props}/>
                    </Col>
                    )
                })}
            </Row>
        );
    }
}


function getAllGames(data){
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
                games.push(data[i].games[k])
            }
        }
    }
    return games;
}

export default GamesContainer;
