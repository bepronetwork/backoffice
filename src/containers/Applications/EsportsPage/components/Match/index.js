import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { MatchLink, MatchContainer, Indicator, MatchInfo, TeamsInfo, ActionArea, Footer, TeamOne, 
    Result, ResultValue, TeamTwo, SerieName, VideoGameIcon, VideogameInfo, DateInfo, Time, Date as DateSpan, 
    BookButton, RemoveBookButton, Status, Tag, Odds, OddValue, Draw } from './styles';
import Avatar from 'react-avatar';
import moment from 'moment';

import videogames from '../Enums/videogames';
import matchStatusEnum from '../Enums/status';
import { updateMatchData } from '../../../../../redux/actions/matchesActions';
import store from '../../../../App/store';

const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;

const results = Object.freeze({
    won: { text: "W", color: "#7bd389" },
    lost: { text: "L", color: "#ed5565" },
    draw: { text: "D", color: "#b0b0b0" }
})

class Match extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isLoading: false
        };
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    projectData = (props) => {
        const { data, series } = props;

        if (!_.isEmpty(data)) {
            this.setState({
                data: data
            })
        }

        if (!_.isEmpty(series)) {
            this.setState({
                series: series
            })
        }

    }
    
    getTeamScore = id => {
        const { results } = this.state.data;

        const result = results.find(result => result.team_id === id);

        return result ? result.score : null;
    }

    getLeagueName = id => {
        const { serie, league } = this.state.data;

        return `${league.name} ${serie.full_name}`;
    }

    getTwoWayOdds = odds => {
        if (odds.winnerTwoWay) {
            if (_.isEmpty(odds.winnerTwoWay)) {
                return [];
            } else {
                return [parseFloat(odds.winnerTwoWay[0].odd), null, parseFloat(odds.winnerTwoWay[1].odd)];
            }
        } else {
            switch (true) {
                case _.isArray(odds):
                    const odd = odds.find(odd => odd.template === 'winner-2-way');
    
                    if (odd !== undefined) {
                        const { selections } = odd;
                        return [1/(selections[0].probability), null, 1/(selections[1].probability)];
            
                    } else {
                        return [];
                    }
                case !_.isEmpty(odds.markets):
                    const market = odds.markets.find(market => market.template === 'winner-2-way');
    
                    if (market !== undefined && market.selections !== undefined) {
                        return [1/(market.selections[0].probability), null, 1/(market.selections[1].probability)];
                        
                    } else {
                        return [];
                    }
                default:
                    return [];
            }
        }
    }

    getThreeWayOdds = odds => {
        if (odds.winnerThreeWay) {
            if (_.isEmpty(odds.winnerThreeWay)) {
                return [];
            } else {
                return [parseFloat(odds.winnerThreeWay[0].odd), parseFloat(odds.winnerThreeWay[1].odd), parseFloat(odds.winnerThreeWay[2].odd)];
            }
        } else {
            switch (true) {
                case _.isArray(odds):
                    const odd = odds.find(odd => odd.template === 'winner-3-way');

                    if (odd !== undefined) {
                        const { selections } = odd;
                        return [1/(selections[0].probability), 1/(selections[1].probability), 1/(selections[2].probability)];
            
                    } else {
                        return [];
                    }
                case !_.isEmpty(odds.markets):
                    const market = odds.markets.find(market => market.template === 'winner-3-way');

                    if (market !== undefined && market.selections !== undefined) {
                        return [1/(market.selections[0].probability), 1/(market.selections[1].probability), 1/(market.selections[2].probability)];
                        
                    } else {
                        return [];
                    }
                default:
                    return [];
            }
        }
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

    setMatchBooked = async e => {
        e.stopPropagation();

        const { profile } = this.props;
        const { data } = this.state;
        const { id } = data;
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
                    data: matchUpdated.data.message,
                    isLoading: false
                })
            }
        }

        this.setState({ isLoading: false });
    };

    removeMatchBooked = async e => {
        e.stopPropagation();

        const { profile } = this.props;
        const { data } = this.state;
        const { id } = data;
        const { App } = profile;

        this.setState({ isLoading: true });

        const response = await App.removeBookedMatch({ match_external_id: id });

        if (response.data.status === 200) {
            const matchUpdated = await App.getSpecificMatch({ match_id: id });

            if (matchUpdated.data.message) {
                store.dispatch(updateMatchData(matchUpdated.data.message));

                this.setState({
                    data: matchUpdated.data.message,
                    isLoading: false
                })
            }
        }

        this.setState({ isLoading: false });
    };


    render() {
        const { data, isLoading } = this.state;
        const { opponents, results, videogame, scheduled_at, booked, status, odds, winner_id } = data;
        const { setMatchPage } = this.props;

        if (_.isEmpty(data) || _.isEmpty(opponents)) return null;

        const leagueName = this.getLeagueName(data.league_id);

        const [teamOne, teamTwo] = opponents.map(opponent => opponent.opponent);
        const [scoreTeamOne, scoreTeamTwo] = results ? opponents.map(opponent => this.getTeamScore(opponent.opponent.id)) : [null, null];

        const winnerTwoWayOdds = this.getTwoWayOdds(odds);
        const winnerThreeWayOdds = this.getThreeWayOdds(odds);

        const [teamOneOdd, tieOdd, teamTwoOdd] = !_.isEmpty(winnerThreeWayOdds) ? winnerThreeWayOdds : !_.isEmpty(winnerTwoWayOdds) ? winnerTwoWayOdds : [undefined, undefined, undefined];

        if (_.isEmpty(teamOne) || _.isEmpty(teamTwo)) return null;

        const time = new Date(scheduled_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        const date = moment(new Date(scheduled_at)).format('MM/DD');

        const matchStatus = status ? matchStatusEnum[status] : null;

        const isMatchFinished = !_.isEmpty(status) && ['settled', 'finished'].includes(status);
        const isPreMatch = !_.isEmpty(status) && ['pre_match'].includes(status);
        const hasResults = !_.isEmpty(results) && ['live', 'settled', 'finished'].includes(status);
        const isTie = scoreTeamOne !== null && scoreTeamTwo !== null && scoreTeamOne === scoreTeamTwo && isMatchFinished;
        const hasOdds = teamOneOdd !== undefined && teamTwoOdd !== undefined;

        return (
            <>
            <MatchLink 
            disabled={isLoading}
            disableRipple
            onClick={() => setMatchPage(data)}
            >
                <MatchContainer>
                    <Indicator color={videogames[videogame.id].indicatorColor}/>
                    <MatchInfo>
                        <VideogameInfo>
                            <VideoGameIcon>
                                { videogames[videogame.id].icon }
                            </VideoGameIcon>
                        </VideogameInfo>
                        <DateInfo>
                            <Time>
                                { time }
                            </Time>
                            <DateSpan>
                                { date }
                            </DateSpan>
                        </DateInfo>
                        <Status>
                            { matchStatus && <Tag backgroundColor={matchStatus.backgroundColor} textColor={matchStatus.textColor}>
                                { matchStatus.text }
                            </Tag> }
                        </Status>
                    </MatchInfo>
                    <TeamsInfo>
                        <TeamOne>
                            <span>{teamOne.name}</span>
                            { teamOne.image_url ? <img src={teamOne.image_url} alt={teamOne.name}/> : <Avatar name={teamOne.name} size="25" round={true}/> }
                        </TeamOne>
                        { teamOneOdd && teamTwoOdd && !isMatchFinished ? (
                            <Odds>
                                <OddValue>
                                    { teamOneOdd.toFixed(2) }
                                </OddValue>
                                { tieOdd ? <OddValue>{ tieOdd.toFixed(2) }</OddValue> : <span>vs</span> }
                                <OddValue>
                                    { teamTwoOdd.toFixed(2) }
                                </OddValue> 
                            </Odds>
                        ) : (
                            <Result>
                                <ResultValue color={this.getResultColor({ id: teamOne.id, winner_id: winner_id })}>
                                    { scoreTeamOne !== null && hasResults ? scoreTeamOne : '-' }
                                </ResultValue>
                                { isTie ? <Draw>Tie</Draw> : <span>vs</span> }
                                <ResultValue color={this.getResultColor({ id: teamTwo.id, winner_id: winner_id })}>
                                    { scoreTeamTwo !== null && hasResults ? scoreTeamTwo : '-' }
                                </ResultValue>
                            </Result>
                        )}
                        <TeamTwo>
                            { teamTwo.image_url ? <img src={teamTwo.image_url} alt={teamTwo.name}/> : <Avatar name={teamTwo.name} size="25" round={true}/> }
                            <span>{teamTwo.name}</span>
                        </TeamTwo>
                    </TeamsInfo>
                    <ActionArea>
                        { booked ? (
                            <RemoveBookButton variant="contained" size="small" onClick={this.removeMatchBooked} disabled={isLoading}>
                                { isLoading ? <img src={loading} alt="Loading..." className={'loading_gif'}/> : "Remove" }
                            </RemoveBookButton>
                        ) : (
                            isPreMatch && hasOdds && (
                            <BookButton variant="contained" size="small" onClick={this.setMatchBooked} disabled={isLoading}>
                                { isLoading ? <img src={loading} alt="Loading..." className={'loading_gif'}/> : "Book" }
                            </BookButton>)
                        )}
                    </ActionArea>
                    <Footer>
                        <SerieName>
                            {leagueName ? leagueName : ""}
                        </SerieName>
                    </Footer>
                </MatchContainer>
            </MatchLink>
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