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
        const { match, participantId, statistic } = data;

        this.setState({ isLoading: true });

        const response = await App.getSpecificMatch({ match_id: match.external_id });

        if (!_.isEmpty(response.data.message)) {
            this.setState({
                match: response.data.message,
                status: data.status,
                participantId: participantId,
                odd: (1 / statistic).toFixed(2)
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

    getBackgroundColor = status => {
        return results[status].backgroundColor;
    }

    getTextColor = status => {
        return results[status].textColor;
    }

    getTeamName = () => {
        const { match, participantId } = this.state;
        const { opponents } = match;

        const team = opponents.find(opponent => opponent.opponent.id === participantId);

        return team.opponent.name;
    }

    render() {
        const { match, isLoading, status, odd } = this.state;
        const { videogame, opponents, scheduled_at, results } = match;

        if (isLoading || _.isEmpty(match)) {
            return (
                <>
                <MatchesContainer style={{ minWidth: 402 }}>
                    <Skeleton variant="rect" height="10%" width="100%"/>
                    <br/>
                    <Skeleton variant="rect" height="30%" width="100%"/>
                    <br/>
                    <Skeleton variant="rect" height="10%" width="100%"/>
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
                        <span style={{ padding: 0, whiteSpace: "wrap", overflow: "hidden", textOverflow: "ellipsis" }}>{serieName}</span>
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
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0px 10px" }}>
                    <span>
                        { this.getTeamName() }
                        <strong style={{ margin: "0px 8px" }}>{odd}</strong>
                    </span>
                    <WonResult backgroundColor={this.getBackgroundColor(status)} textColor={this.getTextColor(status)}>{status}</WonResult>
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