import React from 'react';
import { connect } from 'react-redux';
import { MatchContainer, MatchSummary, SerieSummary, Score, InfoContainer, VideoGameIcon, TeamOne, TeamTwo, DateInfo, Time, Date as DateSpan, MatchIcon, MatchStatus, SerieInfo, BookButton, RemoveBookButton, Result, ResultValue, Draw, TabsContainer } from './styles';
import _ from 'lodash';
import Avatar from 'react-avatar';
import moment from 'moment';

import videogames from '../Enums/videogames';
import matchStatus from '../Enums/status';
import { Status } from '../Icons';
import StatsPage from '../StatsPage';

import { updateMatchData } from '../../../../../redux/actions/matchesActions';
import store from '../../../../App/store';
import MarketsPage from '../MarketsPage';
import Skeleton from '@material-ui/lab/Skeleton';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;

const results = Object.freeze({
    won: { text: "W", color: "#7bd389" },
    lost: { text: "L", color: "#ed5565" },
    draw: { text: "D", color: "#b0b0b0" }
})

class MatchPage extends React.Component {
    constructor(props) {
        super(props);
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
        const { matchId, profile } = props;
        const { App } = profile;

        const match = await App.getSpecificMatch({ match_id: matchId });

        if (!_.isEmpty(match.data.message)) {
            this.setState({
                match: match.data.message
            })
        }

    }

    getSerieName = () => {
        const { league, serie, tournament } = this.state.match;

        return `${league.name} ${serie.full_name} - ${tournament.name}`;
    }

    setMatchBooked = async e => {
        e.stopPropagation();

        const { profile } = this.props;
        const { match } = this.state;
        const { id } = match;
        const { App } = profile;

        this.setState({ isLoading: true });

        const response = await App.setBookedMatch({ match_external_id: id });

        if (response.data.status === 200) {
            // Modify it later!!!
            let matchUpdated = await App.getSpecificMatch({ match_id: id });

            if (matchUpdated.data.message) {
                // Modify it later!!!
                matchUpdated.data.message.booked = true;

                store.dispatch(updateMatchData(matchUpdated.data.message));

                this.setState({
                    match: matchUpdated.data.message,
                    isLoading: false
                })
            }
        }

        this.setState({ isLoading: false });
    };

    removeMatchBooked = async e => {
        e.stopPropagation();

        const { profile } = this.props;
        const { match } = this.state;
        const { id } = match;
        const { App } = profile;

        this.setState({ isLoading: true });

        const response = await App.removeBookedMatch({ match_external_id: id });

        if (response.data.status === 200) {
            const matchUpdated = await App.getSpecificMatch({ match_id: id });

            if (matchUpdated.data.message) {
                store.dispatch(updateMatchData(matchUpdated.data.message));

                this.setState({
                    match: matchUpdated.data.message,
                    isLoading: false
                })
            }
        }

        this.setState({ isLoading: false });
    };

    getTeamScore = id => {
        const { results } = this.state.match;

        const result = results.find(result => result.team_id === id);

        return result ? result.score : null;
    }

    getResultColor = ({ id, winner_id }) => {

        switch (true) {
            case winner_id === null:
                return results.draw.color
            case id === winner_id:
                return results.won.color
            case id !== winner_id:
                return results.lost.color
            default:
                break;
        }
    }

    render() {
        const { match, isLoading } = this.state;
        const { videogame, opponents, scheduled_at, booked, odds, status, results, winner_id } = match;

        if (_.isEmpty(match)) {
            return (
                <MatchContainer>
                    <MatchSummary style={{ backgroundColor: "none" }}>
                        <Skeleton variant="rect" height="213px" width="100%" animation="wave"/>
                    </MatchSummary>
                </MatchContainer>
            );
        }

        const { icon } = videogames[videogame.id];
        const serieName = this.getSerieName();
        const [teamOne, teamTwo] = opponents.map(opponent => opponent.opponent);
        const [scoreTeamOne, scoreTeamTwo] = results ? opponents.map(opponent => this.getTeamScore(opponent.opponent.id)) : [null, null];
        const time = new Date(scheduled_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        const date = moment(new Date(scheduled_at)).format('MM/DD');

        const isLoL = videogame.slug === "league-of-legends"; 
        const hasMarkets = !_.isEmpty(odds) && !_.isEmpty(odds.markets);
        const isMatchFinished = !_.isEmpty(status) && ['settled', 'finished'].includes(status);
        const hasResults = !_.isEmpty(results) && ['live', 'settled', 'finished'].includes(status);
        const isPreMatch = !_.isEmpty(status) && ['pre_match'].includes(status);
        const isTie = scoreTeamOne !== null && scoreTeamTwo !== null && scoreTeamOne === scoreTeamTwo && isMatchFinished;
        
        return (
            <>
            <MatchContainer>
                <MatchSummary>
                    <SerieSummary>
                        { status && _.has(matchStatus, status) && (
                            <MatchStatus color={matchStatus[status].backgroundColor}>
                                <MatchIcon>
                                    <Status status={status}/>
                                </MatchIcon>
                            </MatchStatus>
                        )}
                        <SerieInfo>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <VideoGameIcon>
                                    { icon }
                                </VideoGameIcon>
                                <span>{ serieName }</span>
                            </div>
                            <div>
                                { hasResults && scoreTeamOne !== null && scoreTeamTwo !== null &&
                                <DateInfo style={{ flexDirection: "row" }}>
                                    <Time style={{ margin: 5, padding: 0 }}>
                                        { time }
                                    </Time>
                                    <DateSpan style={{ margin: 5, padding: 0 }}>
                                        { date }
                                    </DateSpan>
                                </DateInfo> }
                            </div>
                        </SerieInfo>
                    </SerieSummary>
                    <Score> 
                        <TeamOne>
                            <span>{teamOne.name}</span>
                            { teamOne.image_url ? <img src={teamOne.image_url} alt={teamOne.name}/> : <Avatar name={teamOne.name} size="35" round={true}/> } 
                        </TeamOne>
                        { hasResults && scoreTeamOne !== null && scoreTeamTwo !== null ? (
                            <Result>
                                <ResultValue color={this.getResultColor({ id: teamOne.id, winner_id: winner_id })}>
                                    { scoreTeamOne }
                                </ResultValue>
                                { isTie ? <Draw><span>Tie</span></Draw> : <span>vs</span> }
                                <ResultValue color={this.getResultColor({ id: teamTwo.id, winner_id: winner_id })}>
                                    { scoreTeamTwo }
                                </ResultValue>
                            </Result>
                        ) : (
                            <DateInfo>
                                <Time>
                                    { time }
                                </Time>
                                <DateSpan>
                                    { date }
                                </DateSpan>
                            </DateInfo>
                        )}
                        <TeamTwo>
                            { teamTwo.image_url ? <img src={teamTwo.image_url} alt={teamTwo.name}/> : <Avatar name={teamTwo.name} size="35" round={true}/> } 
                            <span>{teamTwo.name}</span>
                        </TeamTwo>
                    </Score>
                    <InfoContainer>
                        { booked ? (
                            <RemoveBookButton variant="contained" size="small" onClick={this.removeMatchBooked} disabled={isLoading}>
                                { isLoading ? <img src={loading} alt="Loading..." className={'loading_gif'}/> : "Remove" }
                            </RemoveBookButton>
                        ) : (
                            isPreMatch && (
                            <BookButton variant="contained" size="small" onClick={this.setMatchBooked} disabled={isLoading}>
                                { isLoading ? <img src={loading} alt="Loading..." className={'loading_gif'}/> : "Book" }
                            </BookButton>)
                        )}
                    </InfoContainer>
                </MatchSummary>
                <TabsContainer>
                    <Tabs defaultActiveKey="1" type="card" size="middle" style={{ margin: 15 }}>
                        <TabPane tab="Markets" key="1">
                            <MarketsPage status={status} markets={hasMarkets ? odds.markets : []} teamOne={teamOne} teamTwo={teamTwo}/>
                        </TabPane>
                        <TabPane tab="Stats" key="2">
                            { isLoL ? <StatsPage match={match}/> : null }
                        </TabPane>
                    </Tabs>
                </TabsContainer>
            </MatchContainer>            
            </>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(MatchPage);