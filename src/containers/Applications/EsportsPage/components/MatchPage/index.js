import React from 'react';
import { connect } from 'react-redux';
import { MatchContainer, MatchSummary, SerieSummary, Score, InfoContainer, VideoGameIcon, TeamOne, TeamTwo, DateInfo, Time, Date as DateSpan, MatchFinishedIcon, MatchStatus, SerieInfo, BookButton, RemoveBookButton } from './styles';
import _ from 'lodash';
import Avatar from 'react-avatar';
import moment from 'moment';

import videogames from '../Enums/videogames';
import { MatchFinished } from '../Icons';
import StatsPage from '../StatsPage';

import { updateMatchData } from '../../../../../redux/actions/matchesActions';
import store from '../../../../App/store';
import MarketsPage from '../MarketsPage';

const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;

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

    render() {
        const { match, isLoading } = this.state;
        const { videogame, opponents, scheduled_at, booked, odds, status } = match;

        if (_.isEmpty(match)) return null;

        const { icon } = videogames[videogame.id];
        const serieName = this.getSerieName();
        const [teamOne, teamTwo] = opponents.map(opponent => opponent.opponent);
        const time = new Date(scheduled_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        const date = moment(new Date(scheduled_at)).format('MM/DD');

        const isLoL = videogame.slug === "league-of-legends"; 
        const hasMarkets = !_.isEmpty(odds) && !_.isEmpty(odds.markets);
        
        return (
            <>
            <MatchContainer>
                <MatchSummary>
                    <SerieSummary>
                        {/* <MatchStatus>
                        <MatchFinishedIcon>
                            <MatchFinished/>
                        </MatchFinishedIcon>
                        </MatchStatus> */}
                        <SerieInfo>
                            <VideoGameIcon>
                                { icon }
                            </VideoGameIcon>
                            <span>{ serieName }</span>
                        </SerieInfo>
                    </SerieSummary>
                    <Score> 
                        <TeamOne>
                            <span>{teamOne.name}</span>
                            { teamOne.image_url ? <img src={teamOne.image_url} alt={teamOne.name}/> : <Avatar name={teamOne.name} size="35" round={true}/> } 
                        </TeamOne>
                        <DateInfo>
                            <Time>
                                { time }
                            </Time>
                            <DateSpan>
                                { date }
                            </DateSpan>
                        </DateInfo>
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
                            <BookButton variant="contained" size="small" onClick={this.setMatchBooked} disabled={isLoading}>
                                { isLoading ? <img src={loading} alt="Loading..." className={'loading_gif'}/> : "Book" }
                            </BookButton>
                        )}
                    </InfoContainer>
                </MatchSummary>
                { isLoL ? <StatsPage match={match}/> : <MarketsPage status={status} markets={hasMarkets ? odds.markets : []} teamOne={teamOne} teamTwo={teamTwo}/> }
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