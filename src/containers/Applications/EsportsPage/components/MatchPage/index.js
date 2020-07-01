import React from 'react';
import { connect } from 'react-redux';
import { MatchContainer, MatchSummary, SerieSummary, Score, InfoContainer, VideoGameIcon, TeamOne, TeamTwo, DateInfo, Time, Date as DateSpan, MatchFinishedIcon, MatchStatus, SerieInfo } from './styles';
import _ from 'lodash';
import Avatar from 'react-avatar';
import moment from 'moment';

import videogames from '../Enums/videogames';
import { MatchFinished } from '../Icons';
import StatsPage from '../StatsPage';

class MatchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            match: {}
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

    render() {
        const { match } = this.state;
        const { videogame, opponents, scheduled_at } = match;

        if (_.isEmpty(match)) return null;

        const { icon } = videogames[videogame.id];
        const serieName = this.getSerieName();
        const [teamOne, teamTwo] = opponents.map(opponent => opponent.opponent);
        const time = new Date(scheduled_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        const date = moment(new Date(scheduled_at)).format('MM/DD');

        const isLoL = videogame.slug === "league-of-legends"; 

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

                    </InfoContainer>
                </MatchSummary>
                { isLoL ? <StatsPage match={match}/> : null }
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