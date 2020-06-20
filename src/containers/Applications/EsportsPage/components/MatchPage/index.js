import React from 'react';
import { connect } from 'react-redux';
import { MatchContainer, MatchSummary, SerieSummary, Score, InfoContainer, VideoGameIcon, TeamOne, TeamTwo, DateInfo, Time, Date as DateSpan, MatchFinishedIcon, MatchStatus, SerieInfo } from './styles';
import _ from 'lodash';

import videogames from '../Enums/videogames';
import { MatchFinished } from '../Icons';

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

    projectData = (props) => {
        const { data } = props;

        if (!_.isEmpty(data)) {
            this.setState({
                match: data
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

        return (
            <>
            <MatchContainer>
                <MatchSummary>
                    <SerieSummary>
                        <MatchStatus>
                        <MatchFinishedIcon>
                            <MatchFinished/>
                        </MatchFinishedIcon>
                        </MatchStatus>
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
                            <img src={teamOne.image_url} alt={teamOne.name}/> 
                        </TeamOne>
                        <DateInfo>
                            <Time>
                                { time }
                            </Time>
                            <DateSpan>
                                6/18
                            </DateSpan>
                        </DateInfo>
                        <TeamTwo>
                            <img src={teamTwo.image_url} alt={teamTwo.name}/> 
                            <span>{teamTwo.name}</span>
                        </TeamTwo>
                    </Score>
                    <InfoContainer>

                    </InfoContainer>
                </MatchSummary>
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