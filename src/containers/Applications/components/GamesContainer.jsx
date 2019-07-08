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
            games = this.props.data.games.data[0].games;
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

export default GamesContainer;
