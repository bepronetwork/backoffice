import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { MatchLink, MatchContainer, Indicator, MatchInfo, TeamsInfo, ActionArea, Footer, TeamOne, Result, ResultValue, TeamTwo, SerieName, VideoGameIcon, VideogameInfo, DateInfo, Time, Date as DateSpan } from './styles';

import videogames from '../Enums/videogames';

class Match extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
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


    render() {
        const { data } = this.state;
        const { opponents, results, videogame, scheduled_at } = data;
        const { setMatchPage } = this.props;

        if (_.isEmpty(data)) return null;

        const leagueName = this.getLeagueName(data.league_id);
        if (!leagueName) return null

        const [teamOne, teamTwo] = opponents.map(opponent => opponent.opponent);
        const [scoreTeamOne, scoreTeamTwo] = results ? opponents.map(opponent => this.getTeamScore(opponent.opponent.id)) : [null, null];

        const time = new Date(scheduled_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        const date = `${new Date(scheduled_at).getMonth()}/${new Date(scheduled_at).getDay()}`;

        return (
            <>
            <MatchLink 
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
                                {/* { date } */}
                            </DateSpan>
                        </DateInfo>
                    </MatchInfo>
                    <TeamsInfo>
                        <TeamOne>
                            <span>{teamOne.name}</span>
                            <img src={teamOne.image_url} alt={teamOne.name}/> 
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
                            <img src={teamTwo.image_url} alt={teamTwo.name}/> 
                            <span>{teamTwo.name}</span>
                        </TeamTwo>
                    </TeamsInfo>
                    <ActionArea>

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