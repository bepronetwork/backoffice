import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import { ArrowExpandRightIcon, LockIcon, BankIcon } from 'mdi-react';
import GameStoreContainer from './Game';
import { Grid } from '@material-ui/core';


const defaultState = {
    ecosystemGames : [],
    appGames : []
    
}

class GameStorePageContainer extends React.Component{

    constructor(props){
        super(props)
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }
    
    projectData = async (props) => {
        let { profile } = props;
        let ecosystemGames = await profile.getApp().getEcosystemGames();
        if(!(profile.getApp().getSummaryData('gamesInfo').data)){return null}
        let appGames = (profile.getApp().getSummaryData('gamesInfo')).data.data.message;

        ecosystemGames = ecosystemGames.map( ecoGame => {
            let exists = false;
            appGames.map( appGame => {
                if(appGame.metaName == ecoGame.metaName){
                    exists = true;
                };
            })
            if(!exists){return ecoGame}
            else{ return {...ecoGame, isAdded : true}}
        }).filter(el => el != null);

        this.setState({...this.state, 
            ecosystemGames,
            appGames
        })
    }

    addGame = async game => {
        const { profile } = this.props;
        await profile.getApp().addGameToPlatform({game : game._id});
        await profile.setGameDataAsync();
        await this.projectData(this.props)
    }


    render = () => {
        const { ecosystemGames } = this.state;

        const games = ecosystemGames.filter(game => game.isValid);

        return (
            <div>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                    {games.map(game => {
                        return (
                            <Grid item xs>
                                <GameStoreContainer
                                    game={game}
                                    isAdded={game.isAdded}
                                    onClick={this.addGame}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

GameStorePageContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(GameStorePageContainer);

