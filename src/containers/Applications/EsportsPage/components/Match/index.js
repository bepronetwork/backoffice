import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { MatchLink, MatchContainer, Indicator, MatchInfo, TeamsInfo, ActionArea, Footer, TeamOne, Result, ResultValue, TeamTwo, SerieName, VideoGameIcon, VideogameInfo, DateInfo, Time, Date as DateSpan, BookButton, RemoveBookButton } from './styles';
import Avatar from 'react-avatar';
import moment from 'moment';

import videogames from '../Enums/videogames';
import { updateMatchData } from '../../../../../redux/actions/matchesActions';
import store from '../../../../App/store';

const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;

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
        const { series } = this.state;

        const serie = series.find(serie => serie.league_id === id);

        if (!serie) return null;

        const { league } = serie;

        return league ? `${league.name} ${serie.full_name}` : null;
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
        const { opponents, results, videogame, scheduled_at, booked } = data;
        const { setMatchPage } = this.props;

        if (_.isEmpty(data) || _.isEmpty(opponents)) return null;

        const leagueName = this.getLeagueName(data.league_id);
        if (!leagueName) return null

        const [teamOne, teamTwo] = opponents.map(opponent => opponent.opponent);
        const [scoreTeamOne, scoreTeamTwo] = results ? opponents.map(opponent => this.getTeamScore(opponent.opponent.id)) : [null, null];

        if (_.isEmpty(teamOne) || _.isEmpty(teamTwo)) return null;

        const time = new Date(scheduled_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        const date = moment(new Date(scheduled_at)).format('MM/DD');

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
                    </MatchInfo>
                    <TeamsInfo>
                        <TeamOne>
                            <span>{teamOne.name}</span>
                            { teamOne.image_url ? <img src={teamOne.image_url} alt={teamOne.name}/> : <Avatar name={teamOne.name} size="25" round={true}/> }
                        </TeamOne>
                        <Result>
                            <ResultValue>
                                { scoreTeamOne !== null ? scoreTeamOne : '-' }
                            </ResultValue>
                            <span>vs</span>
                            <ResultValue>
                                { scoreTeamTwo !== null ? scoreTeamTwo : '-' }
                            </ResultValue>
                        </Result>
                        <TeamTwo>
                            { teamTwo.image_url ? <img src={teamTwo.image_url} alt={teamTwo.name}/> : <Avatar name={teamTwo.name} size="25" round={true}/> }
                            <span>{teamTwo.name}</span>
                        </TeamTwo>
                    </TeamsInfo>
                    <ActionArea>
                        { booked ? (
                            <RemoveBookButton variant="contained" size="small" onClick={this.removeMatchBooked} disabled={isLoading}>
                                { isLoading ? <img src={loading} className={'loading_gif'}/> : "Remove" }
                            </RemoveBookButton>
                        ) : (
                            <BookButton variant="contained" size="small" onClick={this.setMatchBooked} disabled={isLoading}>
                                { isLoading ? <img src={loading} className={'loading_gif'}/> : "Book" }
                            </BookButton>
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