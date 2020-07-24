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
import store from '../../App/store';
import { setLoadingStatus } from '../../../redux/actions/loadingAction';
import Skeleton from '@material-ui/lab/Skeleton';


const defaultState = {
    ecosystemGames : [],
    appGames : [],
    isLoading: false
    
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

        this.setState({
            isLoading: true
        })

        let ecosystemGames = await profile.getApp().getEcosystemGames();
        if(!(await profile.getApp().getSummaryData('gamesInfo').data)){return null}
        let appGames = (await profile.getApp().getSummaryData('gamesInfo')).data.data.message;

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
            appGames,
            isLoading: false
        })

    }

    addGame = async game => {
        const { profile } = this.props;
        await profile.getApp().addGameToPlatform({game : game._id});
        await profile.setGameDataAsync();
        await this.projectData(this.props)
    }


    render = () => {
        const { ecosystemGames, isLoading } = this.state;
        const { loading } = this.props;

        const games = ecosystemGames.filter(game => game.isValid);

        if ((_.isEmpty(games) && isLoading) || loading) {
            return (
                <div>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                        {_.times(7, () => (
                            <Grid item xs>
                            <Col md={12} xl={12} lg={12} xs={12} style={{ minWidth: 288, maxWidth: 415, height: 230, padding: 0 }}>
                            <Card className='game-container'>
                                <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                                    <Grid container direction='row' spacing={1}>
                                        <Grid item xs={3}>
                                            <Skeleton variant="circle" width={50} height={50} style={{ marginBottom: 10, marginLeft: 'auto', marginRight: 0 }}/>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Skeleton variant="rect" width="60%" height={30} style={{ marginTop: 10, marginBottom: 10 }}/>
                                            <Skeleton variant="rect" width="100%" height={20} style={{ marginTop: 10, marginBottom: 20 }}/>
                                        </Grid>           
                                    </Grid>
                                    <Skeleton variant="rect" width="30%" height={30} style={{ marginBottom: 10 }}/>
                                </CardBody>
                            </Card>
                            </Col>
                        </Grid>

                        ))}
                    </Grid>
                </div>
            )
        }

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
        profile: state.profile,
        loading: state.isLoading
    };
}

GameStorePageContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(GameStorePageContainer);

