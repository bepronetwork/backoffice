import React from 'react';
import { connect } from "react-redux";
import { MatchesContainer, SerieInfo, DateInfo, Time, Date as DateSpan, Score, TeamOne, Result, ResultValue, WonResult, TeamTwo, VideoGameIcon } from './styles';
import Avatar from 'react-avatar';
import Skeleton from "@material-ui/lab/Skeleton";
import videogames from '../../../Applications/EsportsPage/components/Enums/videogames';

import _ from 'lodash';
import moment from 'moment';

const results = Object.freeze({
    "pending": { 
        backgroundColor: "#DFE1EC", textColor: "#333333"
    },
    "gain": {
        backgroundColor: "#63c965", textColor: "white"
    },
    "loss": {
        backgroundColor: "#e6536e", textColor: "white"
    }
})

class Match extends React.Component {
 
    constructor() {
        super();
        this.state = {
            match: {},
            isLoading: false
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { data, profile } = props;
        const { App } = profile;
        const { match } = data;

        this.setState({ isLoading: true });

        const response = await App.getSpecificMatch({ match_id: match.external_id });

        if (!_.isEmpty(response.data.message)) {
            this.setState({
                match: response.data.message,
                status: data.status
            })
        }

        this.setState({ isLoading: false });
    }
    
    getSerieName = () => {
        const { match } = this.state;
        const { league, serie, tournament } = match;

        return `${league.name} ${serie.full_name} - ${tournament.name}`;
    }

    getTeamScore = id => {
        const { match } = this.state;
        const { results } = match;

        const result = results.find(result => result.team_id === id);

        return result ? result.score : null;
    }


    render() {
        const { match, isLoading, status } = this.state;
        const { videogame, opponents, scheduled_at, odds, results, winner_id } = match;

        if (isLoading || _.isEmpty(match)) {
            return (
                <>
                <MatchesContainer>
                    <Skeleton variant="rect" height="95%" width="95%"/>
                </MatchesContainer>
                </>
            )
        }

        const serieName = this.getSerieName();
        const time = new Date(scheduled_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        const date = moment(new Date(scheduled_at)).format('MM/DD');

        const { icon } = videogames[videogame.id];

        const [teamOne, teamTwo] = opponents.map(opponent => opponent.opponent);
        const [scoreTeamOne, scoreTeamTwo] = results ? opponents.map(opponent => this.getTeamScore(opponent.opponent.id)) : [null, null];

        return (
            <>
            <MatchesContainer>
                <SerieInfo>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <VideoGameIcon>
                            { icon }
                        </VideoGameIcon>
                        <span style={{ padding: 0 }}>{serieName}</span>
                    </div>
                    <div>
                        <DateInfo style={{ flexDirection: "row" }}>
                            <Time style={{ margin: 5, padding: 0 }}>
                                { time }
                            </Time>
                            <DateSpan style={{ margin: 5, padding: 0 }}>
                                { date }
                            </DateSpan>
                        </DateInfo> 
                    </div>
                </SerieInfo>
                <Score> 
                    <TeamOne>
                        <span>{teamOne.name}</span>
                        { teamOne.image_url ? <img src={teamOne.image_url} alt={teamOne.name}/> : <Avatar name={teamOne.name} size="35" round={true}/> } 
                    </TeamOne>
                        <Result>
                            <ResultValue>
                                { scoreTeamOne }
                            </ResultValue>
                            <span>vs</span> 
                            <ResultValue>
                                { scoreTeamTwo }
                            </ResultValue>
                        </Result>
                    <TeamTwo>
                        { teamTwo.image_url ? <img src={teamTwo.image_url} alt={teamTwo.name}/> : <Avatar name={teamTwo.name} size="35" round={true}/> } 
                        <span>{teamTwo.name}</span>
                    </TeamTwo>
                </Score>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <WonResult backgroundColor={results[status].backgroundColor} textColor={results[status].textColor}>{status}</WonResult>
                </div>
            </MatchesContainer>
            </>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(Match);